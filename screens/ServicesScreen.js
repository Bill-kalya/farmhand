import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const ServicesScreen = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedService, setSelectedService] = useState(null);

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'plowing', name: 'Plowing' },
    { id: 'harvesting', name: 'Harvesting' },
    { id: 'spraying', name: 'Spraying' },
    { id: 'irrigation', name: 'Irrigation' },
    { id: 'pruning', name: 'Pruning' },
  ];

  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [services, searchQuery, selectedCategory]);

  const loadServices = () => {
    // Sample services data - replace with API call
    const sampleServices = [
      {
        id: 1,
        name: 'John Kamau',
        service: 'Plowing',
        category: 'plowing',
        description: 'Expert plowing services using modern equipment for optimal soil preparation',
        rate: 1500,
        unit: 'acre',
        rating: 4.8,
        completedJobs: 47,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3',
        skills: ['Tractor Plowing', 'Soil Leveling', 'Deep Plowing'],
        location: '2.3 km away',
        isAvailable: true,
      },
      {
        id: 2,
        name: 'Mary Wanjiku',
        service: 'Spraying',
        category: 'spraying',
        description: 'Professional crop spraying with eco-friendly pesticides and fertilizers',
        rate: 1200,
        unit: 'acre',
        rating: 4.6,
        completedJobs: 32,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3',
        skills: ['Pesticide Spraying', 'Fertilizer Application', 'Weed Control'],
        location: '1.8 km away',
        isAvailable: true,
      },
      {
        id: 3,
        name: 'David Ochieng',
        service: 'Harvesting',
        category: 'harvesting',
        description: 'Efficient harvesting services for various crops with careful handling',
        rate: 1800,
        unit: 'acre',
        rating: 4.9,
        completedJobs: 63,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3',
        skills: ['Mechanical Harvesting', 'Manual Harvesting', 'Crop Sorting'],
        location: '3.1 km away',
        isAvailable: false,
      },
      {
        id: 4,
        name: 'Grace Muthoni',
        service: 'Irrigation Setup',
        category: 'irrigation',
        description: 'Complete irrigation system installation and maintenance services',
        rate: 5000,
        unit: 'project',
        rating: 4.7,
        completedJobs: 28,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3',
        skills: ['Drip Irrigation', 'Sprinkler Systems', 'Water Management'],
        location: '4.2 km away',
        isAvailable: true,
      },
      {
        id: 5,
        name: 'Paul Ndirangu',
        service: 'Pruning',
        category: 'pruning',
        description: 'Expert tree and crop pruning for better growth and yield',
        rate: 800,
        unit: 'acre',
        rating: 4.5,
        completedJobs: 39,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3',
        skills: ['Tree Pruning', 'Crop Training', 'Disease Control'],
        location: '2.7 km away',
        isAvailable: true,
      },
    ];
    setServices(sampleServices);
  };

  const filterServices = () => {
    let filtered = services;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredServices(filtered);
  };

  const bookService = (service) => {
    Alert.alert(
      'Book Service',
      `Book ${service.service} with ${service.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Book Now', 
          onPress: () => {
            Alert.alert(
              'Service Booked!',
              `${service.name} has been notified. They will contact you shortly.`,
              [{ text: 'OK' }]
            );
          }
        },
      ]
    );
  };

  const ServiceCard = ({ service }) => (
    <TouchableOpacity 
      style={styles.serviceCard}
      onPress={() => setSelectedService(service)}
    >
      <Image source={{ uri: service.image }} style={styles.serviceImage} />
      
      <View style={styles.serviceInfo}>
        <View style={styles.serviceHeader}>
          <View style={styles.serviceTitle}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.serviceType}>{service.service}</Text>
          </View>
          <View style={[
            styles.availabilityBadge,
            { backgroundColor: service.isAvailable ? '#4CAF50' : '#9E9E9E' }
          ]}>
            <Text style={styles.availabilityText}>
              {service.isAvailable ? 'Available' : 'Busy'}
            </Text>
          </View>
        </View>

        <Text style={styles.serviceDescription} numberOfLines={2}>
          {service.description}
        </Text>

        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <MaterialIcons name="location-on" size={14} color="#666" />
            <Text style={styles.detailText}>{service.location}</Text>
          </View>
          <View style={styles.detailItem}>
            <MaterialIcons name="work" size={14} color="#666" />
            <Text style={styles.detailText}>{service.completedJobs} jobs</Text>
          </View>
        </View>

        <View style={styles.ratingRow}>
          <MaterialIcons name="star" size={16} color="#FFA000" />
          <Text style={styles.rating}>{service.rating}</Text>
        </View>

        <View style={styles.skillsContainer}>
          {service.skills.slice(0, 2).map((skill, index) => (
            <View key={index} style={styles.skillTag}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
          {service.skills.length > 2 && (
            <View style={styles.moreSkillsTag}>
              <Text style={styles.moreSkillsText}>+{service.skills.length - 2}</Text>
            </View>
          )}
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>KSh {service.rate}</Text>
          <Text style={styles.unit}>per {service.unit}</Text>
          <TouchableOpacity 
            style={[
              styles.bookButton,
              !service.isAvailable && styles.bookButtonDisabled
            ]}
            onPress={() => bookService(service)}
            disabled={!service.isAvailable}
          >
            <Text style={styles.bookButtonText}>
              {service.isAvailable ? 'Book Now' : 'Unavailable'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Farm Services</Text>
        <Text style={styles.headerSubtitle}>
          Hire skilled laborers for your farming needs
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search services or laborers..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category.id && styles.categoryTextActive
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Services List */}
      <ScrollView style={styles.servicesContainer}>
        {filteredServices.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}

        {filteredServices.length === 0 && (
          <View style={styles.emptyState}>
            <MaterialIcons name="handyman" size={64} color="#ccc" />
            <Text style={styles.emptyStateText}>No services found</Text>
            <Text style={styles.emptyStateSubtext}>
              Try adjusting your search or filter criteria
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#2e7d32',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  categoryButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryButtonActive: {
    backgroundColor: '#E8F5E8',
    borderColor: '#2e7d32',
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#2e7d32',
    fontWeight: '600',
  },
  servicesContainer: {
    flex: 1,
    padding: 16,
  },
  serviceCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  serviceImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  serviceInfo: {
    padding: 16,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  serviceTitle: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  serviceType: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  availabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availabilityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rating: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
    fontWeight: '500',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  skillTag: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 4,
  },
  skillText: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '500',
  },
  moreSkillsTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 4,
  },
  moreSkillsText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  unit: {
    fontSize: 14,
    color: '#666',
    marginRight: 'auto',
    marginLeft: 8,
  },
  bookButton: {
    backgroundColor: '#2e7d32',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bookButtonDisabled: {
    backgroundColor: '#9E9E9E',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default ServicesScreen;