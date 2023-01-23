import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Healthcare} from './patient/healthcare.entities';
import { Insurance } from './patient/insurance';
import { Patient } from './patient/patient.entities';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [PatientModule,
  TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'root',
    password:'root',
    database:'test',
    entities:[Patient,Healthcare,Insurance],
    synchronize:true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
