import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function MapScreen() {
  const router = useRouter();
  const [nearbyStores, setNearbyStores] = useState([]);
  const [nearbyLaborers, setNearbyLaborers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userLocation, setUserLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState(false);

  useEffect(() => {
    getLocationAndLoadData();
  }, []);

  const getLocationAndLoadData = async () => {
    try {
      if (Platform.OS === 'web') {
        await getWebLocation();
      } else {
        await getMobileLocation();
      }
      loadSampleData();
    } catch (error) {
      console.error('Error getting location:', error);
      loadSampleData();
    }
  };

  const getMobileLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Need location permission for this feature');
      setLocationPermission(false);
      return;
    }

    setLocationPermission(true);
    let location = await Location.getCurrentPositionAsync({});
    setUserLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  const getWebLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        Alert.alert('Error', 'Geolocation is not supported by this browser.');
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationPermission(true);
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          resolve(position);
        },
        (error) => {
          setLocationPermission(false);
          reject(error);
        }
      );
    });
  };

  const loadSampleData = () => {
    setNearbyStores([
      {
        id: 1,
        name: 'Green Thumb Agri Store',
        type: 'Seeds & Fertilizers',
        distance: userLocation ? '2.3 km' : 'Distance unavailable',
        rating: 4.5,
        products: ['Seeds', 'Fertilizers', 'Tools'],
        phone: '+254712345678',
        isOpen: true,
        category: 'seeds',
      },
      {
        id: 2,
        name: 'Farm Equipment Hub',
        type: 'Machinery',
        distance: userLocation ? '3.1 km' : 'Distance unavailable',
        rating: 4.2,
        products: ['Tractors', 'Plows', 'Sprayers'],
        phone: '+254723456789',
        isOpen: true,
        category: 'equipment',
      },
    ]);

    setNearbyLaborers([
      {
        id: 1,
        name: 'John Kamau',
        service: 'Plowing',
        distance: userLocation ? '1.8 km' : 'Distance unavailable',
        rating: 4.8,
        skills: ['Plowing', 'Harvesting'],
        rate: 'KSh 1500/day',
        isAvailable: true,
        category: 'plowing',
      },
      {
        id: 2,
        name: 'Mary Wanjiku',
        service: 'Spraying',
        distance: userLocation ? '2.5 km' : 'Distance unavailable',
        rating: 4.6,
        skills: ['Spraying', 'Irrigation'],
        rate: 'KSh 1200/day',
        isAvailable: true,
        category: 'spraying',
      },
    ]);
  };

  const categories = [
    { id: 'all', name: 'All', icon: 'apps' },
    { id: 'seeds', name: 'Seeds', icon: 'spa' },
    { id: 'fertilizers', name: 'Fertilizers', icon: 'eco' },
    { id: 'equipment', name: 'Equipment', icon: 'build' },
    { id: 'plowing', name: 'Plowing', icon: 'agriculture' },
    { id: 'spraying', name: 'Spraying', icon: 'opacity' },
  ];

  const ResourceCard = ({ item, type }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitle}>
          <Text style={styles.cardName}>{item.name}</Text>
          <Text style={styles.cardType}>{item.type || item.service}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { backgroundColor: (item.isOpen !== undefined ? item.isOpen : item.isAvailable) ? '#4CAF50' : '#9E9E9E' }
        ]}>
          <Text style={styles.statusText}>
            {item.isOpen !== undefined ? (item.isOpen ? 'Open' : 'Closed') : (item.isAvailable ? 'Available' : 'Busy')}
          </Text>
        </View>
      </View>

      <View style={styles.cardInfo}>
        <View style={styles.infoRow}>
          <MaterialIcons name="location-on" size={16} color="#666" />
          <Text style={styles.infoText}>{item.distance}</Text>
          {type === 'laborer' && (
            <Text style={styles.rateText}>{item.rate}</Text>
          )}
        </View>
        <View style={styles.ratingRow}>
          <MaterialIcons name="star" size={16} color="#FFA000" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const filteredStores = nearbyStores.filter(store =>
    (selectedCategory === 'all' || store.category === selectedCategory) &&
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLaborers = nearbyLaborers.filter(laborer =>
    (selectedCategory === 'all' || laborer.category === selectedCategory) &&
    laborer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {!locationPermission && (
        <View style={styles.permissionBanner}>
          <MaterialIcons name="location-off" size={20} color="white" />
          <Text style={styles.permissionText}>
            Location access needed for accurate distances
          </Text>
          <TouchableOpacity 
            style={styles.enableLocationButton}
            onPress={getLocationAndLoadData}
          >
            <Text style={styles.enableLocationText}>Enable</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search stores, laborers, services..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <MaterialIcons 
              name={category.icon} 
              size={20} 
              color={selectedCategory === category.id ? '#2E7D32' : '#666'} 
            />
            <Text style={[
              styles.categoryText,
              selectedCategory === category.id && styles.categoryTextActive
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Stores ({filteredStores.length})</Text>
          {filteredStores.map(store => (
            <ResourceCard key={store.id} item={store} type="store" />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Laborers ({filteredLaborers.length})</Text>
          {filteredLaborers.map(laborer => (
            <ResourceCard key={laborer.id} item={laborer} type="laborer" />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  permissionBanner: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#ff9800', padding: 12, margin: 12, borderRadius: 8
  },
  permissionText: { flex: 1, color: 'white', marginLeft: 8 },
  enableLocationButton: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 6 },
  enableLocationText: { color: 'white', fontWeight: '600' },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'white',
    margin: 16, paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12,
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 3
  },
  searchInput: { flex: 1, marginLeft: 8 },
  categoriesContainer: { paddingHorizontal: 16, marginBottom: 8 },
  categoryButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 10, marginRight: 8, borderRadius: 20 },
  categoryButtonActive: { backgroundColor: '#E8F5E8', borderWidth: 1, borderColor: '#2E7D32' },
  categoryText: { marginLeft: 4, color: '#666' },
  categoryTextActive: { color: '#2E7D32', fontWeight: '600' },
  content: { flex: 1 },
  section: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#333' },
  card: { backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 12, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  cardTitle: { flex: 1 },
  cardName: { fontSize: 16, fontWeight: 'bold' },
  cardType: { fontSize: 14, color: '#666' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusText: { color: 'white', fontSize: 12 },
  cardInfo: { marginTop: 8 },
  infoRow: { flexDirection: 'row', alignItems: 'center' },
  infoText: { marginLeft: 4, color: '#666' },
  rateText: { marginLeft: 'auto', color: '#2E7D32' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  ratingText: { marginLeft: 4, color: '#666' },
});

