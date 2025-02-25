import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";

import Payment from "./Payment";

@Entity('Person')
export default class Person{

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column("varchar", { length: 100, nullable: false})
    private name: string;

    @Column("varchar", { length: 100, nullable: false})
    private email: string;

    @Column("varchar", { length: 255, nullable: true })
    public customUrl?: string;

    @Column("date", { nullable: true })
    public urlValidateUntil?: string;

    @Column("boolean", { nullable: false })
    private situation: boolean;

    @OneToOne(() => Payment, ( payment ) => payment.id)
    @JoinColumn({ name : "paymentId" })
    private payment: Payment;

    constructor(name: string, email: string, situation: boolean, payment: Payment){
        this.name = name;
        this.email = email;
        this.payment = payment;
        this.situation = situation;
    }

    public getId(): number {
        return this.id!;
    }

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getCustomUrl(): string{
        return this.customUrl!;
    }

    public setCustomUrl(custom: string){
        this.customUrl = custom;
    }

    public getPayment(): Payment {
        return this.payment;
    }

    public getSituation(): boolean{
        return this.situation;
    }

    public getUrlValidateUntil(): string{
        return this.urlValidateUntil!;
    }
}