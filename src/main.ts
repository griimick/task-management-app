import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformerInterceptor } from './transformer.interceptor';

async function bootstrap(port: number) {
	const logger = new Logger();
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalInterceptors(new TransformerInterceptor());
	await app.listen(port);
	logger.log(`Application listening on port ${port}`)
}
bootstrap(3000);
