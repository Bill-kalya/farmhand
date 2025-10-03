import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import {
    Dimensions,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const features = [
    {
      icon: 'location-on',
      name: 'Real-Time Geolocation',
      description: 'Find nearby agricultural stores and skilled laborers',
      color: '#2e7d32',
    },
    {
      icon: 'flash-on',
      name: 'Instant Matching',
      description: 'Uber-like matching with nearest available resources',
      color: '#ff9800',
    },
    {
      icon: 'security',
      name: 'Secure Payments',
      description: 'Integrated M-Pesa and secure payment systems',
      color: '#2196f3',
    },
  ];

  const userTypes = [
    {
      icon: 'agriculture',
      name: 'Farmers',
      description: 'Find products and services quickly',
      color: '#2e7d32',
    },
    {
      icon: 'store',
      name: 'Vendors',
      description: 'Reach more customers and grow your business',
      color: '#ff9800',
    },
    {
      icon: 'engineering',
      name: 'Laborers',
      description: 'Find work opportunities and build reputation',
      color: '#2196f3',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3' }}
        style={styles.heroSection}
      >
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>FarmHand</Text>
          <Text style={styles.heroSubtitle}>
            Smart Agricultural Marketplace
          </Text>
          <Text style={styles.heroDescription}>
            Connecting Farmers, Stores & Laborers in Real-Time
          </Text>
          
          <View style={styles.heroButtons}>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('Map')}
            >
              <Text style={styles.secondaryButtonText}>Explore Map</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {/* Features Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How FarmHand Works</Text>
        <Text style={styles.sectionSubtitle}>
          Revolutionizing agricultural access with real-time connectivity
        </Text>

        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: `${feature.color}20` }]}>
                <MaterialIcons name={feature.icon} size={32} color={feature.color} />
              </View>
              <Text style={styles.featureName}>{feature.name}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* User Types Section */}
      <View style={[styles.section, styles.userTypesSection]}>
        <Text style={styles.sectionTitle}>For Everyone in Agriculture</Text>

        <View style={styles.userTypesGrid}>
          {userTypes.map((userType, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.userTypeCard}
              onPress={() => navigation.navigate('Register')}
            >
              <MaterialCommunityIcons 
                name={userType.icon} 
                size={48} 
                color={userType.color} 
              />
              <Text style={styles.userTypeName}>{userType.name}</Text>
              <Text style={styles.userTypeDescription}>
                {userType.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* CTA Section */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Ready to Transform Your Farming Experience?</Text>
        <Text style={styles.ctaDescription}>
          Join thousands of farmers, vendors, and laborers already using FarmHand
        </Text>
        <TouchableOpacity 
          style={styles.ctaButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.ctaButtonText}>Join FarmHand Today</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  heroSection: {
    height: 500,
    width: '100%',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(46, 125, 50, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '600',
  },
  heroDescription: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
    opacity: 0.9,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  primaryButton: {
    backgroundColor: '#ff9800',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'white',
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    padding: 30,
  },
  userTypesSection: {
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  featuresGrid: {
    gap: 20,
  },
  featureCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  featureDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    lineHeight: 20,
  },
  userTypesGrid: {
    gap: 20,
    marginTop: 20,
  },
  userTypeCard: {
    backgroundColor: '#f9f9f9',
    padding: 25,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userTypeName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
    color: '#333',
  },
  userTypeDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    lineHeight: 20,
  },
  ctaSection: {
    backgroundColor: '#2e7d32',
    padding: 40,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  ctaDescription: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 25,
    opacity: 0.9,
  },
  ctaButton: {
    backgroundColor: '#ff9800',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;