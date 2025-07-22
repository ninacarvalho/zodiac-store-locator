import { Marker } from '@react-google-maps/api';
import React from 'react';
import { getOrangePinIcon } from '../utils/mapIcons';

interface CustomMarkerProps<T> {
  item: T;
  position: { lat: number; lng: number };
  isSelected: (item: T) => boolean;
  onSelect: (id: number) => void;
  onDeselect: () => void;
  getId: (item: T) => number;
  getTitle: (item: T) => string;
  renderOverlay: (item: T) => React.ReactNode;
  icon?: google.maps.Icon | string;
}

function CustomMarker<T>({
  item,
  position,
  isSelected,
  onSelect,
  onDeselect,
  getId,
  getTitle,
  renderOverlay,
  icon = getOrangePinIcon(),
}: CustomMarkerProps<T>) {
  return (
    <>
      <Marker
        icon={icon}
        position={position}
        title={getTitle(item)}
        onClick={() => onSelect(getId(item))}
      />
      {isSelected(item) && renderOverlay(item)}
    </>
  );
}

export default CustomMarker;
