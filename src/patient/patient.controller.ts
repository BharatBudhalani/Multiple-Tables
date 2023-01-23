import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { threadId } from "worker_threads";
import { Healthcare } from "./healthcare.entities";
import { Insurance } from "./insurance";
import { Patient } from "./patient.entities";
import { PatientService } from "./patient.service";

@Controller('patient')
export class PatientController {
    constructor(
        private readonly patientService:PatientService
    ){}
    @Post()
    insertPatient(@Body() patient:Patient){
        return this.patientService.insertPatient(patient);
    }
    @Post(':id/details')
    insertHealthDetails(
        @Param('id',ParseIntPipe) id:number,
        @Body() patientDetails:Healthcare
    ){
        return this.patientService.insertHealthDetails(id, patientDetails);
    }

    @Post(':id/insure')
    insertInsurance(
        @Param('id',ParseIntPipe) id:number,
        @Body() insuranceDetails:Insurance
    ){
        return this.patientService.insertInsuranceDetails(id, insuranceDetails);
    }

    @Get()
    getAllPatient(){
        return this.patientService.getAllPatient();
    }
    @Get('/:id')
    getPatientById(@Param() params){
        return this.patientService.getPatientById(params.id);
    }
    @Delete('/:id')
     deletePatient(@Param() paramas){
         this.patientService.deletePatient(paramas.id);
        return `Patient with id ${paramas.id} is deleted`;
    }
    @Patch('/:id')
     updatePatient(@Param() params,@Body() body:any){
         this.patientService.updatePatient(params.id,body);
        return "Patient Details Updated"
    }
}