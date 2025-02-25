import { PrimaryGeneratedColumn, Column, ManyToOne, Entity, JoinColumn } from "typeorm";
import Person from "./Person";

@Entity('Images')
export default class Images{

    @PrimaryGeneratedColumn()
    private id?: number;

    @Column("varchar", { nullable: false })
    public url: string;

    @ManyToOne(() => Person, ( person ) => person.getId)
    @JoinColumn({ name : "personId" })
    private person: Person;

    constructor(url: string, person: Person){
        this.url = url;
        this.person = person;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getUrl(): string {
        return this.url;
    }

    public getPerson(): Person {
        return this.person;
    }
}