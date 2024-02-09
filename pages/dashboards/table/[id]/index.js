import { PhotoCamera } from '@mui/icons-material';
import {
  Box,
  Button,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  FormLabel,
  Grid,
  Icon,
  MenuItem,
  RadioGroup,
  TextField,
  styled
} from '@mui/material';
import Radio from '@mui/material/Radio';
import Lottie from 'lottie-react';
import Head from 'next/head';
import Footer from 'src/components/Footer';
import SidebarLayout from 'src/layouts/SidebarLayout';
import { baseUrl, fetch, useMutation } from '../../../../hooks/api';
import NewLoadingAnimation from '../../../../public/animations/loading-new.json';
import Form from '../../../components/forms/new-form';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { finalDataFormatter } from '../../../../hooks/formatter/formatter';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

const RootWrapper = styled(Box)(
  ({ theme }) => `
    height: calc(100vh - ${theme.header.height});
    display: flex;
    `
);
function DashboardTableEdit() {
  const route = useRouter();
  const { id } = route.query;
  const [uploadedImage, setUploadedImage] = useState(null);
  const [acDC, setACDC] = useState('AC');
  const { handleSubmit, register, reset } = useForm();

  const { data: listStatus, loading } = fetch({
    additionalURL: 'dashboard/status'
  });

  const {
    data: dataDetail,
    loading: loadingDataDetails,
    refetch
  } = fetch({
    defaultValue: {},
    additionalURL: `dashboard/${+id}`
  });
  console.log('dataDetail:', dataDetail);

  const { mutation, loading: loadingPost } = useMutation({
    method: 'post',
    url: `${baseUrl}/`,
    afterSucces: (res) => {
      Swal.fire({
        text: res?.data?.message,
        icon: 'success'
      });
      reset();
      setUploadedImage(null);
    }
  });

  const handleChange = (event) => {
    setACDC(event.target.value);
  };
  const acDcOption = [
    { label: 'AC', value: 'AC' },
    { label: 'DC', value: 'DC' }
  ];

  const onSubmit = (value, event) => {
    event.preventDefault();
    // Add the URL of the uploaded image to the value object
    value.imgUrl = uploadedImage;
    // Convert specific fields to numbers
    const numberFields = ['voltage', 'hp', 'statusId'];
    numberFields.forEach((field) => {
      if (value[field]) {
        value[field] = parseInt(value[field]);
      }
    });
    const dataFormatter = finalDataFormatter(value);
    mutation(dataFormatter);
  };

  // Function to handle file input change
  const handleImageUpload = (event) => {
    // const file = event.target.files[0]; // Get the first file from the input
    // setUploadedImage(URL.createObjectURL(file)); // Store the file URL in state
    const file = event.target.files[0]; // Get the first file from the input
    const reader = new FileReader();

    reader.onloadend = () => {
      setUploadedImage(reader.result); // Set the uploaded image URL
    };

    reader.readAsDataURL(file); // Read the file as a data URL
  };

  useEffect(() => {}, [acDC]);
  useEffect(() => {
    // Fetch data only if the id is defined
    if (id) {
      refetch();
    }
  }, [id]); // Fetch data whenever the id changes

  const trueLoading = loadingDataDetails || loading || loadingPost;

  if (trueLoading) {
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
        <title>Edit Motor</title>
      </Head>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginTop: 10,
          marginLeft: 30
        }}
      >
        <Form>
          <CardHeader title="Edit Motor" />
          <Divider />
          <CardContent>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' }
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate type="post">
                  <FormLabel component="legend">ID Number</FormLabel>
                  <TextField
                    required
                    id="outlined-password-input"
                    label="BTA-M-MIX-BB4-005"
                    type="text"
                    value={dataDetail?.id_number}
                    style={{ marginLeft: -2 }}
                    {...register('id_number', { required: true })}
                  />
                  <FormLabel component="legend">Manufacturer</FormLabel>
                  <TextField
                    style={{ marginLeft: -2 }}
                    required
                    id="outlined-password-input"
                    label="Toshiba"
                    type="text"
                    value={dataDetail?.manufacturer}
                    {...register('manufacturer', { required: true })}
                  />
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                  >
                    <Grid direction="column">
                      <FormLabel component="legend">Voltage</FormLabel>
                      <TextField
                        style={{ marginLeft: -2 }}
                        required
                        id="outlined-password-input"
                        label="460"
                        type="number"
                        value={dataDetail?.voltage}
                        {...register('voltage', { required: true })}
                      />
                    </Grid>
                    <Grid direction="column">
                      <FormLabel component="legend">HP</FormLabel>
                      <TextField
                        style={{ marginLeft: -2 }}
                        required
                        id="outlined-password-input"
                        label="20"
                        type="number"
                        value={dataDetail?.hp}
                        {...register('hp', { required: true })}
                      />
                    </Grid>
                    <Grid direction="column">
                      <FormLabel component="legend">AC / DC</FormLabel>
                      <TextField
                        id="outlined-select-currency"
                        select
                        label="AC / DC"
                        value={dataDetail?.ac_dc}
                        onChange={handleChange}
                        required
                      >
                        {acDcOption.map((option) => (
                          <MenuItem
                            value={dataDetail?.ac_dc}
                            key={option.value}
                            // value={option.value}
                            {...register('ac_dc')}
                          >
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>

                  <FormLabel component="legend">Remarks</FormLabel>
                  <TextField
                    style={{ marginLeft: -2 }}
                    required
                    id="outlined-password-input"
                    label="Mixer"
                    type="text"
                    value={dataDetail?.remarks}
                    {...register('remarks', { required: true })}
                  />
                  <FormLabel component="legend">Status</FormLabel>
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="row-radio-buttons-group"
                    value={dataDetail?.statusId}
                  >
                    {listStatus.map(({ description, id }) => {
                      return (
                        <FormControlLabel
                          value={id}
                          control={<Radio />}
                          label={description.toUpperCase()}
                          {...register('statusId', { required: true })}
                        />
                      );
                    })}
                  </RadioGroup>
                  <FormLabel component="legend" style={{ marginBottom: 5 }}>
                    Image Name Plate
                  </FormLabel>
                  {uploadedImage || dataDetail?.imgUrl ? (
                    <>
                      <div style={{ position: 'relative' }}>
                        <Icon
                          style={{
                            position: 'absolute',
                            top: 20,
                            right: 10,
                            width: 30,
                            height: 30,
                            cursor: 'pointer'
                          }}
                        >
                          <CancelIcon
                            onClick={() => setUploadedImage(null)}
                            style={{
                              width: 30,
                              height: 30,
                              color: '#0C2D57'
                            }}
                          />
                        </Icon>
                        <img
                          src={uploadedImage || dataDetail?.imgUrl}
                          alt="Uploaded"
                          style={{
                            width: '100%',
                            marginTop: '10px',
                            transition: 'color 0.3s'
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <input
                        accept="image/*"
                        id="image-input"
                        // capture="camera"
                        type="file"
                        value={dataDetail?.imgUrl}
                        style={{ display: 'none' }}
                        {...register('imgUrl', { required: true })}
                        onChange={handleImageUpload}
                      />
                      <label htmlFor="image-input">
                        <Button
                          variant="outlined"
                          component="span"
                          style={{
                            width: '100%',
                            height: 100,
                            borderWidth: 2,
                            borderColor: '#C7C8CC',
                            borderStyle: 'dashed',
                            borderSpacing: 2
                          }}
                        >
                          <div
                            style={{
                              width: 35,
                              height: 35,
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            <PhotoCamera />
                          </div>
                          Upload Image
                        </Button>
                      </label>
                    </>
                  )}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 20
                    }}
                  >
                    <Button
                      variant="contained"
                      type="submit"
                      onClick={handleSubmit(onSubmit)}
                      style={{ width: '50%' }}
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            </Box>
          </CardContent>
        </Form>
      </div>
      <Footer />
    </>
  );
}

DashboardTableEdit.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardTableEdit;
