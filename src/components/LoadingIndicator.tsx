import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet, StyleProp, ViewStyle, Text } from 'react-native';
import { theme } from '../theme';

interface LoadingIndicatorProps {
  /**
   * Size of the loading indicator
   * @default 'medium'
   */
  size?: 'small' | 'large' | number;

  /**
   * Color of the loading indicator
   * @default theme.colors.primary
   */
  color?: string;

  /**
   * Optional text to display below the loading indicator
   */
  text?: string;

  /**
   * Whether to show the loading indicator in a centered container
   * @default false
   */
  fullscreen?: boolean;

  /**
   * Additional styles for the container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Whether to show the loading indicator with a semi-transparent background overlay
   * @default false
   */
  overlay?: boolean;
}

/**
 * A reusable loading indicator component that can be used throughout the app
 * Automatically hides after 4 seconds
 */
const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = 'small',
  color = theme.colors.primary,
  text,
  fullscreen = false,
  style,
  overlay = false,
}) => {
  const [visible, setVisible] = useState(true);

  // Hide the spinner after 4 seconds
  useEffect(() => {
    const SPINNER_TIMEOUT = 4000;
    const timer = setTimeout(() => {
      setVisible(false);
    }, SPINNER_TIMEOUT);

    return () => clearTimeout(timer);
  }, []);

  // If timeout reached, don't render anything
  if (!visible) {
    return null;
  }
  // If fullscreen, render in a centered container
  if (fullscreen) {
    return (
      <View style={[styles.fullscreenContainer, overlay && styles.overlay, style]}>
        <ActivityIndicator size={size} color={color} />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    );
  }

  // Otherwise, render just the indicator with optional text
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  fullscreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  text: {
    marginTop: 10,
    fontSize: 14,
    color: theme.colors.text,
    fontFamily: theme.typography.fontFamily.regular,
    textAlign: 'center',
  },
});

export default LoadingIndicator;
