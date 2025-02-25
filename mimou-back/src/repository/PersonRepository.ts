import { MysqlDataSource } from "../DataBase";
import Person from "../model/Person";

export default class PersonRepository {

    private ormRepository = MysqlDataSource.getRepository(Person);

    public async save(person: Person){
        this.ormRepository.save(person);
    }

    public async findPersonByCustomUrl(url: string){
        const result = await this.ormRepository.findOne({ where: { customUrl: url } });

        return result;
    }

    public async findPersonById(id: number){
        return this.ormRepository.findOne({ 
            where: { id: id },
            relations: ["payment", "payment.plan"]
         });
    }

    public async updateUrlAndDate(customUrl: string, urlValidateUntil: string, id: number){
        await this.ormRepository.createQueryBuilder()
                                .update(Person)
                                .set({
                                    customUrl: customUrl,
                                    urlValidateUntil: urlValidateUntil
                                })
                                .where("id = :id", { id: id })
                                .execute();
    }
}