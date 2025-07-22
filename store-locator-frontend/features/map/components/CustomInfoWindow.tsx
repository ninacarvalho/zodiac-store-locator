import { OverlayView } from '@react-google-maps/api';
import React from 'react';

type CustomInfoWindowProps = {
  position: google.maps.LatLngLiteral;
  scale?: number;
  children: React.ReactNode;
};

export function CustomInfoWindow({ position, scale = 1.0, children }: CustomInfoWindowProps) {
  return (
    <OverlayView
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: `translate(-50%, -100%) scale(${scale})`,
        pointerEvents: 'none',
      }}>
        <div style={{
          background: 'white',
          padding: 12,
          borderRadius: 8,
          pointerEvents: 'auto',
        }}>
          {children}
        </div>
      </div>
    </OverlayView>
  );
}

export default CustomInfoWindow;
