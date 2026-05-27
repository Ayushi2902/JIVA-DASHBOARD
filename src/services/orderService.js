import { orders, defaultOrders } from '../mock/orders.js';

const delay = (ms = 400) => new Promise(res => setTimeout(res, ms));

export const orderService = {
  async getByUserId(userId) {
    await delay(400);
    return orders[userId] || defaultOrders;
  },

  async updateStatus(orderId, status) {
    await delay(300);
    return { orderId, status };
  }
};
