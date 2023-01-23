import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Healthcare } from "./healthcare.entities";
import { Insurance } from "./insurance";

@Entity()
export class Patient {
    @PrimaryGeneratedColumn({
        type:'bigint'
    })
    id:number;
    @Column({
        nullable:true,
        default:'',
    })
    name:string;
    @Column({
        nullable:false,
        default:'',
    })
    gender:string;
    @Column({
        nullable:false,
        default:'',
    })
    insurance:string;
    @Column({
        nullable:false,
       
    })
    dob:Date;
    @Column({
        nullable:false,

    })
    isactive:boolean;

    @OneToOne(()=>Healthcare)
    @JoinColumn()
    details:Healthcare;

    @OneToMany(()=> Insurance,(insurance)=>insurance.patient)
    insure:Insurance[]
}