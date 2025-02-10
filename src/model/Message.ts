import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";

import Person from "./Person";

@Entity('Message')
export default class Message{

    @PrimaryGeneratedColumn()
    private id?: number;
    
    @Column("varchar", { nullable: false })
    public phrase: string;

    @ManyToOne(() => Person, ( person ) => person.getId)
    @JoinColumn({ name : "personId" })
    private person: Person;

    constructor(phrase: string, person: Person){
        this.phrase = phrase;
        this.person = person;
    }

    public getId(): number | undefined {
        return this.id;
    }
    
    public getPhrase(): string {
        return this.phrase;
    }
    
    public getPerson(): Person {
        return this.person;
    }
}