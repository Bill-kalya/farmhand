import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const getLocation = async () => {
      try {
        if (Platform.OS === 'web') {
          // Web geolocation
          if (!navigator.geolocation) {
            throw new Error('Geolocation is not supported');
          }

          navigator.geolocation.getCurrentPosition(
            (position) => {
              if (mounted) {
                setLocation({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                });
                setLoading(false);
              }
            },
            (error) => {
              if (mounted) {
                setError(error.message);
                setLoading(false);
              }
            }
          );
        } else {
          // Mobile geolocation
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            throw new Error('Permission to access location was denied');
          }

          let location = await Location.getCurrentPositionAsync({});
          if (mounted) {
            setLocation({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            });
            setLoading(false);
          }
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    getLocation();

    return () => {
      mounted = false;
    };
  }, []);

  return { location, error, loading };
};