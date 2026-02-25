export default function MapEmbed({ latitude, longitude, height = 'h-72' }) {
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const src = key
    ? `https://www.google.com/maps/embed/v1/view?key=${key}&center=${latitude},${longitude}&zoom=14`
    : `https://maps.google.com/maps?q=${latitude},${longitude}&z=14&output=embed`;

  return <iframe title="property map" src={src} loading="lazy" className={`w-full rounded-xl border ${height}`} />;
}
