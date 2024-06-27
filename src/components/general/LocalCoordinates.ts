// src/geocoding.ts
import axios from "axios";

const mapboxToken =
  "pk.eyJ1IjoibWFydGluaGVtYSIsImEiOiJjbHdhZnM0M2IwOTY2MnFsZGd1eDNnZndnIn0._wuaWK6OY8ve2xMXx_4WhQ";

export const LocalCoordinates = async (query: string) => {
  const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    query
  )}.json`;
  try {
    const response = await axios.get(endpoint, {
      params: {
        access_token: mapboxToken,
        limit: 1,
      },
    });

    if (response.data.features && response.data.features.length > 0) {
      const { center } = response.data.features[0];
      return center; // [longitude, latitude]
    } else {
      throw new Error("No results found");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw error;
  }
};
