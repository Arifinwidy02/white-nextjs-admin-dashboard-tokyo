import { Box, Typography, styled } from '@mui/material';
import Lottie from 'lottie-react';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import SidebarLayout from 'src/layouts/SidebarLayout';
import { fetch } from '../../hooks/api';
import { colorDeciderForDashboard } from '../../hooks/decider/decider';
import { countingDataStatus } from '../../hooks/logic/dashbords';
import MotorAnimation from '../../public/animations/motor-list.json';
import EmptyData from '../components/empty-data';
import { Loading } from '../components/loading';

const RootWrapper = styled(Box)(
  ({ theme }) => `
       height: calc(100vh - ${theme.header.height});
       display: flex;
`
);
function Dashboard() {
  const [countingData, setCountingData] = useState([]);
  const { data, loading, refetch } = fetch({
    additionalURL: 'dashboard',
    formatter: (res) => res
  });
  const getCountingDataStatus = async () => {
    const statusCounting = await countingDataStatus(data);
    setCountingData(statusCounting);
  };

  useEffect(() => {
    getCountingDataStatus();
  }, []);
  const isEmptyData = data.length < 1;
  if (loading) {
    return <Loading />;
  }

  if (isEmptyData) {
    return <EmptyData />;
  }
  return (
    <>
      <Head>
        <title>Stock motor goodyear</title>
      </Head>
      <PageTitleWrapper>
        <div style={{ marginLeft: -30 }}>
          <Typography variant="h3" component="h3">
            All Motors
          </Typography>
        </div>
      </PageTitleWrapper>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginTop: -20,
          marginLeft: 30
        }}
      >
        {data?.map(({ status, id_number, id }) => {
          return (
            <div
              key={id}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: 5,
                marginRight: 10,
                marginBottom: 20
              }}
            >
              <Link href={`/dashboards/table/${id}`}>
                <div style={{ width: 100, height: 100, cursor: 'pointer' }}>
                  <Lottie animationData={MotorAnimation} />
                </div>
              </Link>
              <Typography variant="caption" display="block" gutterBottom>
                {id_number.toUpperCase()}
              </Typography>
              <div
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingTop: 2,
                  paddingRight: 2,
                  paddingLeft: 2,
                  paddingBottom: 0,
                  backgroundColor: colorDeciderForDashboard({
                    status: status?.description
                  }),
                  width: 75,
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                {/* <Typography variant="h5" component="h5"> */}
                <Typography variant="button" display="block" gutterBottom>
                  {status?.description.toUpperCase()}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>
      <PageTitleWrapper>
        <div style={{ marginLeft: -30 }}>
          <Typography variant="h3" component="h3">
            Status
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {Object.keys(countingData).map((key) => {
              console.log(countingData, "tipir")
              return (
                <div
                  style={{ display: 'flex', flexDirection: 'row' }}
                  key={key}
                >
                  <div
                    style={{
                      width: 50,
                      backgroundColor: colorDeciderForDashboard({
                        status: key
                      }),

                      marginRight: 10,
                      marginBottom: 5,
                      borderRadius: 5
                    }}
                  />
                  <div style={{ width: 65 }}>
                    <Typography variant="h5" component="h5">
                      {key.toUpperCase()}
                    </Typography>
                  </div>
                  <Typography variant="h5" component="h5">
                    : {countingData[key]}
                  </Typography>
                </div>
              );
            })}
          </div>
        </div>
      </PageTitleWrapper>
      <Footer />
    </>
  );
}

Dashboard.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Dashboard;
