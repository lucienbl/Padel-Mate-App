import React, { useRef } from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  Text,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import tw from '@/lib/tw';
import { NavigationService, navigatorIds, screenIds } from '@/navigation';
import PhoneInput from 'react-native-phone-input';
import { Button } from '@/components';
import { useAuth } from '@/contexts/Auth.tsx';

type AuthPhoneScreenProps = {};

const AuthPhoneScreen = ({}: AuthPhoneScreenProps) => {
  const { loginWithPhone: loginWithPhoneNumber } = useAuth();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');

  const input = useRef<PhoneInput | null>(null);

  useEffect(() => {
    input.current?.focus();
  }, []);

  const handleClickNext = async () => {
    setLoading(true);
    const success = await login();
    setLoading(false);
    if (!success) {
      return;
    }
    NavigationService.navigate(navigatorIds.NAVIGATOR_AUTH, {
      screen: screenIds.SCREEN_AUTH_CODE,
      params: { phone },
    });
  };

  const login = async () => {
    try {
      await loginWithPhoneNumber(phone);
      return true;
    } catch (e: any) {
      setError(e.message);
      return false;
    }
  };

  return (
    <ImageBackground
      style={tw`flex-1`}
      source={require('@/assets/images/img_bg_auth.png')}>
      <KeyboardAvoidingView
        behavior="padding"
        style={tw`flex-1 bg-primary-dark/70`}>
        <View style={tw`flex-1 p-12`}>
          <View style={tw`flex-1 items-center justify-center`}>
            <Image
              resizeMode="contain"
              style={tw`w-1/2`}
              source={require('@/assets/images/img_logo.png')}
            />
          </View>
          <PhoneInput
            ref={input}
            style={tw`bg-white text-neutral-700 px-4 rounded-t-xl`}
            //initialCountry={RNLocalize.getCountry().toLowerCase()}
            onChangePhoneNumber={setPhone}
            textProps={{
              placeholder: 'Ton n° de mobile',
              placeholderTextColor: tw.color('neutral-300'),
              style: tw`text-neutral-700 h-12 font-light text-center text-sm`,
            }}
          />
          {error && <Text style={tw`text-xs text-red-600 mt-2`}>{error}</Text>}
          <Pressable
            style={tw`bg-primary rounded-b-xl py-3 items-center`}
            disabled={!phone || loading}
            onPress={handleClickNext}>
            <Text style={tw`text-white text-lg font-bold`}>CONTINUER</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default AuthPhoneScreen;
