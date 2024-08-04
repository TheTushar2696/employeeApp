import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface FormFieldProps {
  fieldName: string;
  label?: string;
  placeholder?: string;
  customTextStyle?: TextStyle;
  customContainerStyle?: ViewStyle;
  isMandatory?: boolean;
  isEditable?: boolean;
  value?: string;
  error?: string;
  onChangeText: (fieldName: string, text: string) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  fieldName,
  label,
  placeholder,
  customTextStyle,
  customContainerStyle,
  isMandatory,
  isEditable = true,
  value,
  error,
  onChangeText,
}) => (
  <View style={[styles.container, customContainerStyle]}>
    {label && (
      <Text style={styles.label}>
        {label}
        {isMandatory && <Text style={styles.mandatory}> *</Text>}
      </Text>
    )}
    <TextInput
      placeholder={placeholder}
      editable={isEditable}
      value={value}
      onChangeText={text => onChangeText(fieldName, text)}
      style={[styles.textInput, customTextStyle]}
    />
    {error && <Text style={styles.error}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  mandatory: {
    color: 'red',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});

export default FormField;
