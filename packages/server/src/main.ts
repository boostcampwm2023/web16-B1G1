import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(cookieParser());

	// cors 허용
	app.enableCors({
		origin: true,
		credentials: true,
	});

	const config = new DocumentBuilder()
		.setTitle('B1G1 API')
		.setDescription('B1G1 API description')
		.setVersion('1.0')
		.addTag('b1g1')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(3000);
}
bootstrap();
