import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'farmer',
    storeName: '',
    services: [],
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useContext(AuthContext);
  const router = useRouter();

  const roles = [
    { label: 'Farmer', value: 'farmer', description: 'Buy products and hire services' },
    { label: 'Vendor (Store Owner)', value: 'vendor', description: 'Sell agricultural products' },
    { label: 'Laborer', value: 'laborer', description: 'Provide farming services' },
  ];

  const laborServices = [
    'Plowing',
    'Harvesting',
    'Spraying',
    'Irrigation Setup',
    'Pruning',
    'Weeding',
    'Planting',
    'Fertilizer Application',
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleService = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleRegister = async () => {
    const { name, email, password, confirmPassword, phone, role, storeName } = formData;

    if (!name || !email || !password || !confirmPassword || !phone) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    if (role === 'vendor' && !storeName) {
      Alert.alert('Error', 'Store name is required for vendors');
      return;
    }

    if (role === 'laborer' && formData.services.length === 0) {
      Alert.alert('Error', 'Please select at least one service');
      return;
    }

    try {
      await register(formData);
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => router.push('/dashboard') }
      ]);
    } catch (error) {
      Alert.alert('Registration Failed', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Join FarmHand</Text>
        <Text style={styles.subtitle}>Create your agricultural marketplace account</Text>
      </View>

      <View style={styles.form}>
        {/* Basic Information */}
        <Text style={styles.sectionTitle}>Basic Information</Text>
        
        <View style={styles.inputContainer}>
          <MaterialIcons name="person" size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Full Name *"
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Email Address *"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="phone" size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Phone Number *"
            value={formData.phone}
            onChangeText={(value) => handleInputChange('phone', value)}
            keyboardType="phone-pad"
          />
        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Password *"
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialIcons 
              name={showPassword ? "visibility" : "visibility-off"} 
              size={20} 
              color="#666" 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="lock-outline" size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password *"
            value={formData.confirmPassword}
            onChangeText={(value) => handleInputChange('confirmPassword', value)}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <MaterialIcons 
              name={showConfirmPassword ? "visibility" : "visibility-off"} 
              size={20} 
              color="#666" 
            />
          </TouchableOpacity>
        </View>

        {/* Role Selection */}
        <Text style={styles.sectionTitle}>Account Type</Text>
        <View style={styles.radioContainer}>
          <RadioButton.Group
            onValueChange={(value) => handleInputChange('role', value)}
            value={formData.role}
          >
            {roles.map((roleItem) => (
              <TouchableOpacity
                key={roleItem.value}
                style={[
                  styles.radioOption,
                  formData.role === roleItem.value && styles.radioOptionSelected
                ]}
                onPress={() => handleInputChange('role', roleItem.value)}
              >
                <View style={styles.radioContent}>
                  <RadioButton value={roleItem.value} color="#2e7d32" />
                  <View style={styles.radioTextContainer}>
                    <Text style={styles.radioLabel}>{roleItem.label}</Text>
                    <Text style={styles.radioDescription}>{roleItem.description}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </RadioButton.Group>
        </View>

        {/* Vendor-specific Fields */}
        {formData.role === 'vendor' && (
          <>
            <Text style={styles.sectionTitle}>Store Information</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="store" size={20} color="#666" />
              <TextInput
                style={styles.input}
                placeholder="Store Name *"
                value={formData.storeName}
                onChangeText={(value) => handleInputChange('storeName', value)}
              />
            </View>
          </>
        )}

        {/* Laborer-specific Fields */}
        {formData.role === 'laborer' && (
          <>
            <Text style={styles.sectionTitle}>Services Offered</Text>
            <Text style={styles.servicesSubtitle}>Select the services you provide</Text>
            <View style={styles.servicesContainer}>
              {laborServices.map(service => (
                <TouchableOpacity
                  key={service}
                  style={[
                    styles.serviceChip,
                    formData.services.includes(service) && styles.serviceChipSelected
                  ]}
                  onPress={() => toggleService(service)}
                >
                  <Text style={[
                    styles.serviceChipText,
                    formData.services.includes(service) && styles.serviceChipTextSelected
                  ]}>
                    {service}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* Register Button */}
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Create Account</Text>
        </TouchableOpacity>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By creating an account, you agree to our{' '}
          <Text style={styles.link}>Terms of Service</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
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
    padding: 30,
    alignItems: 'center',
    backgroundColor: '#2e7d32',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
  },
  form: {
    padding: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 16,
  },
  radioContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  radioOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  radioOptionSelected: {
    backgroundColor: '#E8F5E8',
  },
  radioContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  radioTextContainer: {
    flex: 1,
    marginLeft: 8,
  },
  radioLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  radioDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  servicesSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  serviceChip: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  serviceChipSelected: {
    backgroundColor: '#E8F5E8',
    borderColor: '#2e7d32',
  },
  serviceChipText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  serviceChipTextSelected: {
    color: '#2e7d32',
    fontWeight: '600',
  },
  registerButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#2e7d32',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    lineHeight: 16,
  },
  link: {
    color: '#2e7d32',
    fontWeight: '500',
  },
});

