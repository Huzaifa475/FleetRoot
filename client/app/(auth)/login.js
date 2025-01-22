import { View, Text, SafeAreaView, StyleSheet, Image, TextInput, Pressable, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, ScrollView, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Font from 'expo-font'
import { router } from 'expo-router'
import { Snackbar } from 'react-native-paper'
import axios from 'axios'

const Login = () => {
  const [isLoginPressed, setIsLoginPressed] = useState(false)
  const [isTrialPressed, setIsTrialPressed] = useState(false)
  const [snackbarVisible, setSnackbarVisible] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    Font.loadAsync({
      'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
      'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    }).then(() => setFontsLoaded(true))
  }, []);

  if (!fontsLoaded) {
    return null
  }

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const dismissSnackBar = () => {
    setSnackbarVisible(false);
    setSnackbarMessage('');
  }

  const handleLogin = async () => {
    Keyboard.dismiss()
    if (contactNumber.trim().length !== 10) {
      setContactNumber('')
      showSnackbar('Contact Number should contain 10 numbers')
      return;
    }
    let res;
    try {
      res = await axios({
        method: 'POST',
        data: {
          contactNumber: contactNumber.trim()
        },
        url: "http://192.168.0.196:3000/api/v1/users/login"
      })
      showSnackbar(res?.data?.message)
      setTimeout(() => {
        router.push(`/verify?contactNumber=${contactNumber}&perviousPage=login`)
      }, 1000)
    } catch (error) {
      if (error.response) {
        if (error.response?.data?.message)
          showSnackbar(error.response?.data?.message);
        else
          showSnackbar(error.request?.statusText);
      }
      else if (error.request) {
        showSnackbar(error.request?.statusText);
      }
    }
    setContactNumber('')
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.loginContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <View contentContainerStyle={styles.loginContainer}>
          <View style={styles.loginImageContainer}>
            <Image
              source={require('../../assets/images/splash.png')}
              style={styles.loginImage}
            />
          </View>
          <View style={styles.loginContent}>
            <View style={styles.loginHeader}>
              <Text style={styles.welcomeText}>Welcome!</Text>
              <Text style={styles.titleText}>Login to your account below</Text>
            </View>
            <View style={styles.loginInput}>
              <View style={styles.inputFieldContainer}>
                <Text style={styles.inputText}>Contact Number</Text>
                <TextInput
                  placeholder="Enter your contact number"
                  style={styles.input}
                  keyboardType="phone-pad"
                  autoCorrect={false}
                  autoComplete="off"
                  textContentType="none"
                  value={contactNumber}
                  onChangeText={setContactNumber}
                />
              </View>
              <TouchableOpacity
                onPress={handleLogin}
                style={[styles.loginButton, isLoginPressed && styles.loginButtonPressed]}
                onPressIn={() => setIsLoginPressed(true)}
                onPressOut={() => setIsLoginPressed(false)}
              >
                <Text style={styles.titleText}>Login Now</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.freeTrialContainer}>
            <Text style={styles.freeTrialText}>A chance to explore new experience</Text>
            <TouchableOpacity
              onPress={() => router.push('/register')}
              style={[styles.freeTrialButton, isTrialPressed && styles.trialButtonPressed]}
              onPressIn={() => setIsTrialPressed(true)}
              onPressOut={() => setIsTrialPressed(false)}
            >
              <Text style={styles.freeTrialButtonText}>Start a Free Trial</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={dismissSnackBar}
          duration={1000}
          style={styles.snackbar}
        >
          {snackbarMessage}
        </Snackbar>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: "#f3f3f3"
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginImageContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center"
  },
  loginImage: {
    width: "50%",
    height: 100,
    objectFit: "contain"
  },
  loginContent: {
    width: "100%",
    height: "60%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center"
  },
  loginHeader: {
    padding: 0,
    margin: 0,
    width: "100%",
    height: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "900",
    lineHeight: 35,
    textAlignVertical: "center"
  },
  titleText: {
    fontSize: 20,
    color: '#6f706f'
  },
  inputField: {
    width: "100%",
  },
  loginInput: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    gap: 1
  },
  inputFieldContainer: {
    width: "90%",
    alignSelf: "center",
    position: 'relative',
    gap: 2
  },
  input: {
    paddingLeft: 10,
    height: 50,
    borderColor: "#6f706f",
    borderWidth: 1,
    borderRadius: 10,
  },
  inputText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6f706f"
  },
  loginButton: {
    marginTop: 10,
    width: "90%",
    height: "30%",
    backgroundColor: "#000000",
    alignSelf: "center",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  loginButtonPressed: {
    backgroundColor: '#d2d2d2'
  },
  freeTrialContainer: {
    width: "100%",
    height: 120,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    gap: 5
  },
  freeTrialButton: {
    color: "#000000",
    width: "50%",
    height: 50,
    borderRadius: 30,
    borderColor: "#000000",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  freeTrialButtonText: {
    fontSize: 15,
    color: "#000000"
  },
  freeTrialText: {
    fontSize: 15,
    color: "#6f706f"
  },
  trialButtonPressed: {
    color: "#ffffff",
    backgroundColor: "#d2d2d2"
  },
  snackbar: {
    backgroundColor: '#6f706f',
  }
})

export default Login