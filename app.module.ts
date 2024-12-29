import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: `${process.env.MONGODB_URI}/task_manager`,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoCreate: true // Esto permitirá crear la base de datos si no existe
      }),
    }),
    TasksModule,
  ],
})
export class AppModule {}