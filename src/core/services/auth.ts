import get from 'lodash/get';

import { APIService } from 'core/services/index';

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class AuthService extends APIService {
  public fetchAccessToken = async (cookie?: Optional<string>): Promise<Optional<string>> => {
    try {
      const response = await this.execute('/api/auth/tokens', 'GET', { customHeaders: { Cookie: cookie } });
      const accessToken: Optional<string> = get(response, 'headers.x-access-token', null);
      return accessToken;
    } catch (err) {
      if (get(err, 'response.status', 0) === 401) {
        throw new AuthenticationError('Unauthorized user');
      }
      throw err;
    }
  };
}
