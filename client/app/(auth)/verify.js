import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const Verify = () => {
  const [isPressed, setIsPressed] = useState(false)
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputs = useRef([]);

  useEffect(() => {
    const showKeyboard = async () => {
      setTimeout(() => {
        inputs.current[0].focus();
      }, 100);
    };
    showKeyboard();
  }, []);

  const handleChangeText = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
        <ScrollView contentContainerStyle={styles.container}>

          <View style={styles.verificationContent}>
            <Text style={styles.verificationText}>Enter the 6-digit code sent to</Text>
            <Text style={styles.verificationText}>+91 123 456 7890</Text>

            <View style={styles.verificationInput}>
              <Text style={styles.verificationLabel}>Enter Code</Text>
              <View style={styles.inputContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={otp[index]}
                    onChangeText={(value) => handleChangeText(value, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    ref={(ref) => (inputs.current[index] = ref)}
                    style={styles.input}
                  />
                ))}
              </View>
            </View>

            <View style={styles.verificationResend}>
              <Text style={styles.verificationResendText}>Didn't get a Code?</Text>
              <TouchableOpacity>
                <Text style={styles.verificationResendButtonText}>Re-Send Now</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.verificationButtonContainer}>
              <TouchableOpacity 
                style={[styles.verificationButton]}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
              >
                <Text style={[styles.verificationButtonText, isPressed && styles.verificationButtonPressed]}>Get a FREE Trial Now</Text>
              </TouchableOpacity>
            </View>

          </View>

        </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f7ff',
  },
  verificationContent: {
    width: "100%",
    height: 735,
    padding: 10,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20
  },
  verificationText: {
    fontSize: 25,
    fontWeight: "500"
  },
  verificationInput: {
    marginTop: 30,
    height: 120,
    gap: 4
  },
  verificationLabel: {
    paddingLeft: 6,
    fontWeight: "600",
    color: "#727273"
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    width: 52,
    height: 50,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#fff',
  },
  verificationResend: {
    flexDirection: 'row',
    gap: 5
  },
  verificationResendText: {
    fontSize: 20,
    color: "#727273"
  },
  verificationResendButtonText: {
    fontSize: 20,
    fontWeight: "600"
  },
  verificationButtonContainer: {
    width: "100%",
    height: 350,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  verificationButton: {
    width: "90%",
    height: 60,
    borderRadius: 10,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center"
  },
  verificationButtonPressed: {
    color: "#000000"
  },
  verificationButtonText: {
    color: "#ffffff",
    fontSize: 20,
  }
});

export default Verify;