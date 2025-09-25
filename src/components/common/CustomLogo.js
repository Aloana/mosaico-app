import React from 'react';
import { SvgXml } from 'react-native-svg';

const logoSvgXml = `
<svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="20" height="20" rx="4" fill="#F44336"/>
<rect y="25" width="20" height="20" rx="4" fill="#FFC107"/>
<rect y="50" width="20" height="20" rx="4" fill="#4CAF50"/>
<rect y="75" width="20" height="20" rx="4" fill="#2196F3"/>
<rect x="25" width="20" height="20" rx="4" fill="#FF9800"/>
<rect x="25" y="25" width="20" height="20" rx="4" fill="#4CAF50"/>
<rect x="25" y="50" width="20" height="20" rx="4" fill="#2196F3"/>
<rect x="25" y="75" width="20" height="20" rx="4" fill="#F44336"/>
<rect x="50" width="20" height="20" rx="4" fill="#4CAF50"/>
<rect x="50" y="25" width="20" height="20" rx="4" fill="#2196F3"/>
<rect x="50" y="50" width="20" height="20" rx="4" fill="#F44336"/>
<rect x="50" y="75" width="20" height="20" rx="4" fill="#FFC107"/>
<rect x="75" width="20" height="20" rx="4" fill="#2196F3"/>
<rect x="75" y="25" width="20" height="20" rx="4" fill="#F44336"/>
<rect x="75" y="50" width="20" height="20" rx="4" fill="#FFC107"/>
<rect x="75" y="75" width="20" height="20" rx="4" fill="#4CAF50"/>
</svg>
`;

const CustomLogo = () => {
  return <SvgXml xml={logoSvgXml} width="80" height="80" />;
};

export default CustomLogo;
