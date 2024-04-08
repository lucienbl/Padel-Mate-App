import React, { useCallback, useEffect } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Text,
  View,
} from 'react-native';
import { Button, TextInput } from '@/components';
import { useState } from 'react';
import tw from '@/lib/tw';
import auth from '@react-native-firebase/auth';
import { useAuth } from '@/contexts/Auth.tsx';
import { getMe } from '@/services/users';
import { NavigationService, navigatorIds, screenIds } from '@/navigation';
import { useAppStore } from '@/stores/app.ts';

type AuthCodeScreenProps = {};

const AuthCodeScreen = ({}: AuthCodeScreenProps) => {
  const { confirmation } = useAuth();
  const { token } = useAppStore();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');
  const [code, setCode] = useState('');

  const login = useCallback(async () => {
    getMe()
      .then(() => {
        NavigationService.replace(navigatorIds.NAVIGATOR_MAIN);
      })
      .catch(() => {
        if (token) {
          NavigationService.replace(navigatorIds.NAVIGATOR_AUTH, {
            screen: screenIds.SCREEN_REGISTER,
          });
        } else {
          NavigationService.replace(navigatorIds.NAVIGATOR_AUTH);
        }
      });
  }, [token]);

  useEffect(() => {
    return auth().onAuthStateChanged(async user => {
      if (user) {
        await login();
      }
    });
  }, [login]);

  const handleClickNext = async () => {
    setLoading(true);
    const success = await confirm();
    setLoading(false);
    if (!success) {
      return;
    }
    await login();
  };

  const confirm = async () => {
    try {
      await confirmation?.confirm(code);
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
          <TextInput
            value={code}
            onChangeText={setCode}
            placeholderTextColor={tw.color('neutral-700')}
            style={tw`my-2 bg-white text-neutral-700`}
            keyboardType="number-pad"
            autoFocus
            placeholder="Code"
          />
          {error && <Text style={tw`text-xs text-red-500`}>{error}</Text>}
          <Button
            onPress={handleClickNext}
            title="Continuer"
            loading={loading}
          />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default AuthCodeScreen;
