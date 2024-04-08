import React, { useRef } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
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
      source={require('@/assets/images/img_auth_background.png')}>
      <KeyboardAvoidingView behavior="padding" style={tw`flex-1 justify-end`}>
        <View style={tw`p-6 gap-6`}>
          <PhoneInput
            ref={input}
            style={tw`bg-white text-neutral-700 px-4 rounded-xl`}
            //initialCountry={RNLocalize.getCountry().toLowerCase()}
            onChangePhoneNumber={setPhone}
            textProps={{
              placeholder: 'Phone number',
              placeholderTextColor: tw.color('white/60'),
              style: tw`text-neutral-700 h-12`,
            }}
          />
          {error && <Text style={tw`text-xs text-red-600 mt-2`}>{error}</Text>}
          <Button
            onPress={handleClickNext}
            title="Next"
            disabled={!phone}
            loading={loading}
          />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default AuthPhoneScreen;
