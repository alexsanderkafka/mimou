import { Preference } from "mercadopago";
import { InternalServerError } from "routing-controllers";
import PlanRepository from "../repository/PlanRepository";
import PaymentRepository from "../repository/PaymentRepository";
import PersonRepository from "../repository/PersonRepository";
import { format } from "date-fns";
import NotFoundPerson from "../errors/NotFoundPerson";
import EmailService from "./EmailService";
import { client } from "../mercadopago";
import Person from "../model/Person";

export default class PaymentService{

    private planRepository: PlanRepository = new PlanRepository();
    private paymentRepository: PaymentRepository = new PaymentRepository();
    private personRepository: PersonRepository = new PersonRepository();

    private emailService: EmailService = new EmailService();

    public async createCheckoutPro(userEmail: string, origin: string, plan: number, testeId: number){

      const currentPlan = await this.planRepository.findOnePlanById(plan);

      try {

          const preference = new Preference(client);

          const createdPreference = await preference.create({
              body: {
              external_reference: `${testeId}`,
              metadata: {
                  id: testeId,
                  userEmail: userEmail,
                  plan: plan,
              },
              ...(userEmail && {
                  payer: {
                  email: userEmail,
                  },
              }),
              items: [
                  {
                  id: `${currentPlan.getId()}`,
                  description: currentPlan.getDescription(),
                  title: currentPlan.getName(),
                  quantity: 1,
                  unit_price: currentPlan.getPrice(),
                  currency_id: "BRL",
                  category_id: "category",
                  },
              ],
              payment_methods: {
                  installments: 12,
              },
              auto_return: "approved",
              back_urls: {
                  success: `${origin}/?status=sucesso`,
                  failure: `${origin}/?status=falha`,
                  pending: `${origin}/api/mercado-pago/pending`,
              },
              },
          });

          if (!createdPreference.id) {
              throw new Error("No preferenceID");
          }

          return JSON.stringify({
              preferenceId: createdPreference.id,
              initPoint: createdPreference.init_point,
          });

          } catch (err) {
              throw new InternalServerError("Internal Server Error");
          }
    }

    public async updatePayment(data: any): Promise<any>{

        const person = await this.personRepository.findPersonById(data.personId);

        if(!person){
            throw new NotFoundPerson("Person not found");
        }

        const payment = person.getPayment();
        const plan = payment.getPlan();

        const confirmedDatePayment = new Date();
        let urlValidateUntil = new Date(confirmedDatePayment);
        
        urlValidateUntil.setDate(confirmedDatePayment.getDate() + plan.getDays());

        data["confirmedDatePayment"] = format(confirmedDatePayment, "yyyy-MM-dd HH:mm:ss");

        const nameToUrl = person?.getName().normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, "-");
        const id = person.getId();

        const customUrl = `/${id}/${nameToUrl}`;

        await this.paymentRepository.updatePayment(data, payment.id);
        await this.personRepository.updateUrlAndDate(customUrl, format(urlValidateUntil, "yyyy-MM-dd HH:mm:ss"), person.getId());

        return {
            name: person.getName(),
            customUrl,
            urlValidateUntil: format(urlValidateUntil, "yyyy-MM-dd HH:mm:ss"),
            plan,
            email: person.getEmail()
        };
    }

}