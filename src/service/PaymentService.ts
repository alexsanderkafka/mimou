import "dotenv";
import Person from "../model/Person";

import { Preference } from "mercadopago";
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { InternalServerError } from "routing-controllers";
import PlanRepository from "../repository/PlanRepository";
import Plan from "../model/Plan";
import { Request, Response } from "express";
import SignatureError from "../errors/SignatureError";
import crypto from "crypto";

export default class PaymentService{

    private planRepository: PlanRepository = new PlanRepository();

    public async createCheckoutPro(userEmail: string, origin: string, plan: number, testeId: number){

      const currentPlan = await this.planRepository.findOnePlanById(plan);

      try {

          const  client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN as string})
          const preference = new Preference(client);

          const createdPreference = await preference.create({
              body: {
              external_reference: `${testeId}`,
              metadata: {
                  testeId,
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

}