import React from 'react';
import Svg, { Path } from 'react-native-svg';

// Home Icon
export const HomeIcon = (props) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M12 3l9 9-1.5 1.5L12 5l-7.5 8L3 12l9-9z"
      fill={props.color || "#000"} // Dynamique pour la couleur
    />
    <Path
      d="M4 12v8h5v-6h6v6h5v-8"
      stroke={props.color || "#000"}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Notifications Icon
export const NotificationsIcon = (props) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M12 22c1.1 0 2-.9 2-2H10c0 1.1.9 2 2 2zm6-6h-2v-5c0-3.07-2.24-5.64-5-5.93V5h-2v.07C7.24 6.36 5 8.91 5 12v5H3v2h18v-2h-3z"
      fill={props.color || "#000"}
    />
  </Svg>
);

// Account Icon
export const AccountIcon = (props) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-6 2.69-6 6v1h12v-1c0-3.31-2.69-6-6-6z"
      fill={props.color || "#000"}
    />
  </Svg>
);
