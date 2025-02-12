"use client";
import { IProperty } from "@/types/property.types";
import { useEffect, useState } from "react";
import {
  fromAddress,
  GeocodeOptions,
  OutputFormat,
  setDefaults,
} from "react-geocode";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Spinner from "./spinner";
import L, { LatLngExpression } from "leaflet";
import MapPin from "./map-pin";

const PropertyMap = ({ property }: { property: IProperty }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: "en",
    region: "us",
    outputFormat: OutputFormat.JSON,
  } satisfies GeocodeOptions);

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
        );

        // Check geocode results
        if (res.results.length === 0) {
          setGeocodeError(true);
          return;
        }

        const { lat, lng } = res?.results[0]?.geometry?.location;
        setLat(lat);
        setLng(lng);
        setViewport({
          ...viewport,
          latitude: lat,
          longitude: lng,
        });
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCoords();
  }, []);

  if (loading) return <Spinner />;

  if (geocodeError)
    return <div className="text-xl">No location data found</div>;

  // const position: LatLngExpression = [51.505, -0.09];
  const position: LatLngExpression = [viewport.latitude, viewport.longitude];

  const customIcon = new L.DivIcon({
    html: MapPin(),
    className: "custom-marker-icon", // Optional: Add a CSS class for styling
    iconSize: [30, 30], // Size of the icon (adjust as needed)
    iconAnchor: [15, 30], // Anchor point of the icon (usually center-bottom)
  });

  return (
    <div id="map">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={customIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
