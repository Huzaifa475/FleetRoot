import { router, Stack } from "expo-router";
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const AuthLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="login" options={{title: 'Login', headerShown: false}}/>
        <Stack.Screen 
          name="register"
          options={{
            title: "Get A Free Trial",
            headerStyle: {
              backgroundColor: '#f2f7ff'
            },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Ionicons name="chevron-back" size={24} color="black" onPress={() => router.back()} />
            ),
          }}
        />
        <Stack.Screen name="welcome" options={{headerShown: false}}/>
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
              <Ionicons name="chevron-back" size={24} color="black" onPress={() => router.back()} />
            ),
          }}  
        />
    </Stack>
  )
}

export default AuthLayout