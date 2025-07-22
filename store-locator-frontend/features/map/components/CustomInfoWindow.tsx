import { useThemeColor } from '@/hooks/useThemeColor';
import { OverlayView } from '@react-google-maps/api';
import React, { useEffect, useRef } from 'react';

type CustomInfoWindowProps = {
  position: google.maps.LatLngLiteral;
  onCloseClick?: () => void;
  width?: number;
  height?: number;
  scale?: number;
  children: React.ReactNode;
};

const DEFAULT_WIDTH = 255;
const DEFAULT_HEIGHT = 170;

const TRIANGLE_WIDTH = 20;
const TRIANGLE_HEIGHT = 20;

export function CustomInfoWindow({
  position,
  onCloseClick,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  scale = 1.0,
  children,
}: CustomInfoWindowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundColor = useThemeColor({}, 'background');

  useEffect(() => {
    function handleWindowClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onCloseClick?.();
      }
    }

    window.addEventListener('mousedown', handleWindowClick);
    return () => window.removeEventListener('mousedown', handleWindowClick);
  }, [onCloseClick]);

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
        <div ref={containerRef} style={containerStyle} onWheel={(e) => e.stopPropagation()}>
          {children}
        </div>
        <div style={tailStyle} />
      </div>
    </OverlayView>
  );
}

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

export default CustomInfoWindow;
