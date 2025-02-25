import { MysqlDataSource } from "../DataBase";
import Payment from "../model/Payment";

export default class PaymentRepository {

    private ormRepository = MysqlDataSource.getRepository(Payment);

    public async save(payment: Payment){
        return await this.ormRepository.save(payment);
    }

    public async findPaymentById(id: number){
        return await this.ormRepository.findOne({ where: { id: id } });
    }

    public async updatePayment(data: any, id: number){
        await this.ormRepository.createQueryBuilder()
                        .update(Payment)
                        .set({
                            collectorId: data.collectorId,
                            paymentId: data.paymentId,
                            status: data.status,
                            externalReference: data.externalReference,
                            paymentType: data.paymentType,
                            processingMode: data.processingMode,
                            merchantAccountId: data.merchantAccountId,
                            confirmedDatePayment: data.confirmedDatePayment,
                        })
                        .where("id = :id", { id: id })
                        .execute();
    }
}