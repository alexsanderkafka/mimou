import FormDTO from "../dto/FormDTO";
import NotFoundPerson from "../errors/NotFoundPerson";
import PaymentNotMade from "../errors/PaymentNotMade";
import UnableToSave from "../errors/UnableToSave";
import Person from "../model/Person";
import PersonRepository from "../repository/PersonRepository";
import PlanRepository from "../repository/PlanRepository";
import Payment from "../model/Payment";
import PaymentRepository from "../repository/PaymentRepository";

export default class PersonService{

    private planRepository: PlanRepository = new PlanRepository();
    private personRepository: PersonRepository = new PersonRepository();
    private paymentRepository: PaymentRepository = new PaymentRepository();

    public async create(dto: FormDTO): Promise<Person>{
        const plan = await this.planRepository.findOnePlanById(dto.plan);
        
        const payment = new Payment(undefined, undefined, "unpaid", undefined, undefined, undefined, undefined, undefined, plan);
        const paymentSaved = await this.paymentRepository.save(payment);
        
        const person = new Person(dto.name, dto.email, true, paymentSaved);

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

        if(!person.getSituation()) throw new PaymentNotMade("Payment not made");

        return person;
    }
    
}