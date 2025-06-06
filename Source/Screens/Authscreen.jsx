import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '561842068248-qfmac2cag82m8ai3jii9m9306lqo9rne.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  
      const userInfo = await GoogleSignin.signIn();
      console.log('Google Sign-In Success:', userInfo);
  
      const { idToken } = userInfo;
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const user = await auth().signInWithCredential(googleCredential);
      console.log('Firebase Auth Success:', user);
  
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };
  

  const handleEmailPassword = async () => {
    if (!email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      if (isSignup) {
        await auth().createUserWithEmailAndPassword(email, password);
        Alert.alert('Success', 'Account created!');
      } else {
        await auth().signInWithEmailAndPassword(email, password);
        Alert.alert('Success', 'Logged in!');
      }
      setEmail('');
      setPassword('');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignup ? 'Sign Up' : 'Login'}</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleEmailPassword}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.buttonText}>{isSignup ? 'Sign Up' : 'Login'}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setIsSignup(!isSignup)}
        disabled={loading}
      >
        <Text style={styles.toggleText}>
          {isSignup
            ? 'Already have an account? Login'
            : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity
        style={styles.googleBtn}
        onPress={handleGoogleSignIn}
        disabled={loading}
      >
        <Text style={styles.btnText}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    marginBottom: 40,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#222',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    marginBottom: 15,
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  toggleText: {
    color: '#aaa',
    marginBottom: 40,
    fontSize: 14,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 25,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#fff',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#fff',
    fontWeight: '600',
  },
  googleBtn: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: '100%',
  },
  btnText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 16,
  },
});
