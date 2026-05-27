import { family } from '../mock/family.js';

const delay = (ms = 400) => new Promise(res => setTimeout(res, ms));
let nextId = 100;

export const familyService = {
  async getByUserId(userId) {
    await delay(400);
    return family[userId] || [];
  },

  async add(userId, data) {
    await delay(500);
    if (!family[userId]) family[userId] = [];
    const member = {
      id: `FAM-${nextId++}`,
      ...data,
      avatar: data.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      color: ['bg-blue-500','bg-emerald-500','bg-violet-500','bg-rose-500','bg-amber-500'][Math.floor(Math.random()*5)],
    };
    family[userId].push(member);
    return member;
  },

  async remove(userId, memberId) {
    await delay(300);
    if (family[userId]) {
      family[userId] = family[userId].filter(m => m.id !== memberId);
    }
    return true;
  }
};
