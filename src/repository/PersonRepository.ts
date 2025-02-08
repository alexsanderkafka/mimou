import { MysqlDataSource } from "../DataBase";
import FormDTO from "../dto/FormDTO";
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
}