import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	Logger,
} from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { awsConfig, bucketName } from '../config/aws.config';
import { v1 as uuid } from 'uuid';
import * as sharp from 'sharp';

@Injectable()
export class FileService {
	async uploadFile(file: Express.Multer.File): Promise<any> {
		if (!file.mimetype.includes('image')) {
			throw new BadRequestException('not an image file');
		}

		const { buffer } = file;

		const resized_buffer = await sharp(buffer)
			.resize(500, 500, { fit: 'cover' })
			.toFormat('png', { quality: 100 })
			.toBuffer();

		const filename = uuid();

		// NCP Object Storage 업로드
		AWS.config.update(awsConfig);
		const result = await new AWS.S3()
			.putObject({
				Bucket: bucketName,
				Key: filename,
				Body: resized_buffer,
				ACL: 'public-read',
			})
			.promise();
		// eTag 없으면 에러 리턴
		if (!result.ETag) {
			throw new InternalServerErrorException('file upload failed');
		}
		Logger.log(`uploadFile result: ${result.ETag}`);

		const eTag = result.ETag;
		return {
			mimetype: 'image/png',
			filename,
			size: resized_buffer.length,
			eTag,
		};
	}

	async downloadFile(filename: string): Promise<Buffer> {
		// NCP Object Storage 다운로드
		AWS.config.update(awsConfig);
		const result = await new AWS.S3()
			.getObject({
				Bucket: bucketName,
				Key: filename,
			})
			.promise();
		Logger.log(`downloadFile result: ${result.ETag}`);

		return result.Body as Buffer;
	}

	async deleteFile(filename: string): Promise<void> {
		// NCP Object Storage에서 파일 삭제
		AWS.config.update(awsConfig);
		await new AWS.S3()
			.deleteObject({
				Bucket: bucketName,
				Key: filename,
			})
			.promise();
		Logger.log(`${filename} deleted from NCP Object Storage`);
	}
}
