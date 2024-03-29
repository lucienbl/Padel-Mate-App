import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import tw from '@/lib/tw';
import { NavigationService, navigatorIds, screenIds } from '@/navigation';
import { useAuth } from '@/contexts/Auth.tsx';
import { getMe } from '@/services/users';
import { useAppStore } from '@/stores/app.ts';

type SplashScreenProps = {};

const SplashScreen = ({}: SplashScreenProps) => {
  const { initializing } = useAuth();
  const { token } = useAppStore();

  useEffect(() => {
    if (!initializing) {
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
    }
  }, [initializing, token]);

  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center bg-primary`}>
      <View style={tw`flex-1 items-center justify-center`}>
        <Image
          style={tw`w-60 h-18 rounded-xl`}
          resizeMode="contain"
          source={require('@/assets/images/img_logo.png')}
        />
        <Text
          style={tw`font-poppins-regular text-white mt-6 max-w-[80%] text-center`}>
          Chargement...
        </Text>
      </View>
      <ActivityIndicator style={tw`mb-6`} color={tw.color('white')} />
    </SafeAreaView>
  );
};
export default SplashScreen;
