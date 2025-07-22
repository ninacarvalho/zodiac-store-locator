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
    background: 'white',
  }),
};

export function CustomInfoWindow({
  position,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  scale = 1.0,
  children,
}: CustomInfoWindowProps) {
  return (
    <OverlayView position={position} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
      <div style={styles.wrapper(scale)}>
        <div style={styles.containerBase(width, height, scale)}>
          {children}
        </div>
      </div>
    </OverlayView>
  );
}

export default CustomInfoWindow;
