"use client";
import { IProperty } from "@/types/property.types";
import { useEffect, useState } from "react";
import {
  fromAddress,
  GeocodeOptions,
  OutputFormat,
  setDefaults,
} from "react-geocode";

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

  if (loading) return <h1>Loading...</h1>;

  if (geocodeError)
    return <div className="text-xl">No location data found</div>;

  return <div>map</div>;
};

export default PropertyMap;
