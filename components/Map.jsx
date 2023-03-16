import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const Map = () => {
  return (
    <GoogleMap
      className="w-40 h-40"
      zoom={10}
      center={{ lat: 44, lng: -80 }}
    ></GoogleMap>
  );
};

const MapComponent = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
};

export default MapComponent;
