import { CommonPageContext, ExtraPageContext } from 'core/services/context/context';
import { AuthenticationError, AuthService } from 'core/services/auth';
import { CommonContextService } from 'core/services/context/common';

export interface PageContextOptions<ExtraContentType> {
  path: string;
  host: string;
  correlationID: Optional<string>;
  cookies: Optional<string>;
  authRequired: boolean;
  extra?: ExtraPageContext<ExtraContentType>;
}

interface RequestContextParams {
  path: string;
}

export async function fetchPageContext<ExtraContentType>(
  options: PageContextOptions<ExtraContentType>
): Promise<{ common: CommonPageContext; extra: Optional<ExtraContentType> }> {
  let accessToken = null;

  try {
    const authService = new AuthService((options.host || '').toString(), options.correlationID);
    accessToken = await authService.fetchAccessToken(options.cookies);
  } catch (err) {
    if (err instanceof AuthenticationError) {
      if (options.authRequired) {
        throw err;
      }
    } else {
      throw err;
    }
  }

  const requestContextParams: RequestContextParams = { path: options.path };
  const commonContextService = new CommonContextService(
    (options.host || '').toString(),
    options.correlationID,
    accessToken
  );

  const requests: Array<Promise<CommonPageContext | ExtraContentType>> = [
    commonContextService.fetchContext(requestContextParams)
  ];

  if (typeof options.extra !== 'undefined') {
    requests.push(options.extra(accessToken));
  }

  const responses = await Promise.all(requests);
  const common = responses[0] as CommonPageContext;
  const extra = typeof options.extra !== 'undefined' ? (responses[1] as ExtraContentType) : null;

  common.host = options.host;

  return {
    common,
    extra
  };
}
