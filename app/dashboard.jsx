import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import {
    Alert,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

export default function DashboardScreen() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setRefreshing(true);
    
    const mockStats = {
      farmer: {
        orders: 12,
        services: 5,
        spending: 24500,
        savings: 3200,
      },
      vendor: {
        products: 24,
        orders: 47,
        revenue: 187500,
        rating: 4.5,
      },
      laborer: {
        completedJobs: 28,
        pendingJobs: 3,
        earnings: 67500,
        rating: 4.8,
      },
      admin: {
        users: 156,
        vendors: 42,
        laborers: 67,
        revenue: 1250000,
      }
    };

    const mockActivities = {
      farmer: [
        { id: 1, type: 'order', message: 'Maize seeds delivered', time: '2 hours ago', icon: 'local-shipping' },
        { id: 2, type: 'service', message: 'Plowing service completed', time: '1 day ago', icon: 'agriculture' },
        { id: 3, type: 'order', message: 'Fertilizer order placed', time: '2 days ago', icon: 'shopping-cart' },
      ],
      vendor: [
        { id: 1, type: 'sale', message: 'New order: Tomato Seeds', time: '1 hour ago', icon: 'attach-money' },
        { id: 2, type: 'review', message: 'New 5-star rating received', time: '3 hours ago', icon: 'star' },
        { id: 3, type: 'product', message: 'Product stock updated', time: '1 day ago', icon: 'inventory' },
      ],
      laborer: [
        { id: 1, type: 'job', message: 'New plowing job request', time: '30 minutes ago', icon: 'work' },
        { id: 2, type: 'payment', message: 'Payment received for harvesting', time: '2 days ago', icon: 'payments' },
        { id: 3, type: 'review', message: 'Client left a 5-star review', time: '3 days ago', icon: 'rate-review' },
      ],
      admin: [
        { id: 1, type: 'user', message: 'New vendor registration', time: '1 hour ago', icon: 'person-add' },
        { id: 2, type: 'revenue', message: 'Platform revenue updated', time: '4 hours ago', icon: 'trending-up' },
        { id: 3, type: 'system', message: 'System maintenance completed', time: '1 day ago', icon: 'build' },
      ]
    };

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setStats(mockStats[user?.role] || {});
    setRecentActivity(mockActivities[user?.role] || []);
    setRefreshing(false);
  };

  const onRefresh = () => {
    loadDashboardData();
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            logout();
            router.push('/');
          }
        },
      ]
    );
  };

  const getWelcomeMessage = () => {
    const hours = new Date().getHours();
    let greeting = 'Good morning';
    
    if (hours >= 12 && hours < 17) {
      greeting = 'Good afternoon';
    } else if (hours >= 17) {
      greeting = 'Good evening';
    }

    return `${greeting}, ${user?.name || 'User'}!`;
  };

  const getRoleSpecificCards = () => {
    const baseCards = [
      {
        title: 'Browse Products',
        subtitle: 'Find agricultural inputs',
        icon: 'store',
        color: '#4CAF50',
        onPress: () => router.push('/products'),
      },
      {
        title: 'Find Services',
        subtitle: 'Hire skilled laborers',
        icon: 'engineering',
        color: '#FF9800',
        onPress: () => router.push('/services'),
      },
      {
        title: 'Map View',
        subtitle: 'See nearby resources',
        icon: 'map',
        color: '#2196F3',
        onPress: () => router.push('/map'),
      },
    ];

    const roleSpecificCards = {
      farmer: [
        ...baseCards,
        {
          title: 'My Orders',
          subtitle: 'View order history',
          icon: 'shopping-bag',
          color: '#9C27B0',
          onPress: () => Alert.alert('My Orders', 'Order history feature coming soon'),
        },
      ],
      vendor: [
        {
          title: 'Manage Products',
          subtitle: 'Add/edit your products',
          icon: 'inventory',
          color: '#4CAF50',
          onPress: () => Alert.alert('Manage Products', 'Product management coming soon'),
        },
        {
          title: 'Order Requests',
          subtitle: 'View customer orders',
          icon: 'list-alt',
          color: '#FF9800',
          onPress: () => Alert.alert('Orders', 'Order management coming soon'),
        },
        {
          title: 'Store Analytics',
          subtitle: 'View sales performance',
          icon: 'analytics',
          color: '#2196F3',
          onPress: () => Alert.alert('Analytics', 'Analytics dashboard coming soon'),
        },
      ],
      laborer: [
        {
          title: 'Available Jobs',
          subtitle: 'Find new opportunities',
          icon: 'work-outline',
          color: '#4CAF50',
          onPress: () => router.push('/services'),
        },
        {
          title: 'My Bookings',
          subtitle: 'Manage your schedule',
          icon: 'calendar-today',
          color: '#FF9800',
          onPress: () => Alert.alert('My Bookings', 'Booking management coming soon'),
        },
        {
          title: 'Earnings',
          subtitle: 'View your income',
          icon: 'attach-money',
          color: '#2196F3',
          onPress: () => Alert.alert('Earnings', 'Earnings dashboard coming soon'),
        },
      ],
      admin: [
        {
          title: 'User Management',
          subtitle: 'Manage all users',
          icon: 'people',
          color: '#4CAF50',
          onPress: () => Alert.alert('User Management', 'Admin panel coming soon'),
        },
        {
          title: 'Platform Analytics',
          subtitle: 'System overview',
          icon: 'dashboard',
          color: '#FF9800',
          onPress: () => Alert.alert('Analytics', 'Admin analytics coming soon'),
        },
        {
          title: 'Reports',
          subtitle: 'Generate reports',
          icon: 'assessment',
          color: '#2196F3',
          onPress: () => Alert.alert('Reports', 'Reporting system coming soon'),
        },
      ],
    };

    return roleSpecificCards[user?.role] || baseCards;
  };

  const getStatsCards = () => {
    if (!user) return [];

    const statsConfig = {
      farmer: [
        { key: 'orders', label: 'Total Orders', value: stats.orders, icon: 'shopping-cart', color: '#4CAF50' },
        { key: 'services', label: 'Services Booked', value: stats.services, icon: 'construction', color: '#FF9800' },
        { key: 'spending', label: 'Total Spending', value: `KSh ${stats.spending?.toLocaleString()}`, icon: 'payments', color: '#F44336' },
        { key: 'savings', label: 'Estimated Savings', value: `KSh ${stats.savings?.toLocaleString()}`, icon: 'savings', color: '#2196F3' },
      ],
      vendor: [
        { key: 'products', label: 'Products Listed', value: stats.products, icon: 'inventory', color: '#4CAF50' },
        { key: 'orders', label: 'Total Orders', value: stats.orders, icon: 'receipt', color: '#FF9800' },
        { key: 'revenue', label: 'Total Revenue', value: `KSh ${stats.revenue?.toLocaleString()}`, icon: 'attach-money', color: '#2196F3' },
        { key: 'rating', label: 'Store Rating', value: `${stats.rating}/5.0`, icon: 'star', color: '#FFD600' },
      ],
      laborer: [
        { key: 'completedJobs', label: 'Completed Jobs', value: stats.completedJobs, icon: 'check-circle', color: '#4CAF50' },
        { key: 'pendingJobs', label: 'Pending Jobs', value: stats.pendingJobs, icon: 'schedule', color: '#FF9800' },
        { key: 'earnings', label: 'Total Earnings', value: `KSh ${stats.earnings?.toLocaleString()}`, icon: 'payments', color: '#2196F3' },
        { key: 'rating', label: 'Service Rating', value: `${stats.rating}/5.0`, icon: 'star', color: '#FFD600' },
      ],
      admin: [
        { key: 'users', label: 'Total Users', value: stats.users, icon: 'people', color: '#4CAF50' },
        { key: 'vendors', label: 'Vendors', value: stats.vendors, icon: 'store', color: '#FF9800' },
        { key: 'laborers', label: 'Laborers', value: stats.laborers, icon: 'engineering', color: '#2196F3' },
        { key: 'revenue', label: 'Platform Revenue', value: `KSh ${stats.revenue?.toLocaleString()}`, icon: 'trending-up', color: '#9C27B0' },
      ],
    };

    return statsConfig[user.role] || [];
  };

  const QuickActionCard = ({ title, subtitle, icon, color, onPress }) => (
    <TouchableOpacity style={styles.quickActionCard} onPress={onPress}>
      <View style={[styles.quickActionIcon, { backgroundColor: color }]}>
        <MaterialIcons name={icon} size={24} color="white" />
      </View>
      <Text style={styles.quickActionTitle}>{title}</Text>
      <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );

  const StatCard = ({ label, value, icon, color }) => (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <MaterialIcons name={icon} size={20} color={color} />
        <Text style={styles.statLabel}>{label}</Text>
      </View>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );

  const ActivityItem = ({ activity }) => (
    <View style={styles.activityItem}>
      <View style={styles.activityIcon}>
        <MaterialIcons name={activity.icon} size={20} color="#666" />
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityMessage}>{activity.message}</Text>
        <Text style={styles.activityTime}>{activity.time}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.welcomeText}>{getWelcomeMessage()}</Text>
            <Text style={styles.roleText}>
              {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)} Account
            </Text>
          </View>
          <TouchableOpacity style={styles.profileButton} onPress={handleLogout}>
            <MaterialIcons name="logout" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.statsGrid}>
          {getStatsCards().map((stat, index) => (
            <StatCard
              key={stat.key}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.quickActionsContainer}
        >
          {getRoleSpecificCards().map((card, index) => (
            <QuickActionCard
              key={index}
              title={card.title}
              subtitle={card.subtitle}
              icon={card.icon}
              color={card.color}
              onPress={card.onPress}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.activityList}>
          {recentActivity.map(activity => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
          {recentActivity.length === 0 && (
            <View style={styles.emptyActivity}>
              <MaterialIcons name="notifications-none" size={48} color="#ccc" />
              <Text style={styles.emptyActivityText}>No recent activity</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.supportSection}>
        <Text style={styles.supportTitle}>Need Help?</Text>
        <Text style={styles.supportText}>
          Our support team is here to help you with any questions
        </Text>
        <TouchableOpacity style={styles.supportButton}>
          <MaterialIcons name="help-outline" size={20} color="#2e7d32" />
          <Text style={styles.supportButtonText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2e7d32',
    padding: 20,
    paddingTop: 40,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  roleText: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  profileButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    color: '#2e7d32',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'white',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quickActionsContainer: {
    marginHorizontal: -5,
  },
  quickActionCard: {
    backgroundColor: 'white',
    width: 140,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  activityList: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityMessage: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
  },
  emptyActivity: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyActivityText: {
    fontSize: 16,
    color: '#999',
    marginTop: 12,
  },
  supportSection: {
    backgroundColor: '#E8F5E8',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 8,
  },
  supportText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  supportButtonText: {
    color: '#2e7d32',
    fontWeight: '600',
    marginLeft: 6,
  },
});

