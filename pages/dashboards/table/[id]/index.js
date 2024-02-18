import { PhotoCamera } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  Box,
  Button,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Icon,
  MenuItem,
  RadioGroup,
  TextField
} from '@mui/material';
import Radio from '@mui/material/Radio';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Footer from 'src/components/Footer';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Swal from 'sweetalert2';
import { baseUrl, fetch, useMutation } from '../../../../hooks/api';
import { finalDataFormatter } from '../../../../hooks/formatter/formatter';
import { handleImageUploadFunction } from '../../../../hooks/logic/general';
import Form from '../../../components/forms/new-form';
import { Loading } from '../../../components/loading';

function DashboardTableEdit() {
  const route = useRouter();
  const { id = 1 } = route.query;
  const [uploadedImage, setUploadedImage] = useState(null);
  const [acDC, setACDC] = useState('AC');
  const [formValues, setFormValues] = useState({
    id_number: '',
    manufacturer: '',
    voltage: '',
    hp: '',
    ac_dc: 'AC',
    remarks: '',
    statusId: '',
    imgUrl: ''
  });
  const { handleSubmit, register, formState } = useForm();

  const { errors } = formState;

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

  const { mutation, loading: loadingPost } = useMutation({
    method: 'put',
    url: `${baseUrl}/dashboard/${id}`,
    afterSucces: (res) => {
      Swal.fire({
        text: res?.data?.message,
        icon: 'success'
      });
      route.push('/dashboards/table');
    }
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const onSubmit = (value, event) => {
    event.preventDefault();
    // Add the URL of the uploaded image to the value object
    value.imgUrl = uploadedImage;
    // Convert specific fields to numbers
    const numberFields = ['voltage', 'hp', 'statusId'];
    numberFields.forEach((field) => {
      if (formValues[field]) {
        formValues[field] = parseInt(formValues[field]);
      }
    });
    const dataFormatter = finalDataFormatter(formValues);
    mutation(dataFormatter);
  };

  // Function to handle file input change
  const handleImageUpload = (event) => {
    handleImageUploadFunction({ event, setUploadedImage });
  };
  const fillingFirstValue = () => {
    setFormValues(dataDetail);
  };

  const acDcOption = [
    { label: 'AC', value: 'AC' },
    { label: 'DC', value: 'DC' }
  ];

  useEffect(() => {}, [acDC]);
  useEffect(() => {
    if (dataDetail) {
      fillingFirstValue(dataDetail);
    } else {
      refetch();
      fillingFirstValue(dataDetail);
    }
  }, [id, dataDetail]); // Fetch data whenever the id changes

  const trueLoading = loadingDataDetails || loading || loadingPost;

  if (trueLoading) {
    return <Loading />;
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
                    id="id_number"
                    label="BTA-M-MIX-BB4-005"
                    type="text"
                    onChangeCapture={handleChange}
                    value={formValues?.id_number}
                    style={{ marginLeft: -2 }}
                    {...register('id_number', {
                      required: formValues?.id_number ? false : true
                    })}
                    error={errors.id_number ? true : false}
                    helperText={
                      <FormHelperText
                        sx={{
                          fontWeight: 400,
                          fontSize: 'inherit',
                          lineHeight: 'inherit'
                        }}
                      >
                        {errors.id_number && 'ID Number is required'}
                      </FormHelperText>
                    }
                  />
                  <FormLabel component="legend">Manufacturer</FormLabel>
                  <TextField
                    style={{ marginLeft: -2 }}
                    required
                    id="manufacturer"
                    label="Toshiba"
                    type="text"
                    value={formValues?.manufacturer}
                    onChangeCapture={handleChange}
                    {...register('manufacturer', {
                      required: formValues?.manufacturer ? false : true
                    })}
                    error={errors.manufacturer ? true : false}
                    helperText={
                      <FormHelperText
                        sx={{
                          fontWeight: 400,
                          fontSize: 'inherit',
                          lineHeight: 'inherit'
                        }}
                      >
                        {errors.manufacturer && 'Manufacturer is required'}
                      </FormHelperText>
                    }
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
                        id="voltage"
                        label="460"
                        type="number"
                        onChangeCapture={handleChange}
                        value={formValues?.voltage}
                        {...register('voltage', {
                          required: formValues?.voltage ? false : true
                        })}
                        error={errors.voltage ? true : false}
                        helperText={
                          <FormHelperText
                            sx={{
                              fontWeight: 400,
                              fontSize: 'inherit',
                              lineHeight: 'inherit'
                            }}
                          >
                            {errors.voltage && 'Voltage is required'}
                          </FormHelperText>
                        }
                      />
                    </Grid>
                    <Grid direction="column">
                      <FormLabel component="legend">HP</FormLabel>
                      <TextField
                        style={{ marginLeft: -2 }}
                        required
                        id="hp"
                        label="20"
                        type="number"
                        value={formValues?.hp}
                        onChangeCapture={handleChange}
                        {...register('hp', {
                          required: formValues?.hp ? false : true
                        })}
                        error={errors.hp ? true : false}
                        helperText={
                          <FormHelperText
                            sx={{
                              fontWeight: 400,
                              fontSize: 'inherit',
                              lineHeight: 'inherit'
                            }}
                          >
                            {errors.hp && 'HP is required'}
                          </FormHelperText>
                        }
                      />
                    </Grid>
                    <Grid direction="column">
                      <FormLabel component="legend">AC / DC</FormLabel>
                      <TextField
                        id="ac_dc"
                        select
                        label="AC / DC"
                        value={formValues?.ac_dc?.toUpperCase()}
                        required
                      >
                        {acDcOption.map((option) => (
                          <MenuItem
                            key={option.value}
                            value={option.value}
                            {...register('ac_dc')}
                            onClick={() => {
                              const event = {
                                target: {
                                  name: 'ac_dc',
                                  value: option.value
                                }
                              };
                              handleChange(event);
                            }}
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
                    id="remarks"
                    label="Mixer"
                    type="text"
                    value={formValues?.remarks}
                    onChangeCapture={handleChange}
                    {...register('remarks', {
                      required: formValues?.remarks ? false : true
                    })}
                    error={errors.remarks ? true : false}
                    helperText={
                      <FormHelperText
                        sx={{
                          fontWeight: 400,
                          fontSize: 'inherit',
                          lineHeight: 'inherit'
                        }}
                      >
                        {errors.remarks && 'Remarks is required'}
                      </FormHelperText>
                    }
                  />
                  <FormLabel component="legend">Status</FormLabel>
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="row-radio-buttons-group"
                    value={formValues?.statusId}
                  >
                    {listStatus.map(({ description, id }, index) => {
                      return (
                        <FormControlLabel
                          key={index}
                          value={id}
                          control={<Radio />}
                          label={description.toUpperCase()}
                          onChangeCapture={handleChange}
                          {...register('statusId', { required: true })}
                        />
                      );
                    })}
                  </RadioGroup>
                  <FormLabel component="legend" style={{ marginBottom: 5 }}>
                    Image Name Plate
                  </FormLabel>
                  {uploadedImage || formValues?.imgUrl ? (
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
                            onClick={() => {
                              setFormValues((prev) => ({
                                ...prev,
                                imgUrl: null
                              }));
                              setUploadedImage(null);
                            }}
                            style={{
                              width: 30,
                              height: 30,
                              color: '#0C2D57'
                            }}
                          />
                        </Icon>
                        <img
                          src={uploadedImage || formValues?.imgUrl}
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
                        value={formValues?.imgUrl}
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
