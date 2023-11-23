import * as AWS from 'aws-sdk';

import { configDotenv } from 'dotenv';
configDotenv();

export const awsConfig = {
	endpoint: new AWS.Endpoint(process.env.AWS_S3_ENDPOINT),
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
};

export const bucketName = process.env.AWS_BUCKET_NAME;
