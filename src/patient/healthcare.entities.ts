import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'patient_healthcare'})
export class Healthcare{
    @PrimaryGeneratedColumn({
        type:'bigint'
    })
    id:number;

    @Column()
    doctorappointed:string;

    @Column()
    admittedon:Date;

    @Column()
    admittedfor:string;

    @Column()
    dischargeon:Date;

    @Column()
    billamount:number;

}
