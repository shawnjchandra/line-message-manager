import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div style={{
      position: 'relative',
      width: '300px',
      height: '600px',
      margin: '0 auto',
      border: '12px solid #1a1a1a', // Phone Border
      borderRadius: '40px',
      overflow: 'hidden', // Clips content inside the screen
      backgroundColor: '#fff',
      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
      zIndex: 1
    }}>
      {/* The "Notch" at the top */}
      {/* <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '150px',
        height: '24px',
        backgroundColor: '#1a1a1a',
        borderBottomLeftRadius: '14px',
        borderBottomRightRadius: '14px',
        zIndex: 10
      }}></div> */}

      {/* Screen Content */}
      <div style={{
        width: '100%',
        height: '100%',
        paddingTop: '25px', // Space for the notch
        overflowY: 'auto',   // Allow scrolling inside the phone
        display: 'flex',
        flexDirection: 'column'
      }}>
        {children}
      </div>
    </div>
  );
};

export default PhoneFrame;