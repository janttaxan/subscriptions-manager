export interface Entity {
  id: number;
}

export interface SEO {
  title: string;
  description: string;
  keywords: string;
}

export interface User extends Entity {
  name: string;
  avatar?: string;
}

export interface Subscription extends Entity {
  name: string;
  price: number;
  dayOfMonthToPay: number;
}
