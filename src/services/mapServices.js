import axios from 'axios';
import config from 'src/utils/config';
import { httpService } from 'src/services/httpServices';

export const fetchCoordinates = async (location) => {
  try {
    const url = `/geocode/json?address=${encodeURIComponent(location)}&key=${config.googleMapsApiKey}`;
    const response = await httpService.get(url);
    const result = response.data.results[0];
    if (result) {
      const { lat, lng } = result.geometry.location;
      return { latitude: lat, longitude: lng };
    }
    return null;
  } catch (error) {
    console.error('Error fetching coordinates:', error.message);
    return null;
  }
};

// export const fetchDirections = async (origin, destination) => {
//   try {
//     const url = `/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${config.googleMapsApiKey}`; 
//     const response = await httpService.get(url);
//     if (response.data.routes.length) {
//       const points = response.data.routes[0].overview_polyline.points;
//       return decodePolyline(points);
//     }
//     return null;
//   } catch (error) {
//     console.error('Error fetching directions:', error.message);
//     return null;
//   }
// };

// // Decode polyline string into coordinates
// const decodePolyline = (points) => {
//   const polyline = require('polyline');
//   return polyline.decode(points).map(([latitude, longitude]) => ({
//     latitude,
//     longitude,
//   }));
// };
