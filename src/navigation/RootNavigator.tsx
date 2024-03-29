import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen, SplashScreen } from '@/screens';
import * as screenIds from './screenIds';
import { navigatorIds } from '@/navigation/index';
import MainNavigator from '@/navigation/MainNavigator';
import AuthNavigator from '@/navigation/AuthNavigator';

const Stack = createNativeStackNavigator();

const RootNavigator = () => (
  <Stack.Navigator
    initialRouteName={screenIds.SCREEN_SPLASH}
    screenOptions={{ orientation: 'portrait' }}>
    <Stack.Screen
      name={screenIds.SCREEN_SPLASH}
      component={SplashScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={navigatorIds.NAVIGATOR_MAIN}
      component={MainNavigator}
      options={{
        headerShown: false,
        animation: 'fade',
      }}
    />
    <Stack.Screen
      name={navigatorIds.NAVIGATOR_AUTH}
      component={AuthNavigator}
      options={{
        headerShown: false,
        presentation: 'modal',
        gestureEnabled: false,
      }}
    />
    <Stack.Screen
      name={screenIds.SCREEN_PROFILE}
      component={ProfileScreen}
      options={{
        headerShown: false,
        presentation: 'modal',
      }}
    />
  </Stack.Navigator>
);

export default RootNavigator;
