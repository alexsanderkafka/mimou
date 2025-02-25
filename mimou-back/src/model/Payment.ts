import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import Plan from "./Plan";

@Entity('Payment')
export default class Payment {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column("varchar", { nullable: true })
    public collectorId?: string;

    @Column("varchar", { nullable: true })
    public paymentId?: string;

    @Column("varchar", { nullable: false })
    public status: string;

    @Column({ nullable: true })
    public externalReference?: string;

    @Column("varchar", { nullable: true })
    public paymentType?: string;

    @Column("varchar", { nullable: true })
    public processingMode?: string;

    @Column("varchar", { nullable: true })
    public merchantAccountId?: string;

    @Column("date", { nullable: true })
    public confirmedDatePayment?: String;

    @ManyToOne(() => Plan, ( plan ) => plan.getId)
    @JoinColumn({ name : "planId" })
    public plan: Plan;

    constructor(collectorId: string | undefined, paymentId: string | undefined, status: string, externalReference: string | undefined, paymentType: string | undefined, processingMode: string | undefined, merchantAccountId: string | undefined, confirmedDatePayment: String | undefined, plan: Plan){
        this.collectorId = collectorId;
        this.paymentId = paymentId;
        this.status = status;
        this.externalReference = externalReference;
        this.paymentType = paymentType;
        this.processingMode = processingMode;
        this.merchantAccountId = merchantAccountId;
        this.confirmedDatePayment = confirmedDatePayment;
        this.plan = plan;
    }

    public getId(): number{
        return this.id;
    }

    public getStatus(): string | undefined {
        return this.status;
    }

    public setId(id: number) {
        this.id = id;
    }

    public getPlan(): Plan {
        return this.plan;
    }   
}
