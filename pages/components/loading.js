import React from 'react';
// import { FaSpinner } from 'react-icons/fa';
import { Loop } from '@mui/icons-material';
const LoadingSpinner = ({ size = 32, style, className = '' }) => (
  <div
    className={`d-flex justify-content-center align-items-center ${className}`}
    style={{ height: 200, ...style }}
  >
    <Loop className="icon-spin " size={size} />
  </div>
);
export default LoadingSpinner;
