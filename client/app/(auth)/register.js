import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Snackbar } from 'react-native-paper';
import axios from 'axios';
import { useRouter } from 'expo-router';

const Register = () => {
  const router = useRouter();
  const [garageType, setGarageType] = useState('2 Wheeler');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [firmName, setFirmName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const dismissSnackBar = () => {
    setSnackbarVisible(false);
    setSnackbarMessage('');
  }

  const handleSubmit = async () => {
    Keyboard.dismiss();
    if (!firmName.trim() || !contactPerson.trim() || !contactNumber.trim()) {
      showSnackbar('Please Provide the all required fields');
      return;
    }
    if (contactNumber.trim().length !== 10) {
      showSnackbar('Contact Number should contain 10 numbers');
      return;
    }
    let res
    try {
      res = await axios({
        method: 'POST',
        data: {
          firmName: firmName.trim(),
          garageType: garageType === '2 Wheeler' ? 2 : 4,
          contactPerson: contactPerson.trim(),
          contactNumber: contactNumber.trim()
        },
        url: "http://192.168.0.196:3000/api/v1/users/register"
      })
      showSnackbar(res?.data?.message)
      setTimeout(() => {
        router.replace({
          pathname: '/verify',
          params: {
            contactNumber: contactNumber,
            perviousPage: 'register'
          }
        })
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
    setFirmName('')
    setContactPerson('')
    setContactNumber('')
    setGarageType('2 Wheeler')
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.subHeader}>Enter details to get free access</Text>
          <Text style={styles.label}>Firm Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter firm name"
            placeholderTextColor="#A9A9A9"
            value={firmName}
            onChangeText={setFirmName}
          />
          <Text style={styles.label}>Garage Specification for</Text>
          <View style={styles.garageTypeContainer}>
            <TouchableOpacity
              style={[
                styles.garageTypeButton,
                garageType === '2 Wheeler' && styles.garageTypeSelected,
              ]}
              onPress={() => setGarageType('2 Wheeler')}
            >
              {garageType === '2 Wheeler' && (
                <View style={styles.iconWrapper}>
                  <Icon name="check" size={20} color="#64adcc" />
                </View>
              )}
              <Text style={garageType === '2 Wheeler' ? styles.garageTypeTextSelected : styles.garageTypeText}>
                2 Wheeler
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.garageTypeButton,
                garageType === '4 Wheeler' && styles.garageTypeSelected,
              ]}
              onPress={() => setGarageType('4 Wheeler')}
            >
              {garageType === '4 Wheeler' && (
                <View style={styles.iconWrapper}>
                  <Icon name="check" size={20} color="#64adcc" />
                </View>
              )}
              <Text style={garageType === '4 Wheeler' ? styles.garageTypeTextSelected : styles.garageTypeText}>
                4 Wheeler
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>Contact Person</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter person name"
            placeholderTextColor="#A9A9A9"
            value={contactPerson}
            onChangeText={setContactPerson}
          />
          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter contact number"
            keyboardType="numeric"
            placeholderTextColor="#A9A9A9"
            value={contactNumber}
            onChangeText={setContactNumber}
          />
          <View style={styles.infoContainer}>
            <Icon name="info" size={16} color="#777" style={styles.infoIcon} />
            <Text style={styles.infoText}>
              Make sure that entered number is correct because we will be sending an OTP to verification.
            </Text>
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Get a FREE Trial Now</Text>
          </TouchableOpacity>
        </View>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={dismissSnackBar}
          duration={1000}
          style={styles.snackbar}
        >
          {snackbarMessage}
        </Snackbar>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f2f7ff'
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 30
  },
  subHeader: {
    alignSelf: 'flex-start',
    fontSize: 22,
    fontWeight: '600',
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6f706f',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },
  garageTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  garageTypeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    marginHorizontal: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  garageTypeSelected: {
    borderWidth: 0,
    paddingLeft: 20,
    gap: 10,
    backgroundColor: '#64adcc',
    borderColor: '#007AFF',
    justifyContent: 'flex-start'
  },
  garageTypeText: {
    color: '#555',
    fontSize: 16,
  },
  garageTypeTextSelected: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  iconWrapper: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoIcon: {
    marginRight: 5
  },
  infoText: {
    fontSize: 12,
    color: '#777',
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  snackbar: {
    backgroundColor: '#6f706f',
  }
});

export default Register;