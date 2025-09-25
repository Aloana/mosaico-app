import React from 'react';

const CustomButton = ({ children, onClick, style, type = 'primary' }) => {
  const baseStyle = {
    marginTop: 'auto',
  };

  const typeStyles = {
    primary: {},
    secondary: { 
      backgroundColor: '#f1f5f9', 
      color: '#475569', 
      boxShadow: 'none', 
      border: '1px solid #cbd5e1' 
    },
    logout: {
      backgroundColor: '#fce8e6', 
      color: '#c53929', 
      marginTop: '20px', 
      boxShadow: 'none', 
      fontWeight: 600
    }
  };

  return (
    <div className="button" onClick={onClick} style={{ ...baseStyle, ...typeStyles[type], ...style }}>
      {children}
    </div>
  );
};

export default CustomButton;