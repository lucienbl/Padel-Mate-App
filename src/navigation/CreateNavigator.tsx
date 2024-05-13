import * as React from 'react';
import * as screenIds from './screenIds';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateChooseTypeScreen } from '@/screens';
import { Image, Platform, Text, View } from 'react-native';
import tw from '@/lib/tw.ts';
import CreateTournamentScreen from '@/screens/create/CreateTournamentScreen.tsx';
import CreateTournamentChooseClubScreen from '@/screens/create/CreateTournamentChooseClubScreen.tsx';
import CreateTournamentInformation1Screen from '@/screens/create/CreateTournamentInformation1Screen.tsx';
import CreateTournamentInformation2Screen from '@/screens/create/CreateTournamentInformation2Screen.tsx';

const Stack = createNativeStackNavigator();

const CreateNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={screenIds.SCREEN_CREATE_CHOOSE_TYPE}
      screenOptions={{
        header: () => (
          <View
            style={tw`absolute top-0 left-0 right-0 flex-row items-center justify-between pt-8 pb-4 px-4`}>
            <Image
              style={tw`h-8`}
              resizeMode="contain"
              source={require('@/assets/images/img_logo_short_white.png')}
            />
          </View>
        ),
      }}>
      <Stack.Screen
        name={screenIds.SCREEN_CREATE_CHOOSE_TYPE}
        component={CreateChooseTypeScreen}
      />
      <Stack.Screen
        name={screenIds.SCREEN_CREATE_TOURNAMENT}
        component={CreateTournamentScreen}
      />
      <Stack.Screen
        name={screenIds.SCREEN_CREATE_TOURNAMENT_CHOOSE_CLUB}
        component={CreateTournamentChooseClubScreen}
      />
      <Stack.Screen
        name={screenIds.SCREEN_CREATE_TOURNAMENT_INFORMATION_1}
        component={CreateTournamentInformation1Screen}
      />
      <Stack.Screen
        name={screenIds.SCREEN_CREATE_TOURNAMENT_INFORMATION_2}
        component={CreateTournamentInformation2Screen}
      />
    </Stack.Navigator>
  );
};

export default CreateNavigator;
