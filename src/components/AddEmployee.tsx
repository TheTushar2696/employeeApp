import React, {useReducer, useState} from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import FormField from './FormField';
import {fontType} from '../assets/fonts';
import LinearGradient from 'react-native-linear-gradient';

interface FieldState {
  value: string;
  isTouched: boolean;
  error: string;
}

interface FormState {
  firstName: FieldState;
  lastName: FieldState;
  addressLine1: FieldState;
  country: FieldState;
  city: FieldState;
  email: FieldState;
  phoneNumber: FieldState;
}

type FormAction =
  | {type: 'UPDATE_FIELD'; field: keyof FormState; value: string}
  | {type: 'SET_ERROR'; field: keyof FormState; value: string};

const initialState: FormState = {
  firstName: {value: '', isTouched: false, error: ''},
  lastName: {value: '', isTouched: false, error: ''},
  addressLine1: {value: '', isTouched: false, error: ''},
  country: {value: '', isTouched: false, error: ''},
  city: {value: '', isTouched: false, error: ''},
  email: {value: '', isTouched: false, error: ''},
  phoneNumber: {value: '', isTouched: false, error: ''},
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'UPDATE_FIELD': {
      const {field, value} = action;
      return {
        ...state,
        [field]: {
          ...state[field],
          value,
          isTouched: true,
        },
      };
    }
    case 'SET_ERROR': {
      const {field, value} = action;
      return {
        ...state,
        [field]: {
          ...state[field],
          error: value,
          isTouched: true,
        },
      };
    }
    default:
      return state;
  }
};

const validateField = (fieldName: keyof FormState, value: string): string => {
  switch (fieldName) {
    case 'firstName':
      return value.trim() ? '' : 'First Name is required';
    case 'lastName':
      return value.trim() ? '' : 'Last Name is required';
    case 'addressLine1':
      return value.trim() ? '' : 'Address Line 1 is required';
    case 'country':
      return value.trim() ? '' : 'Country is required';
    case 'city':
      return value.trim() ? '' : 'City is required';
    case 'email':
      return /^\S+@\S+\.\S+$/.test(value) ? '' : 'Invalid Email Format';
    case 'phoneNumber':
      return /^\d+$/.test(value) ? '' : 'Invalid Phone Number';

    default:
      return '';
  }
};

const AddEmployee: React.FC = ({isModalVisible, setModalVisibility}: any) => {
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = (name: any, value: any) => {
    dispatch({type: 'UPDATE_FIELD', field: name, value});
    const error = validateField(name, value);
    dispatch({type: 'SET_ERROR', field: name, value: error});
  };

  const handleValidation = (): boolean => {
    let isValid = true;
    (Object.keys(formState) as (keyof FormState)[]).forEach(field => {
      const error = validateField(field, formState[field].value);
      if (error) {
        isValid = false;
        dispatch({type: 'SET_ERROR', field, value: error});
      }
    });
    return isValid;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      const employeeData = {
        firstName: formState.firstName.value,
        lastName: formState.lastName.value,
        department: 'Test Department', // Assuming department field exists in formState
        dateOfJoining: '29-10-2024', // Assuming dateOfJoining field exists in formState
        address: {
          line1: formState.addressLine1.value,
          city: formState.city.value,
          state: 'NA', // Assuming state field exists in formState
        },
        contactMethods: {
          email: formState.email.value,
          phone: formState.phoneNumber.value,
        },
      };
      fetch(
        'https://free-ap-south-1.cosmocloud.io/development/api/employee_dir',
        {
          method: 'POST',
          headers: {
            projectId: '66aa21c7440310e3620e0a31',
            environmentId: '66aa21c7440310e3620e0a32',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(employeeData),
        },
      )
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          setModalVisibility(false);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisibility(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <TouchableOpacity onPress={() => setModalVisibility(false)}>
                <Image
                  style={styles.closeButton}
                  source={require('../assets/cross-button.webp')}
                />
              </TouchableOpacity>

              <FormField
                fieldName="firstName"
                label="First Name"
                placeholder="Enter First Name"
                isMandatory={true}
                isEditable={true}
                value={formState.firstName.value}
                error={formState.firstName.error}
                onChangeText={handleInputChange}
              />
              <FormField
                fieldName="lastName"
                label="Last Name"
                placeholder="Enter Last Name"
                isMandatory={true}
                isEditable={true}
                value={formState.lastName.value}
                error={formState.lastName.error}
                onChangeText={handleInputChange}
              />
              <FormField
                fieldName="addressLine1"
                label="Address Line 1"
                placeholder="Enter Address Line 1"
                isMandatory={true}
                isEditable={true}
                value={formState.addressLine1.value}
                error={formState.addressLine1.error}
                onChangeText={handleInputChange}
              />
              <FormField
                fieldName="city"
                label="City"
                placeholder="City"
                isMandatory={true}
                isEditable={true}
                value={formState.city.value}
                error={formState.city.error}
                onChangeText={handleInputChange}
              />
              <FormField
                fieldName="country"
                label="Country"
                placeholder="Country"
                isMandatory={true}
                isEditable={true}
                value={formState.country.value}
                error={formState.country.error}
                onChangeText={handleInputChange}
              />
              <FormField
                fieldName="email"
                label="Email"
                placeholder="Enter Email"
                isMandatory={true}
                isEditable={true}
                value={formState.email.value}
                error={formState.email.error}
                onChangeText={handleInputChange}
                customTextStyle={styles.emailInput}
              />
              <FormField
                fieldName="phoneNumber"
                label="Phone Number"
                placeholder="Enter Phone Number"
                isMandatory={true}
                isEditable={true}
                value={formState.phoneNumber.value}
                error={formState.phoneNumber.error}
                onChangeText={handleInputChange}
                customTextStyle={styles.phoneInput}
                customContainerStyle={styles.phoneContainer}
              />
              <TouchableOpacity
                style={{
                  borderRadius: 8,
                  marginVertical: 10,
                }}
                onPress={handleSubmit}>
                <LinearGradient
                  colors={['#7b42f6', '#f571c7']}
                  style={styles.buttonContainer}>
                  <Text
                    style={[
                      {
                        paddingTop: 0,
                        fontFamily: fontType.medium,
                        color: '#FFFFFF',
                      },
                    ]}>
                    Add Employee
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddEmployee;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    height: 25,
    width: 25,
    marginRight: 5,
    alignSelf: 'flex-end',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    height: '80%',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },

  datePicker: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
  emailInput: {
    borderColor: 'blue',
  },
  phoneInput: {
    borderColor: 'green',
  },
  phoneContainer: {
    marginBottom: 15,
  },
  buttonContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 8,
  },
  dropdown: {borderRadius: 8},
  dropdownButton: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#F2F3F5',
    height: 40,
    borderWidth: 1,
    borderColor: '#C4C4C4',
  },
  dropdownButtonText: {
    alignSelf: 'center',
    fontSize: 12,

    fontFamily: fontType.regular,
    fontWeight: '400',
  },
  dropdownRow: {
    fontFamily: fontType.regular,
    fontSize: 12,
  },
});
