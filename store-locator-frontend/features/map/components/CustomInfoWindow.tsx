import { OverlayView } from '@react-google-maps/api';
import React from 'react';

type CustomInfoWindowProps = {
  position: google.maps.LatLngLiteral;
  children: React.ReactNode;
};

export function CustomInfoWindow({ position, children }: CustomInfoWindowProps) {
  return (
    <OverlayView
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div style={{ background: 'white', padding: 12, borderRadius: 8 }}>
        {children}
      </div>
    </OverlayView>
  );
}

export default CustomInfoWindow;
