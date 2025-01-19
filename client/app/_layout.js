import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";

const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false}}/>     
            <Stack.Screen name="(auth)" options={{headerShown: false}}/>     
            <Stack.Screen name="(root)" options={{headerShown: false}}/>
        </Stack>
    );
};

export default RootLayout;
