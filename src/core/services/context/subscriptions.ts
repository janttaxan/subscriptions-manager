import { AxiosResponse } from 'axios';
import get from 'lodash/get';

import { APIService } from 'core/services/index';
import { SubscriptionsPageContext } from 'core/services/context/context';

export class SubscriptionsService extends APIService {
  public async fetchContext(): Promise<SubscriptionsPageContext> {
    const response = await this.execute('/api/context/subscriptions');
    return this.processResponse(response);
  }

  private processResponse(response: AxiosResponse): SubscriptionsPageContext {
    return {
      subscriptions: get(response, 'data', {})
    };
  }
}
