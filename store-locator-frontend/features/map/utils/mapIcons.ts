export const getOrangePinIcon = (): google.maps.Icon => ({
  url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 0C18 0 6 12 6 26c0 18 26 38 26 38s26-20 26-38C58 12 46 0 32 0z" fill="#ff671f"/>
      <circle cx="32" cy="26" r="6" fill="#ffffff"/>
    </svg>
  `),
  scaledSize: new window.google.maps.Size(40, 40),
  anchor: new window.google.maps.Point(20, 40),
});