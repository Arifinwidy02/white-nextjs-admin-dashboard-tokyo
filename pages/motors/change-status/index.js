import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import useMediaQuery from '@mui/material/useMediaQuery';
import { motion } from 'framer-motion';

import CancelIcon from '@mui/icons-material/Cancel';
import {
  Box,
  Button,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  FormLabel,
  Icon,
  RadioGroup,
  Typography
} from '@mui/material';
import Radio from '@mui/material/Radio';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { QrReader } from 'react-qr-reader';
import Footer from 'src/components/Footer';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Swal from 'sweetalert2';
import { baseUrl, fetch, useMutation } from '../../../hooks/api';
import { colorDeciderForDashboard } from '../../../hooks/decider/decider';
import Form from '../../components/forms/new-form';
import { Loading } from '../../components/loading';

function ChangeStatus() {
  const { handleSubmit, register, reset } = useForm();
  const [scanResult, setScanResult] = useState('No result');
  const [isShownQR, setIsShownQR] = useState(false);
  const [defaultValue, setDefaultValue] = useState({ statusId: 0, qrcode: '' });
  const qrRef = useRef(null);
  const router = useRouter();
  const isSmallScreen = useMediaQuery('(max-width: 460px)');

  const {
    data,
    loading: loadingFindData,
    refetch
  } = fetch({
    additionalURL: `dashboard/${+scanResult}`
  });

  const { data: listStatus, loading } = fetch({
    additionalURL: 'dashboard/status'
  });

  const { mutation, loading: loadingSubmit } = useMutation({
    method: 'patch',
    url: `${baseUrl}/`,
    afterSucces: (res) => {
      Swal.fire({
        text: res?.data?.message,
        icon: 'success'
      }).then(() => {
        // Reload the page using router.reload()
        reset();
        router.reload();
      });
    }
  });

  const handleScan = (result, error) => {
    if (!!result) {
      setScanResult(result?.text);
      refetch();
    }

    if (!!error) {
      console.info(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDefaultValue((prev) => ({
      ...prev,
      qrcode: data?.qrcode,
      [name]: +value
    }));
  };

  const onSubmit = () => {
    mutation(defaultValue);
  };

  const filteredStatus = data?.qrcode
    ? listStatus?.filter((el) => el.description !== data?.status?.description)
    : listStatus;

  useEffect(() => {}, [isShownQR]);
  if (loading || loadingFindData || loadingSubmit) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Change Status Motor</title>
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
          <CardHeader title="Change Status Motor" />
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
              <form onSubmit={handleSubmit(onSubmit)} noValidate type="post">
                <>
                  <div style={{ marginTop: 20 }}>
                    <label htmlFor="image-input">
                      {!isShownQR && !data.qrcode ? (
                        <>
                          <Button
                            variant="outlined"
                            component="span"
                            style={{
                              width: '100%',
                              height: 150,
                              borderWidth: 2,
                              borderColor: '#C7C8CC',
                              borderStyle: 'dashed',
                              borderSpacing: 2
                            }}
                            onClick={() => setIsShownQR(true)}
                          >
                            <div
                              style={{
                                padding: 10,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column'
                              }}
                            >
                              <QrCodeScannerIcon
                                style={{ width: 50, height: 50 }}
                              />
                              Scan QR Code
                            </div>
                          </Button>
                        </>
                      ) : data.qrcode ? (
                        <div
                          style={{
                            borderWidth: 1,
                            borderRadius: 10,
                            padding: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex'
                          }}
                        >
                          <div style={{ position: 'relative' }}>
                            <Icon
                              style={{
                                position: 'absolute',
                                top: -70,
                                right: -130,
                                width: 30,
                                height: 30,
                                cursor: 'pointer'
                              }}
                            >
                              <CancelIcon
                                onClick={() => {
                                  // setDefaultValue((prev) => ({
                                  //   ...prev,
                                  //   qrcode: ''
                                  // }));
                                  router.reload();
                                  setIsShownQR(false);
                                }}
                                style={{
                                  width: 15,
                                  height: 15,
                                  color: '#0C2D57'
                                }}
                              />
                            </Icon>
                          </div>
                          <img
                            src={`data:image/png;base64,${data?.qrcode}`}
                            alt="QR Code"
                            onClick={() =>
                              handleImageClick(
                                `data:image/png;base64,${data?.qrcode}`
                              )
                            }
                            style={{ cursor: 'pointer' }}
                          />
                        </div>
                      ) : (
                        <>
                          <QrReader
                            className={`lg:h-[400px] lg:w-[400px] h-[300px] w-[300px]`}
                            onResult={handleScan}
                            constraints={{ facingMode: 'environment' }}
                            style={{ width: '40%', height: '40%' }}
                            ref={qrRef}
                          />
                          <motion.div
                            style={{
                              position: 'absolute',
                              width: isSmallScreen ? '83%' : 375,
                              height: '2px',
                              backgroundColor: '#00ff00' // Change the color as needed
                            }}
                            initial={{ top: 225 }}
                            animate={{ top: isSmallScreen ? 450 : 500 }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              repeatType: 'reverse'
                            }}
                          />
                        </>
                      )}
                    </label>
                  </div>
                </>
                {!!data?.qrcode && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Typography variant="h5" display="contents" gutterBottom>
                        Change status
                      </Typography>
                    </div>
                    <Typography variant="caption" display="block" gutterBottom>
                      {data?.id_number?.toUpperCase()}
                    </Typography>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: -5
                      }}
                    >
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        style={{ marginTop: 3 }}
                      >
                        Current Status :{' '}
                      </Typography>
                      <div
                        style={{
                          borderWidth: 1,
                          borderRadius: 10,
                          paddingLeft: 10,
                          paddingRight: 10,
                          marginLeft: 5,
                          backgroundColor: colorDeciderForDashboard({
                            status: data?.status?.description
                          }),
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        {data?.status?.description?.toUpperCase()}
                      </div>
                    </div>
                  </div>
                )}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: data?.qrcode ? 0 : 10
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        borderTop: '1px solid black',
                        marginRight: '10px'
                      }}
                    ></div>
                    <FormLabel component="legend">
                      {data?.qrcode ? 'TO' : 'CHANGE STATUS TO'}
                    </FormLabel>
                    <div
                      style={{
                        flex: 1,
                        borderTop: '1px solid black',
                        marginLeft: '10px'
                      }}
                    ></div>
                  </div>
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="row-radio-buttons-group"
                  >
                    {filteredStatus.map(({ description, id }, index) => {
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
                </div>
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
            </Box>
          </CardContent>
        </Form>
      </div>
      <Footer />
    </>
  );
}

ChangeStatus.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default ChangeStatus;
