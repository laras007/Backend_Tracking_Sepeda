const axios = require("axios");

const getRouteDistanceFromORS = async (coordinates) => {
  if (coordinates.length < 2) {
    throw new Error("Minimal 2 koordinat diperlukan");
  }

  const apiKey = process.env.ORS_API_KEY;

  const body = {
    coordinates: coordinates.map(coord => [coord.longitude, coord.latitude]),
  };

  const response = await axios.post(
    "https://api.openrouteservice.org/v2/directions/cycling-regular/geojson",
    body,
    {
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
    }
  );

  const segments = response.data.features[0].properties.segments;
  const totalDistance = segments.reduce((sum, seg) => sum + seg.distance, 0); // in meters

  return totalDistance / 1000; // in km
};

module.exports = { getRouteDistanceFromORS };
