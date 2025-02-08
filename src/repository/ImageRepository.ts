import { MysqlDataSource } from "../DataBase";
import Images from "../model/Images";
import Person from "../model/Person";

export default class ImageRepository{

    private ormRepository = MysqlDataSource.getRepository(Images);

    public async save(image: Images[]){
        this.ormRepository.save(image);
    }

    public async findImagesUrlByPersonId(id: number): Promise<Images[]>{
        return await this.ormRepository.createQueryBuilder('i')
            .where({ person: id })
            .select(['i.url'])
            .getMany();
    }

}