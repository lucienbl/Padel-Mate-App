import React, { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  Text,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import tw from '@/lib/tw';
import { Button, TextInput } from '@/components';
import { registerUser } from '@/services/users';
import auth from '@react-native-firebase/auth';
import { NavigationService, navigatorIds } from '@/navigation';

type RegisterScreenProps = {
  registerCore: (firstName: string, lastName: string, birthdate: Date) => void;
  isLoading?: boolean;
};

const RegisterScreen = ({ isLoading }: RegisterScreenProps) => {
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
    await registerUser({
      firstName: user.firstName,
      lastName: user.lastName,
      birthdate: user.birthdate,
      firebaseUid: auth().currentUser?.uid ?? '',
    });
    NavigationService.replace(navigatorIds.NAVIGATOR_MAIN);
  };

  return (
    <ImageBackground
      style={tw`flex-1`}
      source={require('@/assets/images/img_bg_auth.png')}>
      <KeyboardAvoidingView
        behavior="padding"
        style={tw`flex-1 bg-primary-dark/70`}>
        <View style={tw`flex-1 p-12 gap-2`}>
          <TextInput
            value={user.firstName}
            onChangeText={firstName => setUser({ ...user, firstName })}
            style={tw`bg-white text-neutral-700 px-4 py-2 rounded-xl text-center`}
            placeholderTextColor={tw.color('neutral-700')}
            autoFocus
            placeholder="Prénom"
          />
          <TextInput
            value={user.lastName}
            onChangeText={lastName => setUser({ ...user, lastName })}
            style={tw`bg-white text-neutral-700 px-4 py-2 rounded-xl text-center`}
            placeholderTextColor={tw.color('neutral-700')}
            placeholder="Nom"
          />
          <Pressable
            onPress={() => setDatePickerOpen(true)}
            style={tw`bg-white text-neutral-700 px-4 py-2 rounded-xl text-center`}>
            <Text style={tw`text-neutral-700 text-center`}>
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
