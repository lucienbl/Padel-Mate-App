import * as React from 'react';
import * as screenIds from './screenIds';
import { RegisterScreen, AuthPhoneScreen, AuthCodeScreen } from '@/screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import tw from '@/lib/tw';

type AuthNavigatorProps = {};

const Stack = createNativeStackNavigator();

const AuthNavigator = ({}: AuthNavigatorProps) => (
  <Stack.Navigator
    initialRouteName={screenIds.SCREEN_AUTH_PHONE}
    screenOptions={{
      headerTitle: '',
      headerStyle: tw`bg-black`,
      headerShadowVisible: false,
      gestureEnabled: false,
    }}>
    <Stack.Screen
      name={screenIds.SCREEN_AUTH_PHONE}
      component={AuthPhoneScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={screenIds.SCREEN_AUTH_CODE}
      component={AuthCodeScreen as any}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={screenIds.SCREEN_REGISTER}
      component={RegisterScreen as any}
      options={{ headerLeft: () => <View /> }}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
