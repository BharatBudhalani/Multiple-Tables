import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { time } from "console";
import { Repository } from "typeorm";
import { Healthcare } from "./healthcare.entities";
import { Insurance } from "./insurance";
import { Patient } from "./patient.entities";

@Injectable()
export class PatientService {
    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository:Repository<Patient>,
        @InjectRepository(Healthcare)
        private readonly healthRepository:Repository<Healthcare>,
        @InjectRepository(Insurance)
        private readonly insuranceRepository:Repository<Insurance>
    ){}
    async insertPatient(patient:Patient){
       const newPatient= await this.patientRepository.create(patient);
        return this.patientRepository.save(newPatient);
    }
    async insertHealthDetails(
        id:number,
        createHealth:Healthcare
    ){
        const patient=await this.patientRepository.findOneBy({id});
        if(!patient)
        {
            throw new HttpException('patient not found',HttpStatus.BAD_REQUEST);
        }
        const newOne =this.healthRepository.create(createHealth);
        const newtwo= await this.healthRepository.save(newOne);
        patient.details =newtwo;
        return this.patientRepository.save(patient);

    }

    async insertInsuranceDetails(
        id:number,
        createInsurance:Insurance
    ){
        const patient=await this.patientRepository.findOneBy({id});
        if(!patient)
        {
            throw new HttpException('patient not found',HttpStatus.BAD_REQUEST);
        }
        const newOne =this.insuranceRepository.create({...createInsurance,patient});
       
        return this.insuranceRepository.save(newOne);

    }


    async getAllPatient(){
        return this.patientRepository.find({relations:['details','insure']});
    }
    async getPatientById(id:number){
        return this.patientRepository.find({
            select:["name","dob","gender","insurance","isactive"], where:[{'id':id}],
            relations:['details','insure']
        });
    }
    async deletePatient(id:number){
        return this.patientRepository.delete(id);
    }
    async updatePatient(id:string,data:any): Promise<any>{
        return this.patientRepository.createQueryBuilder()
        .update().set({
            name:data.name,
            gender:data.gender,
            dob:data.dob,
            insurance:data.insurance,
        }).where('id=:id',{id}).execute()
    }
}