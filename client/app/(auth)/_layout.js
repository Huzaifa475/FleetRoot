import { router, Stack } from "expo-router";
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AuthLayout = () => {
  const navigation = useNavigation();
  return (
    <Stack>
        <Stack.Screen name="login" options={{title: 'Login', headerShown: false}}/>
        <Stack.Screen name="register"/>
        <Stack.Screen 
          name="verify"
          options={{
            headerShown: true,
            title: "Verification",
            headerStyle: {
              backgroundColor: '#f2f7ff',
            },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Ionicons name="chevron-back" size={24} color="black" onPress={() => router.back()} /> // Change the icon
            ),
          }}  
        />
    </Stack>
  )
}

export default AuthLayout