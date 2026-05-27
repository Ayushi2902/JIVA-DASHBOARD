import { users as mockUsers } from '../mock/users.js';

let usersDB = [...mockUsers];
let nextId = usersDB.length + 1;

const delay = (ms = 500) => new Promise(res => setTimeout(res, ms));

export const userService = {
  async getAll() {
    await delay(400);
    return [...usersDB];
  },

  async getById(id) {
    await delay(300);
    return usersDB.find(u => u.id === Number(id)) || null;
  },

  async create(data) {
    await delay(600);
    const user = {
      id: nextId++,
      ...data,
      status: 'active',
      plan: 'normal',
      avatar: data.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      color: ['bg-blue-500','bg-emerald-500','bg-violet-500','bg-rose-500','bg-amber-500','bg-teal-500'][Math.floor(Math.random()*6)],
      joinedAt: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0],
      appointments: 0,
      totalOrders: 0,
      totalBookings: 0,
      totalFamilyMembers: 0,
      totalSpent: 0,
    };
    usersDB.push(user);
    return user;
  },

  async update(id, data) {
    await delay(500);
    const idx = usersDB.findIndex(u => u.id === Number(id));
    if (idx === -1) throw new Error('User not found');
    usersDB[idx] = { ...usersDB[idx], ...data };
    return usersDB[idx];
  },

  async delete(id) {
    await delay(400);
    usersDB = usersDB.filter(u => u.id !== Number(id));
    return true;
  },

  async updateStatus(id, status) {
    return this.update(id, { status });
  },

  async upgradeToPrime(id) {
    return this.update(id, { plan: 'prime' });
  }
};
