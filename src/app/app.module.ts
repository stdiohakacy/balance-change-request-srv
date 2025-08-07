import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { AppMiddlewareModule } from 'src/app/app.middleware.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    // Common
    CommonModule,
    AppMiddlewareModule,
  ],
})
export class AppModule {}
