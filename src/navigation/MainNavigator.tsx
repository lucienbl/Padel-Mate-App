import * as React from 'react';
import * as screenIds from './screenIds';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  CalendarScreen,
  HoursScreen,
  MembersScreen,
  MessagesScreen,
} from '@/screens';
import tw from '@/lib/tw';
import { Image, Platform, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationService } from '@/navigation/index.ts';

type MainNavigatorProps = {};

const Tab = createBottomTabNavigator();

const MainNavigator = ({}: MainNavigatorProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName={screenIds.SCREEN_CALENDAR}
      screenListeners={() => ({
        //tabPress: () => ReactNativeHapticFeedback.trigger('impactHeavy'),
      })}
      screenOptions={{
        header: ({ route }) => (
          <View
            style={tw.style(
              `flex-row bg-black items-center justify-between pt-[${
                (Platform.OS === 'android' ? 16 : 0) + insets.top
              }px] pb-4 px-3`,
              {
                'bg-primary': route.name === screenIds.SCREEN_HOURS,
              },
            )}>
            <Image
              style={tw`h-8`}
              resizeMode="contain"
              source={require('@/assets/images/img_logo_alt_white.png')}
            />
            <View>
              <Text
                style={tw.style('text-white font-semibold', {
                  'text-secondary': route.name === screenIds.SCREEN_HOURS,
                })}>
                Nom groupe
              </Text>
            </View>
            <Pressable
              onPress={() =>
                NavigationService.navigate(screenIds.SCREEN_PROFILE)
              }
              style={tw`h-8 w-8 border-2 border-white rounded-full`}
            />
          </View>
        ),
        tabBarStyle: tw.style(
          `bg-neutral-800 border-t-0 ${
            insets.bottom > 0 ? 'h-24 pt-2' : 'h-20 py-3'
          }`,
        ),
        tabBarActiveTintColor: tw.color('primary'),
        tabBarLabel: () => null,
      }}>
      <Tab.Screen
        name={screenIds.SCREEN_HOURS}
        component={HoursScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              style={tw`tint-[${color}] h-6 w-6`}
              resizeMode="contain"
              source={require('@/assets/images/img_icon_clock.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name={screenIds.SCREEN_CALENDAR}
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              style={tw`tint-[${color}] h-6 w-6`}
              resizeMode="contain"
              source={require('@/assets/images/img_icon_calendar.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name={screenIds.SCREEN_MEMBERS}
        component={MembersScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Image
              style={tw`tint-[${color}] h-6 w-6`}
              resizeMode="contain"
              source={require('@/assets/images/img_icon_search.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name={screenIds.SCREEN_MESSAGES}
        component={MessagesScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Image
              style={tw`tint-[${color}] h-6 w-6`}
              resizeMode="contain"
              source={require('@/assets/images/img_icon_message.png')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
