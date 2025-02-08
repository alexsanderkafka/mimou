import { MysqlDataSource } from "../DataBase";
import NotFoundPlan from "../errors/NotFoundPlan";
import Plan from "../model/Plan";

export default class PlanRepository{

    private ormRepository = MysqlDataSource.getRepository(Plan);

    public async findOnePlanById(id: number): Promise<Plan>{
        const currentPlan = await this.ormRepository.findOneBy( { id: id } )

        if(!currentPlan) throw new NotFoundPlan("Plan does not exist");

        return currentPlan;
    }
}