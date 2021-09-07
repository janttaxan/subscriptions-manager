import axios from 'axios';
import { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import trimStart from 'lodash/trimStart';

interface Options<TypeParams, TypePayload, TypeHeaders> {
  params?: Optional<TypeParams>;
  payload?: Optional<TypePayload>;
  customHeaders?: Optional<TypeHeaders>;
  withCredentials?: Optional<boolean>;
}

export class APIService<
  Payload = Record<string, unknown>,
  Headers = Record<string, unknown>,
  Params = Record<string, unknown>
> {
  host: string;
  correlationID: Optional<string>;
  accessToken: Optional<string>;

  constructor(host: Optional<string>, correlationID: Optional<string> = null, accessToken: Optional<string> = null) {
    this.host = host || 'localhost:3000';
    this.correlationID = correlationID || '';
    this.accessToken = accessToken;
  }

  protected constructURL(path: string): string {
    return `https://${this.host}/${trimStart(path, '/')}`;
  }

  protected execute = async (
    path: string,
    method: Method = 'GET',
    options: Options<Params, Payload, Headers> = {
      params: null,
      payload: null,
      customHeaders: null,
      withCredentials: false
    }
  ): Promise<AxiosResponse> => {
    const headers: {
      'Content-Type': string;
      'X-Correlation-ID'?: string;
      'X-Access-Token'?: string;
    } = { 'Content-Type': 'application/json', ...options.customHeaders };

    if (this.correlationID) {
      headers['X-Correlation-ID'] = this.correlationID;
    }

    if (this.accessToken) {
      headers['X-Access-Token'] = this.accessToken;
    }

    const config: AxiosRequestConfig = {
      headers: headers
    };

    if (options.params) {
      config.params = options.params;
    }

    if (options.withCredentials) {
      config.withCredentials = true;
      config.xsrfCookieName = 'csrftoken';
      config.xsrfHeaderName = 'X-CSRFToken';
    }

    const url = this.constructURL(path);
    const response = await axios({ method, url, data: options.payload, ...config });

    return response;
  };
}
