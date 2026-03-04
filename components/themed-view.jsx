import { View } from 'react-native';

import { useThemeColor } from '../hooks/use-theme-color';

/**
 * @typedef {Object} ThemedViewProps
 * @property {string} [lightColor]
 * @property {string} [darkColor]
 */

/**
 * @param {ThemedViewProps & import('react-native').ViewProps} props
 */
export function ThemedView({ style, lightColor, darkColor, ...otherProps }) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
