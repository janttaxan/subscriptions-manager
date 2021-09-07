import get from 'lodash/get';
import { GetServerSideProps } from 'next';

import { CommonPageContext, SubscriptionsPageContext } from 'core/services/context/context';
import { fetchPageContext, PageContextOptions } from 'core/services/context';
import { SubscriptionsService } from 'core/services/context/subscriptions';

import { Page } from 'components/page/page';

interface SubscriptionsPageProps {
  context: {
    common: CommonPageContext;
    extra: SubscriptionsPageContext
  };
}

const SubscriptionsPage = (props: SubscriptionsPageProps) => {
  return (
    <Page ctx={{ ...props.context.common, seo: { ...props.context.common.seo, title: 'test' } }}>
      <div>
        SubscriptionsPage
      </div>
    </Page>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const mainHost = process.env.NEXT_PUBLIC_MAIN_HOST || '';
  const correlationID = get(context, 'req.headers.x-request-id', null);
  const cookies = get(context, 'req.headers.cookie', null);

  const options: PageContextOptions<SubscriptionsPageContext> = {
    host: mainHost,
    correlationID,
    cookies,
    authRequired: false,
    path: '/',
    extra: (accessToken: Optional<string>): Promise<SubscriptionsPageContext> => {
      const subscriptionsService = new SubscriptionsService(mainHost, correlationID, accessToken);
      const response = subscriptionsService.fetchContext();
      return response;
    }
  };

  const pageContext = await fetchPageContext<SubscriptionsPageContext>(options);

  return {
    props: {
      context: pageContext
    }
  };
};

export default SubscriptionsPage;
