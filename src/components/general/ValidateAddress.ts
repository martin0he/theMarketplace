import axios from "axios";

const mapboxToken =
  "pk.eyJ1IjoibWFydGluaGVtYSIsImEiOiJjbHdhZnM0M2IwOTY2MnFsZGd1eDNnZndnIn0._wuaWK6OY8ve2xMXx_4WhQ";

export const validateAddress = async (address: string): Promise<boolean> => {
  const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json`;
  try {
    const response = await axios.get(endpoint, {
      params: {
        access_token: mapboxToken,
        limit: 1,
      },
    });

    if (response.data.features && response.data.features.length > 0) {
      const feature = response.data.features[0];
      // Check if the feature has a valid place type and center coordinates
      if (feature.center && feature.place_type.includes("address")) {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Error validating address:", error);
    return false;
  }
};
