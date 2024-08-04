import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {fontType} from '../assets/fonts';
import {appConfig} from '../constants';

const EmployeeDetails = ({strings}) => {
  const employee = {
    firstName: 'John',
    lastName: 'Doe',
    department: 'Human Resource',
    dateOfJoining: '26-10-2021',
    address: {
      line1: '123 Main St',
      city: 'Springfield',
      state: 'IL',
    },
    contactMethods: {
      email: 'john.doe@example.com',
      phone: '555-1234',
    },
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Employee',
      'Are you sure you want to delete this employee?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', onPress: () => {}},
      ],
      {cancelable: true},
    );
  };

  const getKeyValueView = (key, value) => {
    return (
      <View style={styles.row}>
        <Text style={styles.keyText}>{key}</Text>
        <Text style={[styles.keyText, styles.valueText]}>{value}</Text>
      </View>
    );
  };

  return (
    <>
      <ScrollView style={styles.scrollView}>
        <View>
          <View style={[styles.row, styles.contentContainer]}>
            <Image
              style={styles.image}
              resizeMode={'contain'}
              source={require('../assets/employee.png')}
            />
            <View style={styles.nameAndSpecialityTextContainer}>
              <Text style={styles.nameText}>
                {`${employee?.firstName} ${employee?.lastName}`}
              </Text>
              <Text numberOfLines={2} style={styles.specialityText}>
                {"'Employee since 12th Jan,2021"}
              </Text>
            </View>
          </View>
          <View style={styles.marginVertical15}>
            {getKeyValueView(
              'Name',
              `${employee?.firstName} ${employee?.lastName}`,
            )}
            {getKeyValueView(
              'Address',
              `${employee?.address?.line1} ${employee?.address?.city}  ${employee?.address?.state}`,
            )}
            {getKeyValueView('Email', `${employee?.contactMethods?.email}`)}
            {getKeyValueView('Phone', `${employee?.contactMethods?.phone}`)}
          </View>
        </View>
        <View style={styles.borderRadius10}>
          <TouchableOpacity style={styles.alignCenter} onPress={handleDelete}>
            <LinearGradient
              colors={['#7b42f6', '#f571c7']}
              style={styles.buttonContainer}>
              <Text style={styles.deleteButtonText}>Delete Employee</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appConfig.primaryColor,
  },
  contentContainer: {marginTop: 25},
  image: {
    height: 56,
    width: 56,
    borderRadius: 28,
    alignSelf: 'center',
    padding: 10,
    marginLeft: 10,
  },
  nameText: {
    color: appConfig.genericTextColor,
    fontSize: 15,
    fontWeight: '500',
    fontFamily: fontType.semiBold,
    paddingHorizontal: 20,
  },
  specialityText: {
    fontSize: 13,
    color: appConfig.blackTextColor,
    marginTop: 4,
    fontFamily: fontType.regular,
    paddingHorizontal: 20,
  },
  keyText: {
    width: '50%',
    fontSize: 14,
    color: appConfig.specialityCardText,
    fontFamily: fontType.regular,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  valueText: {
    fontFamily: fontType.medium,
    color: appConfig.blackTextColor,
  },
  addressKey: {
    fontSize: 10,
    fontFamily: fontType.regular,
    color: '#74767E',
    fontWeight: '700',
    lineHeight: 18,
  },
  addressValue: {
    fontFamily: fontType.regular,
    fontSize: 10,
    color: '#74767E',
    fontWeight: '400',
    lineHeight: 18,
  },
  button: {
    backgroundColor: appConfig.primaryColor,
    height: 40,
    width: '100%',
    borderRadius: 8,
  },
  scrollView: {
    flex: 1,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 55,
    alignSelf: 'center',
    borderStyle: 'solid',
    backgroundColor: appConfig.whiteBackground,
    elevation: 20,
    borderRadius: 32,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  text: {
    textAlign: 'center',
    fontFamily: fontType.regular,
    fontSize: 12,
    top: '25%',
    color: appConfig.loginButtonText,
  },
  timeSlotText: {
    textAlign: 'center',
    fontFamily: fontType.regular,
    fontSize: 10,
    color: appConfig.loginButtonText,
  },
  row: {flexDirection: 'row'},
  nameAndSpecialityTextContainer: {flex: 1, flexGrow: 1},
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: appConfig.whiteBackground,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderRadius: 10,
  },
  addressContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  formFieldLabelText: {
    fontFamily: fontType.regular,
    fontSize: 10,
    color: appConfig.blackTextColor,
    fontWeight: '400',
    paddingVertical: 2,
  },
  dropDownButton: {
    height: 32,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    width: '100%',
    borderColor: appConfig.unselectedtab,
  },
  textInput: {
    padding: 0,
    paddingHorizontal: 10,
  },
  dropDownMenu: {
    borderRadius: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#C4C4C4',
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
    marginHorizontal: 18,
    borderRadius: 8,
    shadowColor: appConfig.primaryColor,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 2,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  amountContainerText: {
    textAlign: 'center',
    fontFamily: fontType.regular,
    fontSize: 12,
    color: appConfig.blackTextColor,
    fontWeight: '400',
  },
  fieldContainer: {
    marginBottom: 10,
    marginHorizontal: 18,
    borderRadius: 8,
    shadowColor: appConfig.primaryColor,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 2,
    backgroundColor: 'white',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    top: 38,
    justifyContent: 'center',
  },
  loaderContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  slotButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginRight: 5,
    backgroundColor: appConfig.inactivePrimaryColor,
    width: 80,
    borderRadius: 8,
  },
  slotButtonText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fontType.regular,
    fontSize: 13,
    color: appConfig.loginButtonText,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  dropdownContainer: {flex: 1, alignSelf: 'flex-end'},
  radioButtontainer: {marginTop: 20},
  searchImageContainer: {
    marginHorizontal: 8,
    alignSelf: 'center',
  },
  dropdown: {borderRadius: 8},
  dropdownButton: {
    width: '50%',
    right: 18,
    borderRadius: 8,
    backgroundColor: 'rgba(57, 34, 98,0.85)',
    borderWidth: 1,
    borderColor: appConfig.whiteBackground,
  },
  dropdownButtonText: {
    alignSelf: 'center',
    fontSize: 12,
    color: appConfig.whiteBackground,
    fontFamily: fontType.regular,
  },
  dropdownRow: {
    fontFamily: fontType.regular,
    color: appConfig.genericTextColor,
    fontSize: 12,
  },
  arrowDown: {
    top: -1,
    left: 5,
    height: 8,
    width: 12,
    tintColor: appConfig.whiteBackground,
  },
  marginVertical15: {
    marginVertical: 15,
  },
  borderRadius10: {
    borderRadius: 10,
  },
  alignCenter: {
    alignSelf: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  deleteButtonText: {
    top: 10,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fontType.medium,
    color: '#FFFFFF',
  },
});

export default EmployeeDetails;
