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

const ProductsScreen = ({ navigation, route }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'seeds', name: 'Seeds' },
    { id: 'fertilizers', name: 'Fertilizers' },
    { id: 'equipment', name: 'Equipment' },
    { id: 'pesticides', name: 'Pesticides' },
    { id: 'tools', name: 'Tools' },
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, selectedCategory]);

  const loadProducts = () => {
    // Sample product data - replace with API call
    const sampleProducts = [
      {
        id: 1,
        name: 'Maize Seeds - Hybrid',
        description: 'High-yield hybrid maize seeds suitable for various soil types',
        price: 1200,
        originalPrice: 1500,
        category: 'seeds',
        image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3',
        vendor: 'Green Thumb Agri Store',
        rating: 4.5,
        stock: 50,
        unit: 'kg',
      },
      {
        id: 2,
        name: 'Organic Fertilizer',
        description: '100% organic fertilizer for healthy plant growth',
        price: 800,
        originalPrice: 1000,
        category: 'fertilizers',
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3',
        vendor: 'Organic Farms Ltd',
        rating: 4.7,
        stock: 25,
        unit: 'bag',
      },
      {
        id: 3,
        name: 'Spraying Machine',
        description: 'Manual spraying machine for pesticides and fertilizers',
        price: 4500,
        originalPrice: 5000,
        category: 'equipment',
        image: 'https://images.unsplash.com/photo-1577896851231-70ef18861754?ixlib=rb-4.0.3',
        vendor: 'Farm Equipment Hub',
        rating: 4.3,
        stock: 10,
        unit: 'piece',
      },
      {
        id: 4,
        name: 'Tomato Seeds',
        description: 'High-quality tomato seeds with disease resistance',
        price: 600,
        originalPrice: 750,
        category: 'seeds',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3',
        vendor: 'Seed Masters',
        rating: 4.8,
        stock: 100,
        unit: 'pack',
      },
      {
        id: 5,
        name: 'Garden Tools Set',
        description: 'Complete set of gardening tools for small farms',
        price: 2500,
        originalPrice: 3000,
        category: 'tools',
        image: 'https://images.unsplash.com/photo-1577451550519-58177dd015a8?ixlib=rb-4.0.3',
        vendor: 'Tool Masters',
        rating: 4.6,
        stock: 15,
        unit: 'set',
      },
    ];
    setProducts(sampleProducts);
  };

  const filterProducts = () => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.vendor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    Alert.alert('Success', `${product.name} added to cart`);
  };

  const ProductCard = ({ product }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productDescription} numberOfLines={2}>
          {product.description}
        </Text>
        
        <View style={styles.vendorRow}>
          <MaterialIcons name="store" size={14} color="#666" />
          <Text style={styles.vendorName}>{product.vendor}</Text>
        </View>

        <View style={styles.ratingRow}>
          <MaterialIcons name="star" size={14} color="#FFA000" />
          <Text style={styles.rating}>{product.rating}</Text>
          <Text style={styles.stock}>{product.stock} in stock</Text>
        </View>

        <View style={styles.priceRow}>
          <View>
            <Text style={styles.currentPrice}>KSh {product.price}</Text>
            {product.originalPrice > product.price && (
              <Text style={styles.originalPrice}>KSh {product.originalPrice}</Text>
            )}
          </View>
          <Text style={styles.unit}>per {product.unit}</Text>
        </View>

        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={() => addToCart(product)}
        >
          <MaterialIcons name="add-shopping-cart" size={16} color="white" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Agricultural Products</Text>
        <Text style={styles.headerSubtitle}>
          Find quality farming inputs from trusted vendors
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
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

      {/* Products Grid */}
      <ScrollView style={styles.productsContainer}>
        <View style={styles.productsGrid}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>

        {filteredProducts.length === 0 && (
          <View style={styles.emptyState}>
            <MaterialIcons name="search-off" size={64} color="#ccc" />
            <Text style={styles.emptyStateText}>No products found</Text>
            <Text style={styles.emptyStateSubtext}>
              Try adjusting your search or filter criteria
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Cart FAB */}
      {cart.length > 0 && (
        <TouchableOpacity style={styles.cartFab}>
          <MaterialIcons name="shopping-cart" size={24} color="white" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: scale(20),
    backgroundColor: '#2e7d32',
  },
  headerTitle: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: scale(4),
  },
  headerSubtitle: {
    fontSize: scale(14),
    color: 'white',
    opacity: 0.9,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: scale(16),
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    borderRadius: scale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: scale(8),
    fontSize: scale(16),
  },
  categoriesContainer: {
    paddingHorizontal: scale(16),
    marginBottom: scale(8),
  },
  categoryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    borderRadius: scale(20),
    marginRight: scale(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    minHeight: scale(40),
  },
  categoryButtonActive: {
    backgroundColor: '#E8F5E8',
    borderColor: '#2e7d32',
    borderWidth: 1,
  },
  categoryText: {
    fontSize: scale(14),
    color: '#666',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#2e7d32',
    fontWeight: '600',
  },
  productsContainer: {
    flex: 1,
    padding: scale(16),
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: scale(12),
    width: '48%',
    marginBottom: scale(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: scale(120),
    resizeMode: 'cover',
  },
  productInfo: {
    padding: scale(12),
  },
  productName: {
    fontSize: scale(14),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: scale(4),
  },
  productDescription: {
    fontSize: scale(12),
    color: '#666',
    marginBottom: scale(8),
    lineHeight: scale(16),
  },
  vendorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(4),
  },
  vendorName: {
    fontSize: scale(11),
    color: '#666',
    marginLeft: scale(4),
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(8),
  },
  rating: {
    fontSize: scale(12),
    color: '#666',
    marginLeft: scale(4),
    marginRight: 'auto',
  },
  stock: {
    fontSize: scale(11),
    color: '#4CAF50',
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: scale(8),
  },
  currentPrice: {
    fontSize: scale(16),
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  originalPrice: {
    fontSize: scale(12),
    color: '#999',
    textDecorationLine: 'line-through',
  },
  unit: {
    fontSize: scale(11),
    color: '#666',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2e7d32',
    paddingVertical: scale(8),
    borderRadius: scale(6),
    gap: scale(4),
  },
  addToCartText: {
    color: 'white',
    fontSize: scale(12),
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(40),
  },
  emptyStateText: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: '#666',
    marginTop: scale(16),
    marginBottom: scale(8),
  },
  emptyStateSubtext: {
    fontSize: scale(14),
    color: '#999',
    textAlign: 'center',
  },
  cartFab: {
    position: 'absolute',
    bottom: scale(20),
    right: scale(20),
    backgroundColor: '#2e7d32',
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cartBadge: {
    position: 'absolute',
    top: scale(-5),
    right: scale(-5),
    backgroundColor: '#ff9800',
    width: scale(20),
    height: scale(20),
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: scale(12),
    fontWeight: 'bold',
  },
});

export default ProductsScreen;