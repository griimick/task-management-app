import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformerInterceptor } from './transformer.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap(port: number) {
	const logger = new Logger();
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalInterceptors(new TransformerInterceptor());

	const config = new DocumentBuilder()
		.setTitle('Task Management App')
		.setDescription('OpenAPI Spec for Task Management App')
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(port);

	logger.log(`Application listening on port ${port}`);
}
bootstrap(3000);
