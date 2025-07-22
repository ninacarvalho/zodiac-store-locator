import { useThemeColor } from '@/hooks/useThemeColor';
import { OverlayView } from '@react-google-maps/api';
import React from 'react';

type CustomInfoWindowProps = {
  position: google.maps.LatLngLiteral;
  width?: number;
  height?: number;
  scale?: number;
  children: React.ReactNode;
};

const DEFAULT_WIDTH = 255;
const DEFAULT_HEIGHT = 170;

const TRIANGLE_WIDTH = 20;
const TRIANGLE_HEIGHT = 20;

const styles = {
  wrapper: (scale: number): React.CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transform: `translate(-50%, -100%) scale(${scale})`,
    pointerEvents: 'none',
  }),
  containerBase: (width: number, height: number, scale: number): React.CSSProperties => ({
    width: width * scale,
    height: height * scale,
    position: 'relative',
    borderRadius: 8,
    padding: 12,
    overflowY: 'auto',
    pointerEvents: 'auto',
  }),
  tail: {
    position: 'absolute' as const,
    left: '50%',
    width: 0,
    height: 0,
  },
};

export function CustomInfoWindow({
  position,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  scale = 1.0,
  children,
}: CustomInfoWindowProps) {
  const backgroundColor = useThemeColor({}, 'background');

  const containerStyle: React.CSSProperties = {
    ...styles.containerBase(width, height, scale),
    backgroundColor,
  };

  const tailStyle: React.CSSProperties = {
    ...styles.tail,
    borderTop: `${TRIANGLE_HEIGHT}px solid ${backgroundColor}`,
    bottom: -TRIANGLE_HEIGHT,
    marginLeft: -TRIANGLE_WIDTH,
    borderLeft: `${TRIANGLE_WIDTH}px solid transparent`,
    borderRight: `${TRIANGLE_WIDTH}px solid transparent`,
  };

  return (
    <OverlayView position={position} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
      <div style={styles.wrapper(scale)}>
        <div style={containerStyle}>{children}</div>
        <div style={tailStyle} />
      </div>
    </OverlayView>
  );
}

export default CustomInfoWindow;
