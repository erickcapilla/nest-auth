import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/default_db',
    ),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 300000, // 5 minutes in milliseconds
          limit: 3,
        },
      ],
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
