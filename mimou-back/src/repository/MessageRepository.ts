import { MysqlDataSource } from "../DataBase";
import Message from "../model/Message";


export default class MessageRepository{

    private ormRepository = MysqlDataSource.getRepository(Message);

    public async save(messages: Message[]){
        this.ormRepository.save(messages);
    }

    public async findMessagesByPersonId(id: number): Promise<Message[]>{
        return await this.ormRepository.createQueryBuilder('m')
                .where({ person: id })
                .select(['m.phrase'])
                .getMany();
    }

}