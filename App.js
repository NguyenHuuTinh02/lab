import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import LoginScreen from "./Lab3/LoginScreen";
import RegisterScreen from "./Lab3/RegisterScreen";
import HomeLab3 from "./Lab3/HomeLab3";
import AddService from "./Lab3/AddService";
import ServiceDetail from "./Lab3/ServiceDetail";
import EditService from "./Lab3/EditService";
import ProfileScreen from "./Lab3/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Kiểm tra role của user
        const userRef = ref(db, `users/${currentUser.uid}`);
        const unsubscribeRole = onValue(userRef, (snapshot) => {
          const userData = snapshot.val();
          if (userData) {
            setUserRole(userData.role);
          } else {
            setUserRole(null);
          }
          setLoading(false);
        });
        return () => unsubscribeRole();
      } else {
        setUser(null);
        setUserRole(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerTitleAlign: 'center' }}>
        {!user ? (
          // Auth Stack
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          </>
        ) : userRole === 'admin' ? (
          // Admin Stack
          <>
            <Stack.Screen name="HomeLab3" component={HomeLab3} options={{ headerShown: false }} />
            <Stack.Screen name="AddService" component={AddService} options={{ title: "Service" }} />
            <Stack.Screen name="ServiceDetail" component={ServiceDetail} options={{ title: "Service detail" }} />
            <Stack.Screen name="EditService" component={EditService} options={{ title: "Service", headerShown: false }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
          </>
        ) : (
          // Customer Stack
          <>
            <Stack.Screen name="HomeLab3" component={HomeLab3} options={{ headerShown: false }} />
            <Stack.Screen name="ServiceDetail" component={ServiceDetail} options={{ title: "Service detail" }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  }
});
