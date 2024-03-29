import React, { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import tw from '@/lib/tw';
import { Button, TextInput } from '@/components';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import PhoneInput from 'react-native-phone-input';

type RegisterScreenProps = {
  registerCore: (firstName: string, lastName: string, birthdate: Date) => void;
  isLoading?: boolean;
};

const RegisterScreen = ({ registerCore, isLoading }: RegisterScreenProps) => {
  const [user, setUser] = useState<any>({
    firstName: '',
    lastName: '',
    birthdate: null,
  });

  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const validateForm = () => user.firstName && user.lastName && user.birthdate;

  const handleClickRegister = async () => {
    if (!validateForm()) {
      return;
    }
    registerCore(user.firstName, user.lastName, user.birthdate);
  };

  return (
    <ImageBackground
      style={tw`flex-1`}
      source={require('@/assets/images/img_auth_background.png')}>
      <KeyboardAvoidingView behavior="padding" style={tw`flex-1 justify-end`}>
        <View style={tw`p-6 gap-4`}>
          <TextInput
            value={user.firstName}
            onChangeText={firstName => setUser({ ...user, firstName })}
            style={tw`bg-white text-neutral-700 px-4 rounded-xl`}
            placeholderTextColor={tw.color('neutral-700')}
            autoFocus
            placeholder="Prénom"
          />
          <TextInput
            value={user.lastName}
            onChangeText={lastName => setUser({ ...user, lastName })}
            style={tw`bg-white text-neutral-700 px-4 rounded-xl`}
            placeholderTextColor={tw.color('neutral-700')}
            placeholder="Nom"
          />
          <Pressable
            onPress={() => setDatePickerOpen(true)}
            style={tw`bg-white px-4 py-4 rounded-xl`}>
            <Text style={tw`text-neutral-700 font-poppins-regular`}>
              {user.birthdate
                ? user.birthdate.toLocaleDateString()
                : 'Date de naissance'}
            </Text>
          </Pressable>
          <Button
            onPress={handleClickRegister}
            title="Submit"
            disabled={!validateForm()}
            loading={isLoading}
          />
        </View>
      </KeyboardAvoidingView>
      <DatePicker
        modal
        open={datePickerOpen}
        mode={'date'}
        title="Birthdate"
        //locale={i18n.locale}
        date={user.birthdate ?? new Date()}
        maximumDate={new Date()}
        onConfirm={birthdate => {
          setDatePickerOpen(false);
          setUser({ ...user, birthdate });
        }}
        onCancel={() => {
          setDatePickerOpen(false);
        }}
      />
    </ImageBackground>
  );
};

export default RegisterScreen;
