# Jiva Health — Admin Dashboard

A production-quality React admin dashboard for healthcare user management.

## Tech Stack
- React 18 + Vite
- Tailwind CSS
- React Router DOM v6
- Zustand (state management)
- Framer Motion (animations)
- Sonner (toast notifications)
- Lucide React (icons)

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```

### 3. Open in browser
```
http://localhost:5173
```

## Build for Production
```bash
npm run build
npm run preview
```

## Features
- **User Management** — List, search, filter users with status/role badges
- **User Profile** — Detailed profile with tabs: Overview, Orders, Payments, Family
- **Add/Edit Users** — Full modal form with validation
- **Upgrade to Prime** — One-click plan upgrade
- **Order History** — Per-user order tracking with status
- **Payment History** — Payment records with method and status
- **Family Members** — Add/remove family member relationships
- **Dark Mode** — Persisted via localStorage
- **Responsive** — Works on desktop, tablet, and mobile
- **Animations** — Framer Motion page/card transitions
- **Toast Notifications** — Success/error feedback via Sonner
- **Mock API** — Async service layer with artificial delays

## Project Structure
```
src/
├── components/
│   ├── common/        Modal, Avatar, StatsCard, Skeleton, EmptyState
│   ├── users/         UserRow, AddEditUserModal
│   ├── orders/        OrderCard
│   ├── payments/      PaymentCard
│   └── family/        FamilyMemberCard
├── hooks/
├── layouts/           MainLayout, Sidebar, Navbar
├── mock/              users.js, orders.js, payments.js, family.js
├── pages/             DashboardPage, UserManagementPage, UserProfilePage
├── routes/            React Router setup
├── services/          userService, orderService, paymentService, familyService
├── store/             Zustand stores (theme, sidebar, users)
└── utils/             helpers.js
```
# JIVA-DASHBOARD
