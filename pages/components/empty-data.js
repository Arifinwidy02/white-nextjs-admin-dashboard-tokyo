import { Typography } from '@mui/material';
import Lottie from 'lottie-react';
import Link from 'next/link';
import React from 'react';
import isEmptyDataPerson from '../../public/animations/empty-data-person.json';

const EmptyData = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        flexDirection: 'column',
        marginTop: 25
      }}
    >
      <Typography variant="h1" gutterBottom>
        Ooopss..
      </Typography>
      <div style={{ width: 450, height: 450 }}>
        <Lottie animationData={isEmptyDataPerson} />
      </div>
      <Typography variant="subtitle2" gutterBottom>
        We don't have any data yet
      </Typography>
      <Link href={'/motors/create'}>
        <Typography
          variant="subtitle2"
          component="h1"
          style={{ cursor: 'pointer' }}
        >
          Please add the data
        </Typography>
      </Link>
    </div>
  );
};

export default EmptyData;
