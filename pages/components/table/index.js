import { DeleteRounded } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import {
  Button,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  colorDeciderForDashboard,
  typeTable
} from '../../../hooks/decider/decider';
import { dateFormatter } from '../../../hooks/formatter/formatter';

const TableComponent = (route) => {
  const { data, ...propsTable } = route || {};
  const {
    handleDelete,
    type,
    tableHead,
    handleClosePreview = () => {},
    handleImageClick = () => {},
    previewImage = false,
    handleSort = () => {}
  } = propsTable || {};
  const { motorTable } = typeTable(type);

  return (
    <>
      <Container maxWidth="lg">
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table
              stickyHeader={previewImage ? false : true}
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  {tableHead?.map((column, index) => {
                    const isNotShowSort = motorTable
                      ? column == 'NO' ||
                        column == 'ACTION' ||
                        column == 'NAME PLATE' ||
                        column == 'QRCODE' ||
                        column == 'STATUS'
                      : column == 'NO';
                    const customStyleWidthMotor =
                      motorTable &&
                      (column == 'ID NUMBER' || column == 'NAME PLATE')
                        ? { width: 150 }
                        : {};
                    return (
                      <TableCell
                        key={index}
                        align={
                          motorTable
                            ? 'center'
                            : column == 'STATUS'
                            ? 'center'
                            : 'left'
                        }
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            ...customStyleWidthMotor
                          }}
                        >
                          {column}
                          {!isNotShowSort && (
                            <IconButton
                              type="button"
                              sx={{ p: '5px' }}
                              aria-label="search"
                              onClick={() => handleSort(column)}
                            >
                              <SwapVertIcon style={{ width: 15, height: 15 }} />
                            </IconButton>
                          )}
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((item, index) => {
                  const {
                    motor,
                    status,
                    order_date,
                    finish_date,
                    id_number,
                    remarks,
                    manufacturer,
                    voltage,
                    hp,
                    ac_dc,
                    imgUrl,
                    qrcode
                  } = item;
                  return (
                    <TableRow hover role="checkbox" key={item?.id}>
                      <>
                        <TableCell align={'center'}>{index + 1}</TableCell>

                        <TableCell align={'center'}>
                          {motor?.id_number || id_number}
                        </TableCell>
                        {!!motorTable ? (
                          <>
                            <TableCell>{remarks}</TableCell>
                            <TableCell>{manufacturer}</TableCell>
                            <TableCell align={'center'}>{voltage}</TableCell>
                            <TableCell>{hp}</TableCell>
                            <TableCell align={'center'}>{ac_dc}</TableCell>
                            <TableCell align={'center'}>
                              {
                                <Image
                                  src={imgUrl}
                                  alt="photo"
                                  width={100}
                                  height={100}
                                  onClick={() => handleImageClick(imgUrl)}
                                  style={{ cursor: 'pointer' }}
                                />
                              }
                            </TableCell>
                            <TableCell>
                              {
                                <Image
                                  src={`data:image/png;base64,${qrcode}`}
                                  alt="QR Code"
                                  width={100}
                                  height={100}
                                  onClick={() =>
                                    handleImageClick(
                                      `data:image/png;base64,${qrcode}`
                                    )
                                  }
                                  style={{ cursor: 'pointer' }}
                                />
                              }
                            </TableCell>
                            <TableCell>
                              {
                                <div
                                  style={{
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    padding: 5,
                                    backgroundColor: colorDeciderForDashboard({
                                      status: status?.description
                                    }),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    display: 'flex'
                                  }}
                                >
                                  {status?.description.toUpperCase()}
                                </div>
                              }
                            </TableCell>
                            <TableCell>
                              {
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: 5
                                  }}
                                >
                                  <Button
                                    variant="outlined"
                                    startIcon={<DeleteRounded />}
                                    onClick={() => handleDelete(item)}
                                  >
                                    Delete
                                  </Button>
                                  <Link
                                    href={`/dashboards/table/${item?.id}`}
                                    key={item.id}
                                  >
                                    <Button
                                      variant="outlined"
                                      startIcon={<EditIcon />}
                                    >
                                      Edit
                                    </Button>
                                  </Link>
                                </div>
                              }
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell>
                              <div
                                style={{
                                  borderWidth: 1,
                                  borderRadius: 10,
                                  padding: 5,
                                  backgroundColor: colorDeciderForDashboard({
                                    status: status?.description
                                  }),
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  display: 'flex'
                                }}
                              >
                                {status?.description.toUpperCase()}
                              </div>
                            </TableCell>
                            <TableCell align={'center'}>
                              {dateFormatter(order_date)}
                            </TableCell>
                            <TableCell align={'center'}>
                              {dateFormatter(finish_date)}
                            </TableCell>
                          </>
                        )}
                      </>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
};

export default TableComponent;
