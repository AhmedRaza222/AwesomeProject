import config from 'config';
import { httpService } from 'src/services/httpService';

export const fetchCoordinates = async (location) => {
  try {
    const url =  `/geocode/json?address=${location}&key=${config.googleMapsApiKey}`;
    const response = await httpService.get(url);

    if (response.data.results.length) {
      const { lat, lng } = response.data.results[0].geometry.location;
      return { latitude: lat, longitude: lng };
    }

    return null;
  } catch (error) {
    console.error('Error fetching coordinates:', error.message);
    return null;
  }
};


