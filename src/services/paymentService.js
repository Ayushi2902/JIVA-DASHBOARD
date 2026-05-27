import { payments, defaultPayments } from '../mock/payments.js';

const delay = (ms = 400) => new Promise(res => setTimeout(res, ms));

export const paymentService = {
  async getByUserId(userId) {
    await delay(400);
    return payments[userId] || defaultPayments;
  }
};
