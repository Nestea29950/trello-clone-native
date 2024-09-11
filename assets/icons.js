// assets/icons.js
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const HomeIcon = (props) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path d="M12 3l9 9-1.5 1.5L12 5 4.5 13.5 3 12l9-9z" fill="#000" />
  </Svg>
);

export const NotificationsIcon = (props) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path d="M12 22c1.1 0 2-.9 2-2H10c0 1.1.9 2 2 2zm6-6h-2V11c0-3.07-2.24-5.64-5-5.93V5H7v1.07C4.24 6.36 2 8.91 2 12v4H0v2h24v-2h-2z" fill="#000" />
  </Svg>
);

export const AccountIcon = (props) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-6 2.69-6 6v1h12v-1c0-3.31-2.69-6-6-6z" fill="#000" />
  </Svg>
);
