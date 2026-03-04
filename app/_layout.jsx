import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import '../components/hello-wave';
import { AuthProvider } from '../contexts/AuthContext';

const theme = {
  colors: {
    primary: '#2e7d32',
    accent: '#ff9800',
    background: '#f5f5f5',
    surface: '#ffffff',
    text: '#333333',
    disabled: '#9e9e9e',
    placeholder: '#666666',
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2e7d32',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="login"
            options={{ title: 'Sign In' }}
          />
          <Stack.Screen
            name="register"
            options={{ title: 'Create Account' }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="dashboard"
            options={{ title: 'Dashboard', headerShown: false }}
          />
          <Stack.Screen
            name="map"
            options={{ title: 'Map View' }}
          />
          <Stack.Screen
            name="products"
            options={{ title: 'Products' }}
          />
          <Stack.Screen
            name="services"
            options={{ title: 'Services' }}
          />
        </Stack>
      </AuthProvider>
    </PaperProvider>
  );
}

