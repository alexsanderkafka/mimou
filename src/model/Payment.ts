import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import Person from "./Person";

@Entity('Payment')
export default class Payment {
    @PrimaryGeneratedColumn()
    private id?: number;

    @Column("varchar", { nullable: false })
    private collectionId: string;

    @Column("varchar", { nullable: false })
    private collectionStatus: string;

    @Column("varchar", { nullable: false })
    private paymentId: string;

    @Column("varchar", { nullable: false })
    private status: string;

    @Column({ nullable: true })
    private externalReference: string;

    @Column("varchar", { nullable: false })
    private paymentType: string;

    @Column("varchar", { nullable: false })
    private merchantOrderId: string;

    @Column("varchar", { nullable: false })
    private preferenceId: string;

    @Column("varchar", { nullable: false })
    private siteId: string;

    @Column("varchar", { nullable: false })
    private processingMode: string;

    @Column("varchar", { nullable: true })
    private merchantAccountId: string;

    @ManyToOne(() => Person, ( person ) => person.getId)
    @JoinColumn({ name : "personId" })
    private person: Person;

    constructor(collectionId: string, collectionStatus: string, paymentId: string, status: string, externalReference: string, paymentType: string, merchantOrderId: string, preferenceId: string, siteId: string, processingMode: string, merchantAccountId: string, person: Person){
        this.collectionId = collectionId;
        this.collectionStatus = collectionStatus;
        this.paymentId = paymentId;
        this.status = status;
        this.externalReference = externalReference;
        this.paymentType = paymentType;
        this.merchantOrderId = merchantOrderId;
        this.preferenceId = preferenceId;
        this.siteId = siteId;
        this.processingMode = processingMode;
        this.merchantAccountId = merchantAccountId;
        this.person = person;
    }   

    
}
