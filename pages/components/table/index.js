import React, { useState } from 'react';
import { filterKeys } from '../../../hooks/formatter/formatter';
import {
  alignTextDecider,
  colorDeciderForDashboard,
  typeTable
} from '../../../hooks/decider/decider';
import { Button, Container, Typography } from '@mui/material';
import Image from 'next/image';
import { DeleteRounded } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';

const TableComponent = (route) => {
  const { data, ...propsTable } = route || {};
  const { handleDelete, type, tableHeadRepair } = propsTable || {};
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageClick = (imageUrl) => {
    setPreviewImage(imageUrl);
  };

  const handleClosePreview = () => {
    setPreviewImage(null);
  };

  const keysToExclude = [
    'updatedAt',
    'createdAt',
    'statusId',
    'isHiddenMotor',
    'qrcode'
  ];
  const filteredData = filterKeys(data, keysToExclude);
  const isEmptyTable = filteredData.length < 1;
  const { repairTable, motorTable } = typeTable(type);
  return (
    <div>
      <Container maxWidth="lg">
        <table
          className="table-autor"
          style={{ width: '100%', marginLeft: -25 }}
        >
          <thead>
            <tr>
              {repairTable ? (
                <>
                  {tableHeadRepair?.map((item, index) => {
                    return (
                      <th
                        key={index}
                        style={{
                          justifyContent: 'start',
                          alignItems: 'start',
                          backgroundColor: '#C7C8CC',

                          padding: 5
                        }}
                      >
                        {item}
                      </th>
                    );
                  })}
                </>
              ) : (
                <>
                  <th style={{ backgroundColor: '#C7C8CC' }}>NO</th>
                  {filteredData.length > 0 &&
                    Object.keys(filteredData[0]).map((key) => {
                      if (key !== 'no' && key !== 'id') {
                        return (
                          <th
                            key={key}
                            style={{
                              justifyContent: 'start',
                              alignItems: 'start',
                              backgroundColor: '#C7C8CC',

                              padding: 5
                            }}
                          >
                            {key.toUpperCase()}
                          </th>
                        );
                      }
                      return null;
                    })}
                  <th style={{ backgroundColor: '#C7C8CC' }}>Action</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {Boolean(isEmptyTable) && (
              <tr>
                {tableHeadRepair?.map((item) => {
                  return (
                    <td
                      style={{
                        textAlign: 'center',
                        padding: 5,
                        backgroundColor: 'white'
                      }}
                    >
                      {' '}
                      -{' '}
                    </td>
                  );
                })}
              </tr>
            )}
            {filteredData.map((item, index) => {
              return (
                <tr>
                  <td style={{ textAlign: 'center', padding: 5 }}>{item.no}</td>
                  {Object.keys(item).map((key) => {
                    if (key === 'status') {
                      return (
                        <td
                          key={key}
                          style={{
                            textAlign: alignTextDecider({ key }),
                            padding: 5
                          }}
                        >
                          <div
                            style={{
                              borderWidth: 1,
                              borderRadius: 10,
                              padding: 5,
                              backgroundColor: colorDeciderForDashboard({
                                status: item[key].description
                              }),
                              // width: 75,
                              justifyContent: 'center',
                              alignItems: 'center',
                              display: 'flex'
                            }}
                          >
                            {/* <Typography variant="h5" component="h5"> */}
                            {item[key].description.toUpperCase()}
                            {/* </Typography> */}
                          </div>
                        </td>
                      );
                    } else if (
                      (key === 'imgUrl') &
                      !item?.imgUrl.startsWith('..')
                    ) {
                      return (
                        <td
                          key={key}
                          style={{
                            // textAlign: alignTextDecider({ key }),
                            padding: 5
                          }}
                        >
                          <div
                            style={{
                              borderWidth: 1,
                              borderRadius: 10,
                              padding: 5,
                              backgroundColor: colorDeciderForDashboard({
                                status: item[key].description
                              }),
                              // width: 75,
                              justifyContent: 'center',
                              alignItems: 'center',
                              display: 'flex'
                            }}
                          >
                            <Image
                              src={item?.imgUrl}
                              alt="photo"
                              width={70}
                              height={40}
                              onClick={() => handleImageClick(item?.imgUrl)}
                              style={{ cursor: 'pointer' }}
                            />
                          </div>
                        </td>
                      );
                    } else if (key !== 'no' && key !== 'id') {
                      const value = item[key];
                      return (
                        <td
                          key={key}
                          className="px-5"
                          style={{
                            textAlign: alignTextDecider({ key }),
                            padding: 5
                          }}
                        >
                          {typeof value === 'object'
                            ? JSON.stringify(value)
                            : value}
                        </td>
                      );
                    }
                    return null;
                  })}
                  {Boolean(motorTable) && (
                    <>
                      <td style={{ textAlign: 'center', padding: 5 }}>
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
                            <Button variant="outlined" startIcon={<EditIcon />}>
                              Edit
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Container>
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
    </div>
  );
};

export default TableComponent;
