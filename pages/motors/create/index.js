import { PhotoCamera } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
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
  TextField
} from '@mui/material';
import Radio from '@mui/material/Radio';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Footer from 'src/components/Footer';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Swal from 'sweetalert2';
import { baseUrl, fetch, useMutation } from '../../../hooks/api';
import { finalDataFormatter } from '../../../hooks/formatter/formatter';
import { handleImageUploadFunction } from '../../../hooks/logic/general';
import Form from '../../components/forms/new-form';
import { Loading } from '../../components/loading';

function CreateMotor() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [acDC, setACDC] = useState('AC');
  const { handleSubmit, register, reset } = useForm();

  const { data: listStatus, loading } = fetch({
    additionalURL: 'dashboard/status'
  });

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

  const handleImageUpload = async (event) => {
    handleImageUploadFunction({ event, setUploadedImage });
  };
  useEffect(() => {}, [acDC]);

  if (loading || loadingPost) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Add New Motor</title>
      </Head>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginTop: 10
        }}
      >
        <Form>
          <CardHeader title="Add New Motor" />
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
                        {...register('hp', { required: true })}
                      />
                    </Grid>
                    <Grid direction="column">
                      <FormLabel component="legend">AC / DC</FormLabel>
                      <TextField
                        id="outlined-select-currency"
                        select
                        value={acDC}
                        onChange={handleChange}
                        required
                      >
                        {acDcOption.map((option) => (
                          <MenuItem
                            key={option.value}
                            value={option.value}
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
                    {...register('remarks', { required: true })}
                  />
                  <FormLabel component="legend">Status</FormLabel>
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="row-radio-buttons-group"
                  >
                    {listStatus.map(({ description, id }, index) => {
                      return (
                        <FormControlLabel
                          key={index}
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
                  {uploadedImage ? (
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
                          src={uploadedImage}
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

CreateMotor.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default CreateMotor;
