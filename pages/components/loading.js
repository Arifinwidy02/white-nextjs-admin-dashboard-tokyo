import React from 'react';
// import { FaSpinner } from 'react-icons/fa';
import { Loop } from '@mui/icons-material';
import Lottie from 'lottie-react';
import NewLoadingAnimation from '../../public/animations/loading-new.json';

const LoadingSpinner = ({ size = 32, style, className = '' }) => (
  <div
    className={`d-flex justify-content-center align-items-center ${className}`}
    style={{ height: 200, ...style }}
  >
    <Loop className="icon-spin " size={size} />
  </div>
);
export default LoadingSpinner;

export const Loading = () => {
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
};
