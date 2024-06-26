import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect,useState } from 'react';
import 'react-native-reanimated';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen
          name="screens/login"
          options={{
            title: 'Login',
            headerTitleStyle: {
              fontWeight: '500',
              fontSize:30
            },
          }}
        />
        <Stack.Screen 
        name='screens/register'
        options={{
          title:'Register',
          headerTitleStyle:{
            fontWeight:"500",
            fontSize:30
          }
        }}
        />
        <Stack.Screen 
        name='screens/forgot-password'
        options={{
          title:'Forgot Password',
          headerTitleStyle:{
            fontWeight:"500",
            fontSize:30
          }
        }}
        />
         <Stack.Screen 
        name='screens/otp-verification'
        options={{
          title:'OTP Verification',
          headerTitleStyle:{
            fontWeight:"500",
            fontSize:30
          }
        }}
        />
         <Stack.Screen 
        name='screens/reset-password'
        options={{
          title:'Reset Password',
          headerTitleStyle:{
            fontWeight:"500",
            fontSize:30
          }
        }}
        />

{isAuthenticated ? (
          <Stack.Screen name="screens/main"  options={{
            title:'Main Screen',
            headerTitleStyle:{
              fontWeight:"500",
              fontSize:30
            }
          }} />
        ) : (
          <Stack.Screen name="screen/login" options={{
            title: 'Login',
            headerTitleStyle: {
              fontWeight: '500',
              fontSize:30
            },
          }} />
        )}

         {/* <Stack.Screen 
        name='screens/main'
        options={{
          title:'Main Screen',
          headerTitleStyle:{
            fontWeight:"500",
            fontSize:30
          }
        }}
        /> */}
      </Stack>
    </ThemeProvider>
  );
}
