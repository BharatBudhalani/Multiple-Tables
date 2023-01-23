import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist";
import { Healthcare} from "./healthcare.entities";
import { Insurance } from "./insurance";
import { PatientController } from "./patient.controller";
import { Patient } from "./patient.entities";
import { PatientService } from "./patient.service";

@Module({
    imports:[TypeOrmModule.forFeature([Patient,Healthcare,Insurance])],
    controllers:[PatientController],
    providers:[PatientService],
})
export class PatientModule {}