import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Plan')
export default class Plan{

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column("varchar", { length: 100, nullable: false })
    private name: string;
    
    @Column("varchar", { length: 100, nullable: false })
    private description: string;

    @Column("int", { nullable: false })
    private price: number;

    @Column("int", { nullable: false })
    private days?: number;

    constructor(name: string, description: string, price: number){
        this.name = name;
        this.description = description;
        this.price = price;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getPrice(): number {
        return this.price;
    }

    public getDays(): number {
        return this.days!;
    }

}