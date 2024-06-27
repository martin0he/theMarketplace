// src/Map.tsx
import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
import { LocalCoordinates } from "../general/LocalCoordinates";
import { useAuth } from "../../auth/AuthProvider";
import { Box, Typography } from "@mui/material";
mapboxgl.accessToken =
  "pk.eyJ1IjoibWFydGluaGVtYSIsImEiOiJjbHdhZnM0M2IwOTY2MnFsZGd1eDNnZndnIn0._wuaWK6OY8ve2xMXx_4WhQ";

const MapSection: React.FC = () => {
  const { customUser } = useAuth();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const coordinates = await LocalCoordinates(
          customUser ? customUser.school : ""
        );
        if (mapContainerRef.current) {
          const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: coordinates,
            zoom: 14,
          });

          new mapboxgl.Marker().setLngLat(coordinates).addTo(map);

          return () => map.remove();
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchCoordinates();
  }, []);

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      display="flex"
      marginTop="20px"
    >
      {customUser ? (
        <div className="map-container" ref={mapContainerRef}></div>
      ) : (
        <Typography>no school :(</Typography>
      )}
    </Box>
  );
};

export default MapSection;
