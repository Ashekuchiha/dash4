import { NavItem } from '@/types';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Transaction',
    // href: '/transections',
    href: 'transections',
    icon: 'badgeDollarSign',
    label: 'transections'
  },
  {
    title: 'Customers',
    href: 'customers',
    icon: 'users',
    label: 'customers'
  },
  {
    title: 'Coupon Code',
    href: 'couponCode',
    icon: 'Ticket',
    label: 'couponCode'
  },
  {
    title: 'Categories',
    href: 'categories',
    icon: 'Shapes',
    label: 'categories'
  },
  {
    title: 'Order Managment',
    href: 'orderManagment',
    icon: 'LayoutList',
    label: 'orderManagment'
  },
  {
    title: 'Invoices',
    href: 'invoices',
    icon: 'FileText',
    label: 'invoices'
  },
  {
    title: 'Pricing Plan',
    href: 'pricing-plan',
    icon: 'Truck',
    label: 'pricingPlane'
  },
  {
    title: 'Shops Management',
    href: 'shopsManagement',
    icon: 'Store',
    label: 'shopsManagement'
  },
  {
    title: 'Products List',
    href: 'productsList',
    icon: 'ScrollText',
    label: 'productsList'
  },
  
  {
    title: 'View Basket',
    href: 'viewBaskets',
    icon: 'archive',
    label: 'viewBaskets'
  },
  {
    title: 'Add Banner',
    href: 'addBanner',
    icon: 'add',
    label: 'addBanner'
  },
  {
    title: 'View Banner',
    href: 'showBanner',
    icon: 'archive',
    label: 'viewBanner'
  },

  // {
  //   title: 'Login',
  //   href: '/login',
  //   icon: 'login',
  //   label: 'Login'
  // }
];
export const navItemsAdmin: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Transaction',
    // href: '/transections',
    href: 'transections',
    icon: 'badgeDollarSign',
    label: 'transections'
  },
  {
    title: 'Customers',
    href: 'customers',
    icon: 'users',
    label: 'customers'
  },
  {
    title: 'Coupon Code',
    href: 'couponCode',
    icon: 'Ticket',
    label: 'couponCode'
  },
  {
    title: 'Categories',
    href: 'categories',
    icon: 'Shapes',
    label: 'categories'
  },
  {
    title: 'Order Managment',
    href: 'orderManagment',
    icon: 'LayoutList',
    label: 'orderManagment'
  },
  {
    title: 'Invoices',
    href: 'invoices',
    icon: 'FileText',
    label: 'invoices'
  },
  {
    title: 'Pricing Plan',
    href: 'pricing-plan',
    icon: 'Truck',
    label: 'pricingPlane'
  },
  {
    title: 'Shops Management',
    href: 'shopsManagement',
    icon: 'Store',
    label: 'shopsManagement'
  },
  {
    title: 'Products List',
    href: 'productsList',
    icon: 'ScrollText',
    label: 'productsList'
  },
  {
    title: 'Add Product',
    href: 'addProduct',
    icon: 'add',
    label: 'addProduct'
  },
  {
    title: 'Add Basket',
    href: 'addBasket',
    icon: 'add',
    label: 'addBasket'
  },
  {
    title: 'View Basket',
    href: 'viewBaskets',
    icon: 'archive',
    label: 'viewBaskets'
  },
  {
    title: 'Add Banner',
    href: 'addBanner',
    icon: 'add',
    label: 'addBanner'
  },
  {
    title: 'View Banner',
    href: 'showBanner',
    icon: 'archive',
    label: 'viewBanner'
  },

  // {
  //   title: 'Login',
  //   href: '/login',
  //   icon: 'login',
  //   label: 'Login'
  // }
];

export const users = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

export const dashboardCard = [
  {
    date: 'Today',
    total: 2000,
    role: 'Students',
    color: 'bg-[#EC4D61] bg-opacity-40'
  },
  {
    date: 'Today',
    total: 2000,
    role: 'Teachers',
    color: 'bg-[#FFEB95] bg-opacity-100'
  },
  {
    date: 'Today',
    total: 2000,
    role: 'Parents',
    color: 'bg-[#84BD47] bg-opacity-30'
  },
  {
    date: 'Today',
    total: 2000,
    role: 'Schools',
    color: 'bg-[#D289FF] bg-opacity-30'
  }
];

export type Employee = {
  id: number;
  user_name: string;
  product_name: string;
  order_id: number;
  date: string; // Use 'Date' type if parsing this to a Date object
  payment_method: string; // Consider using a union type if there are specific payment methods, e.g., 'credit_card' | 'paypal' | 'cash'
  amount: string; // Use 'number' if this will be parsed as a numeric value
  quantity: number;
};
