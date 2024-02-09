import Head from 'next/head';

import SidebarLayout from 'src/layouts/SidebarLayout';
import PageHeader from 'src/content/Dashboards/Crypto/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid, Typography } from '@mui/material';
import Footer from 'src/components/Footer';
import RepairIcon from '@mui/icons-material/Construction';
import TableComponent from '../components/table';
import { fetch } from '../../hooks/api';

function RepairTable() {
  const { data, loading, refetch } = fetch({
    additionalURL: `dashboard/repair`,
    formatter: (res) => res
  });
  console.log('data:', data);
  const tableHeadRepair = [
    'NO',
    'ID NUMBER',
    'STATUS',
    'ORDER DATE',
    'FINISH DATE'
  ];
  const propsTable = { tableHeadRepair, type: 'repair' };
  return (
    <>
      <Head>
        <title>Table Repair</title>
      </Head>
      <PageTitleWrapper style={{ alignItems: 'start' }}>
        <div style={{ marginLeft: -30 }}>
          <Typography variant="h3" component="h3">
            Table Repair
          </Typography>
        </div>
      </PageTitleWrapper>
      <div
        style={{
          paddingLeft: 30
        }}
      >
        <TableComponent data={data} {...propsTable} />
      </div>
      <Footer />
    </>
  );
}

RepairTable.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default RepairTable;
