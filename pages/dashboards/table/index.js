import { Container, Typography } from '@mui/material';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Swal from 'sweetalert2';
import { baseUrl, fetch, useMutation } from '../../../hooks/api';
import { Loading } from '../../components/loading';
import TableComponent from '../../components/table';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';
function DashboardTable() {
  const [idtoDelete, setIdToDelete] = useState();
  const [previewImage, setPreviewImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { query } = router;
  const { id_number } = query;
  const optionalQuery = id_number ? `id_number=${id_number}` : '';
  const { data, loading, refetch } = fetch({
    formatter: (res) => res,
    additionalURL: `dashboard/?${optionalQuery}`
  });
  console.log('data:', data);

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
  const handleImageClick = (imageUrl) => {
    setPreviewImage(imageUrl);
  };

  const handleClosePreview = () => {
    setPreviewImage(null);
  };
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

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (value == '') {
      router.push({
        pathname: router.pathname
        // query: { ...router.query, [name]: value }
      });
    }
    setSearchQuery(value);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, [name]: value }
    });
  };

  const handleSearch = () => {
    refetch();
  };

  const tableHead = [
    'NO',
    'ID NUMBER',
    'REMARKS',
    'MANUFACTURER',
    'VOLTAGE',
    'HP',
    'AC/DC',
    'NAME PLATE',
    'QRCODE',
    'STATUS',
    'ACTION'
  ];
  const propsTable = {
    handleDelete,
    type: 'motor-table',
    tableHead,
    handleImageClick,
    handleClosePreview,
    previewImage
  };

  // useEffect(() => {
  //   refetch();
  // }, [query]);

  if (loading) {
    return <Loading />;
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
      <Container maxWidth="lg" style={{ marginTop: -10, marginBottom: 5 }}>
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search ID Number"
            name="id_number"
            value={searchQuery}
            inputProps={{ 'aria-label': 'search google maps' }}
            onChangeCapture={handleChange}
          />
          <IconButton
            type="button"
            sx={{ p: '10px' }}
            aria-label="search"
            onClick={handleSearch}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Container>

      <TableComponent data={data} {...propsTable} />
      {previewImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onClick={handleClosePreview}
        >
          <img
            src={previewImage}
            alt="Preview"
            style={{ maxWidth: '80%', maxHeight: '80%', cursor: 'pointer' }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
          />
        </div>
      )}

      <Footer />
    </>
  );
}

DashboardTable.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardTable;
