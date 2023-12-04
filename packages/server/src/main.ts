import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './exception-filter/http.exception-filter';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(cookieParser());
	app.useGlobalFilters(new HttpExceptionFilter());

	// cors 허용
	app.enableCors({
		origin: ['https://www.xn--bj0b03z.site', 'http://localhost:5173'],
		credentials: true,
		methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
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
