import { Stack } from "expo-router";
import React from 'react'

const AuthLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="login" options={{title: 'Login', headerShown: false}}/>
        <Stack.Screen name="register"/>
        <Stack.Screen name="verify"/>
    </Stack>
  )
}

export default AuthLayout