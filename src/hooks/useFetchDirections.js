import { useState } from 'react';
import axios from 'axios';
import polyline from 'polyline';
import config from 'src/utils/config';

export const useFetchDirections = (origin, destination) => {
  const [directions, setDirections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDirections = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${config.googleMapsApiKey}`
      );

      if (response.data.routes.length) {
        const points = response.data.routes[0].overview_polyline.points;
        const coords = polyline.decode(points).map(([latitude, longitude]) => ({
          latitude,
          longitude,
        }));
        setDirections(coords);
      }
    } catch (error) {
      console.error('Error fetching directions:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { directions, isLoading, fetchDirections };
};
