'use client';

import { Box, Card, Container, styled } from '@mui/material';
import BaseLayout from 'src/layouts/BaseLayout';

import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import LogoAnimation from 'src/components/LoadingLogo';
import Hero from 'src/content/Overview/Hero';
import GoodyearLogo from '../public/static/images/logo/goodyear-logo-vector.svg';

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
  ({ theme }) =>
    `
    overflow: auto;
    background: url('/static/images/background/Background.jpg');
    background-size: cover;
    background-position: center;
    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
  const [isAnimating, setIsAnimating] = useState(false);
  const onClick = () => {
    setIsAnimating(true);
  };
  if (isAnimating) {
    return <LogoAnimation isAnimating={isAnimating} />;
  }
  return (
    <OverviewWrapper>
      <Head>
        <title>Stock motor good year</title>
      </Head>
      <HeaderWrapper>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center">
            <div>
              <Image src={GoodyearLogo} alt="logo" width={200} height={200} />
            </div>
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
      <Hero onClick={onClick} />
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
  return <BaseLayout>{page}</BaseLayout>;
};
