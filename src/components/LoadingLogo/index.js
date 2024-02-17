import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const LogoAnimation = ({ isAnimating }) => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/dashboards');
    }, 3000);
  }, []);

  return (
    <div
      className="bg-blue-200"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 100
      }}
    >
      <motion.div
        className="responsive-width"
        initial={{ opacity: 0, scale: 0 }}
        animate={isAnimating ? { opacity: 1, scale: 1 } : {}}
        transition={{ ease: 'easeIn', duration: 1.5 }}
        style={{
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={isAnimating ? { scale: 1.25 } : {}}
          transition={{
            type: 'spring',
            stiffness: 75,
            damping: 10,
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        >
          <Image
            src={'/static/images/logo/goodyear-logo.png'}
            alt="logo"
            width={400}
            height={400}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LogoAnimation;
