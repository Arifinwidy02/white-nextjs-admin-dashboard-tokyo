import Head from 'next/head';

import { Typography } from '@mui/material';
import * as React from 'react';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import SidebarLayout from 'src/layouts/SidebarLayout';
import { fetch } from '../../hooks/api';
import { Loading } from '../components/loading';
import TableComponent from '../components/table';

function RepairTable() {
  const { data, loading, refetch } = fetch({
    additionalURL: `dashboard/repair`,
    formatter: (res) => res
  });
  const tableHead = ['NO', 'ID NUMBER', 'STATUS', 'ORDER DATE', 'FINISH DATE'];

  if (loading) return <Loading />;

  const propsTable = { tableHead, type: 'repair' };
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
      <TableComponent data={data} {...propsTable} />
      <Footer />
    </>
  );
}

RepairTable.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default RepairTable;
