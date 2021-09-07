import get from 'lodash/get';
import Head from 'next/head';
import { ReactChild, useContext, useEffect } from 'react';

import { CommonContext } from 'contexts/common';
import { CommonPageContext } from 'core/services/context/context';
import { Layout } from 'components/layout/layout';

interface PageProps {
  ctx: CommonPageContext;
  children?: ReactChild;
}

export const Page = ({ ctx, children }: PageProps) => {
  const { context, setContext } = useContext(CommonContext);

  useEffect(() => {
    if (!context && ctx) {
      setContext(ctx);
    }
  }, [context, ctx, setContext]);

  return (
    <>
      <Head>
        <title>{get(ctx, 'seo.title', '')}</title>
        <meta property='og:title' content={get(ctx, 'seo.title', '')} key='title' />
      </Head>
      <Layout>
        {children}
      </Layout>
    </>
  );
};
