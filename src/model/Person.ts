import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";

import Plan from "./Plan";

@Entity('Person')
export default class Person{

    @PrimaryGeneratedColumn()
    private id!: number;

    @Column("varchar", { length: 100, nullable: false})
    private name: string;

    @Column("varchar", { length: 100, nullable: false})
    private email: string;

    @OneToOne(() => Plan)
    @JoinColumn({ name: "planId"})
    private plan: Plan;

    @Column("boolean")
    private payment: boolean;

    @Column("varchar", { length: 255, nullable: true })
    public customUrl?: string;

    constructor(name: string, email: string, message: string, plan: Plan, payment: boolean){
        this.name = name;
        this.email = email;
        this.plan = plan;
        this.payment = payment;
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

    public getPlan(): Plan {
        return this.plan;
    }

    public getPayment(): boolean{
        return this.payment;
    }

    public getCustomUrl(): string | undefined{
        return this.customUrl;
    }

    public setCustomUrl(custom: string){
        this.customUrl = custom;
    }
}