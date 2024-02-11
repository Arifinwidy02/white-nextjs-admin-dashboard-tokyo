import { DeleteRounded } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Container,
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
import { dateFormatter, filterKeys } from '../../../hooks/formatter/formatter';

const TableComponent = (route) => {
  const { data, ...propsTable } = route || {};
  const {
    handleDelete,
    type,
    tableHead,
    handleClosePreview = () => {},
    handleImageClick = () => {},
    previewImage = false
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
                        {column}
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
                        <TableCell>{index + 1}</TableCell>

                        <TableCell>{motor?.id_number || id_number}</TableCell>
                        {!!motorTable ? (
                          <>
                            <TableCell>{remarks}</TableCell>
                            <TableCell>{manufacturer}</TableCell>
                            <TableCell>{voltage}</TableCell>
                            <TableCell>{hp}</TableCell>
                            <TableCell>{ac_dc}</TableCell>
                            <TableCell>
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
                            <TableCell>{dateFormatter(order_date)}</TableCell>
                            <TableCell>{dateFormatter(finish_date)}</TableCell>
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
