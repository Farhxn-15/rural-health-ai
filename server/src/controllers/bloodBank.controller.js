import axios from "axios";

// Distance calculator (Haversine, KM)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export const findNearBloodBanks = async (req, res) => {
  try {
    const { latitude, longitude, radius = 20000 } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude are required",
      });
    }

    const query = `
      [out:json];
      (
        node["amenity"="blood_bank"](around:${radius},${latitude},${longitude});
        way["amenity"="blood_bank"](around:${radius},${latitude},${longitude});
        relation["amenity"="blood_bank"](around:${radius},${latitude},${longitude});
      );
      out center;
    `;

    const response = await axios.post(
      "https://overpass-api.de/api/interpreter",
      query,
      { headers: { "Content-Type": "text/plain" } },
    );

    const bloodBanks = response.data.elements.map((bank) => {
      const lat = bank.lat || bank.center?.lat;
      const lng = bank.lon || bank.center?.lon;

      return {
        id: bank.id,
        name: bank.tags?.name || "Blood Bank",
        address:
          bank.tags?.["addr:full"] ||
          bank.tags?.["addr:street"] ||
          bank.tags?.city ||
          "Address not available",
        location: { lat, lng },
        distance_km: Number(
          calculateDistance(latitude, longitude, lat, lng).toFixed(2),
        ),
      };
    });

    // sort nearest first
    bloodBanks.sort((a, b) => a.distance_km - b.distance_km);

    res.status(200).json({
      success: true,
      meta: {
        user_location: {
          latitude: Number(latitude),
          longitude: Number(longitude),
        },
        radius_meters: Number(radius),
        total_results: bloodBanks.length,
      },
      data: bloodBanks,
    });
    console.log(bloodBanks);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch nearby blood banks",
    });
  }
};
/*
export const findNearBloodBanks = async (req, res) => {
  try {
    const { latitude, longitude, radius = 10000 } = req.query;

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ message: "Latitude and longitude are required" });
    }

    // Overpass API query (OpenStreetMap)
    const query = `
      [out:json];
      (
        node["amenity"="blood_bank"](around:${radius},${latitude},${longitude});
        way["amenity"="blood_bank"](around:${radius},${latitude},${longitude});
        relation["amenity"="blood_bank"](around:${radius},${latitude},${longitude});
      );
      out center;
    `;

    const response = await axios.post(
      "https://overpass-api.de/api/interpreter",
      query,
      { headers: { "Content-Type": "text/plain" } },
    );

    const bloodBanks = response.data.elements.map((bank) => ({
      name: bank.tags?.name || "Blood Bank",
      address:
        bank.tags?.["addr:full"] ||
        bank.tags?.["addr:street"] ||
        "Address not available",
      location: {
        lat: bank.lat || bank.center?.lat,
        lng: bank.lon || bank.center?.lon,
      },
      osm_id: bank.id,
    }));
    console.log(bloodBanks);
    res.status(200).json({ data: bloodBanks });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to fetch nearby blood banks" });
  }
};
*/
// export const findNearBloodBanks = async (req, res) => {
//   try {
//     const { latitude, longitude, radius } = req.query;
//
//     if (!latitude || !longitude) {
//       return res
//         .status(400)
//         .json({ message: "Latitude and longitude are required" });
//     }
//
//     const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; // store your key in .env
//     const searchRadius = radius || 5000; // default 5km
//
//     // Google Places Nearby Search API
//     const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${searchRadius}&type=hospital&keyword=blood%20bank&key=${GOOGLE_API_KEY}`;
//
//     const response = await axios.get(url);
//     console.log(response.data);
//     const bloodBanks = response.data.results.map((bank) => ({
//       name: bank.name,
//       address: bank.vicinity,
//       location: bank.geometry.location,
//       place_id: bank.place_id,
//     }));
//
//     res.status(200).json({ data: bloodBanks });
//   } catch (error) {
//     console.error(error.response?.data || error.message);
//     res.status(500).json({ message: "Failed to fetch nearby blood banks" });
//   }
// };
