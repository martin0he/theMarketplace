import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
import { LocalCoordinates } from "../general/LocalCoordinates";
import { useAuth } from "../../auth/AuthProvider";
import { Box, Typography } from "@mui/material";
import supabase from "../../auth/supabase";
import { validateAddress } from "../general/ValidateAddress";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFydGluaGVtYSIsImEiOiJjbHdhZnM0M2IwOTY2MnFsZGd1eDNnZndnIn0._wuaWK6OY8ve2xMXx_4WhQ";

const MapSection: React.FC = () => {
  const { customUser } = useAuth();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    const fetchCoordinatesAndListings = async () => {
      if (!customUser || !mapContainerRef.current) return;

      try {
        const coordinates = await LocalCoordinates(customUser.school);
        const { data: Listings, error } = await supabase
          .from("Listings")
          .select("*")
          .is("date_deleted", null)
          .eq("school", customUser.school);

        if (error) {
          console.error("Error fetching recent listings:", error);
          return;
        }

        if (!coordinates) {
          console.error("Error fetching coordinates for the school.");
          return;
        }

        if (mapRef.current) {
          mapRef.current.remove();
        }

        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: coordinates,
          zoom: 15,
        });

        map.on("load", () => {
          new mapboxgl.Marker().setLngLat(coordinates).addTo(map);

          Listings.forEach(async (listing) => {
            if (await validateAddress(listing.exchange_location)) {
              const listingCoordinates = await LocalCoordinates(
                listing.exchange_location
              );
              new mapboxgl.Marker().setLngLat(listingCoordinates).addTo(map);
            }
          });
          new mapboxgl.Marker()
            .setLngLat([-71.09042113423872, 42.34034256208822])
            .addTo(map);
        });

        mapRef.current = map;
      } catch (error) {
        console.error("Error fetching coordinates or listings:", error);
      }
    };

    fetchCoordinatesAndListings();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [customUser]);

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
