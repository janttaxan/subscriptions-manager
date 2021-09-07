import { AxiosResponse } from 'axios';
import get from 'lodash/get';

import { APIService } from 'core/services/index';
import { CommonPageContext } from 'core/services/context/context';
import { User } from 'core/entities';

export class CommonContextService extends APIService {
  public async fetchContext(params?: { path: string }): Promise<CommonPageContext> {
    const response = await this.execute('/api/context', 'GET', { params: params });
    return this.processResponse(response);
  }

  private processResponse(response: AxiosResponse): CommonPageContext {
    let user: Optional<User> = null;

    if (get(response, 'data.user', null)) {
      user = {
        id: get(response, 'data.user.id', 0),
        avatar: get(response, 'data.user.avatar', ''),
        name: get(response, 'data.user.name', '')
      };
    }

    return {
      user,
      seo: {
        title: 'Subscriptions Manager',
        description: '',
        keywords: ''
      }
    };
  }
}
