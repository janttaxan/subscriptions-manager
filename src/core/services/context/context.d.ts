import { SEO, Subscription, User } from 'core/entities';

export interface PageContext {
}

export interface CommonPageContext extends PageContext {
  seo: SEO;
  user: Optional<User>;
  host: Optional<string>;
}

export type ExtraPageContext<T> = (accessToken: Optional<string>) => Promise<T>;

export interface SubscriptionsPageContext extends PageContext {
  subscriptions: Array<Subscription>;
}
