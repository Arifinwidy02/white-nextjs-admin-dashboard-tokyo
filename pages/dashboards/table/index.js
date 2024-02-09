import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import { Typography } from '@mui/material';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Lottie from 'lottie-react';
import { baseUrl, fetch, useMutation } from '../../../hooks/api';
import NewLoadingAnimation from '../../../public/animations/loading-new.json';
import TableComponent from '../../components/table';
import { useState } from 'react';
import Swal from 'sweetalert2';

function DashboardTable() {
  const [idtoDelete, setIdToDelete] = useState();

  const { data, loading, refetch } = fetch({
    formatter: (res) => res,
    additionalURL: 'dashboard'
  });

  const {
    loading: loadingMutation,
    mutation,
    setResult
  } = useMutation({
    method: 'patch',
    url: `${baseUrl}/hidden/${idtoDelete}`,
    afterSucces: () => {
      Swal.fire({
        title: 'Deleted!',
        text: 'Your file has been deleted.',
        icon: 'success'
      });
      refetch();
    }
  });
  const handleDelete = async (item) => {
    const data = JSON.stringify(item);
    const newData = JSON.parse(data);
    setIdToDelete(newData?.id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        mutation();
      }
    });
  };
  const propsTable = {
    handleDelete,
    type: 'motor-table'
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <div style={{ width: 250, height: 250 }}>
          <Lottie animationData={NewLoadingAnimation} />
        </div>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>Stock motor goodyear</title>
      </Head>
      <PageTitleWrapper style={{ alignItems: 'start' }}>
        <div style={{ marginLeft: -30 }}>
          <Typography variant="h3" component="h3">
            Table All Motor
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

DashboardTable.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardTable;
