'use client';

import { Box, Card, Container, Typography, styled } from '@mui/material';
import BaseLayout from 'src/layouts/BaseLayout';

import Head from 'next/head';
import Link from 'src/components/Link';

import Hero from 'src/content/Overview/Hero';
import { fetch } from '../hooks/api';

const HeaderWrapper = styled(Card)(
  ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
  margin-bottom: ${theme.spacing(10)};
`
);

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
  const { data, loading, refetch } = fetch({
    additionalURL: 'dashboard',
    formatter: (res) => res
  });
  const { data: listStatus, loading: loadingkampret } = fetch({
    additionalURL: 'dashboard/status'
  });
  return (
    <OverviewWrapper>
      <Head>
        <title>Stock motor good year</title>
      </Head>
      <HeaderWrapper>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center">
            {/* <div>
             Logo should here
            </div> */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flex={1}
            >
              <Box />
            </Box>
          </Box>
        </Container>
      </HeaderWrapper>
      <Hero />
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography textAlign="center" variant="subtitle1">
          Crafted by{' '}
          <Link
            href="https://bloomui.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Arifin Widyatmoko
          </Link>
        </Typography>
      </Container>
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
  return <BaseLayout>{page}</BaseLayout>;
};
