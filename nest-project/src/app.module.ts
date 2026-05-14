import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './misc/prisma.service';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { CompanyModule } from './company/company.module';
import { PositionModule } from './position/position.module';
import { TaskModule } from './task/task.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ContactPersonModule } from './contact-person/contact-person.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    AccountModule,
    CompanyModule,
    PositionModule,
    TaskModule,
    AppointmentModule,
    ContactPersonModule,
    ApplicationModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
