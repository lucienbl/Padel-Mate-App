import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen, SplashScreen, TournamentsScreen } from '@/screens';
import * as screenIds from './screenIds';
import { navigatorIds } from '@/navigation/index';
import MainNavigator from '@/navigation/MainNavigator';
import AuthNavigator from '@/navigation/AuthNavigator';
import CreateNavigator from '@/navigation/CreateNavigator.tsx';

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
    <Stack.Screen
      name={navigatorIds.NAVIGATOR_CREATE}
      component={CreateNavigator}
      options={{
        headerShown: false,
        presentation: 'modal',
      }}
    />
    <Stack.Screen
      name={screenIds.SCREEN_TOURNAMENTS}
      component={TournamentsScreen}
    />
  </Stack.Navigator>
);

export default RootNavigator;
