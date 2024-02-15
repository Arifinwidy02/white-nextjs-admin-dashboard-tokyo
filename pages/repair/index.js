import Head from 'next/head';

import { Typography } from '@mui/material';
import * as React from 'react';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import SidebarLayout from 'src/layouts/SidebarLayout';
import { fetch } from '../../hooks/api';
import { Loading } from '../components/loading';
import TableComponent from '../components/table';
import EmptyData from '../components/empty-data';
import { formatterSortName } from '../../hooks/formatter/formatter';
import { useRouter } from 'next/router';

function RepairTable() {
  const { data, loading, refetch } = fetch({
    additionalURL: `dashboard/repair`,
    formatter: (res) => res
  });
  const router = useRouter();
  const tableHead = ['NO', 'ID NUMBER', 'STATUS', 'ORDER DATE', 'FINISH DATE'];
  const isEmptyData = data.length < 1;

  const handleSort = async (value) => {
    const formatSortName = await formatterSortName(value);
    // Check if the current sort direction is DESC
    const isDesc = router.query[formatSortName] === 'DESC';
    // Sort the data based on the formatSortName and the current sort direction
    let sortedData = data.sort((a, b) => {
      if (isDesc) {
        if (a[formatSortName] < b[formatSortName]) return 1;
        if (a[formatSortName] > b[formatSortName]) return -1;
      } else {
        if (a[formatSortName] < b[formatSortName]) return -1;
        if (a[formatSortName] > b[formatSortName]) return 1;
      }
      return 0;
    });

    // Toggle the sort direction for the next click
    const nextSortDirection = isDesc ? 'ASC' : 'DESC';

    // Update the query string with the new sort parameter and sort direction
    router.push({
      pathname: router.pathname,
      query: { ...router.query, [formatSortName]: nextSortDirection }
    });
  };
  if (loading) return <Loading />;
  if (isEmptyData) {
    return <EmptyData />;
  }

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
