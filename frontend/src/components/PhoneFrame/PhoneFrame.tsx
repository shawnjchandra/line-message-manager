import React from 'react';
import './PhoneFrame.scss'

interface PhoneFrameProps {
  children: React.ReactNode;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className='phoneFrame'>
      <div className='screenContent'>
        {children}
      </div>
    </div>
  );
};

export default PhoneFrame;