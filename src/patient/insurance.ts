import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "./patient.entities";

@Entity()
export class Insurance{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    planname:string

    @Column()
    sumassured:number

    @Column()
    premium:number;

    @ManyToOne(()=>Patient,(patient)=>patient.insure)
    patient:Patient;


    
}