import FormDTO from "../dto/FormDTO";
import NotFoundPerson from "../errors/NotFoundPerson";
import PaymentNotMade from "../errors/PaymentNotMade";
import UnableToSave from "../errors/UnableToSave";
import Person from "../model/Person";
import PersonRepository from "../repository/PersonRepository";
import PlanRepository from "../repository/PlanRepository";

export default class PersonService{

    private planRepository: PlanRepository = new PlanRepository();
    private personRepository: PersonRepository = new PersonRepository();

    public async create(dto: FormDTO): Promise<Person>{
        const plan = await this.planRepository.findOnePlanById(dto.plan);
        
        const person = new Person(dto.name, dto.email, dto.message, plan, false);

        try{
            await this.personRepository.save(person);

            return person;
        }catch(err){
            throw new UnableToSave("Unable to save data");
        }
    }

    public async findPersonByCustomUrl(url: string){
        const person = await this.personRepository.findPersonByCustomUrl(url);

        if(!person) throw new NotFoundPerson("Unable found person");

        if(!person.getPayment()) throw new PaymentNotMade("Payment not made");

        return person;
    }
    
}