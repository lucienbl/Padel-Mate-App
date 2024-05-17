import * as React from 'react';
import * as screenIds from './screenIds';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, SearchScreen } from '@/screens';
import tw from '@/lib/tw';
import { Image, Platform, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { navigatorIds } from '@/navigation/index.ts';
import { useMe } from '@/services/users';

type MainNavigatorProps = {};

const Tab = createBottomTabNavigator();

const MainNavigator = ({}: MainNavigatorProps) => {
  const { data: me } = useMe({});
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName={screenIds.SCREEN_HOME}
      screenListeners={() => ({
        //tabPress: () => ReactNativeHapticFeedback.trigger('impactHeavy'),
      })}
      screenOptions={{
        header: ({ route }) => (
          <View
            style={tw`flex-row bg-white items-center justify-between pt-[${
              (Platform.OS === 'android' ? 16 : 0) + insets.top
            }px] pb-4 px-3`}>
            <Image
              style={tw`h-8`}
              resizeMode="contain"
              source={require('@/assets/images/img_logo_short.png')}
            />
            <View>
              <Text style={tw`text-white font-semibold`}>
                {(me?.groups?.length ?? 0) > 0 ? 'Nom groupe' : ''}
              </Text>
            </View>
          </View>
        ),
        tabBarStyle: tw.style(
          `bg-neutral-100 border-t-0 ${
            insets.bottom > 0 ? 'h-24 pt-2' : 'h-20 py-3'
          }`,
        ),
        tabBarActiveTintColor: tw.color('primary'),
        tabBarLabel: () => null,
      }}>
      <Tab.Screen
        name={screenIds.SCREEN_HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              style={tw`tint-[${color}] h-6 w-6`}
              resizeMode="contain"
              source={require('@/assets/images/img_icon_home.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name={screenIds.SCREEN_CREATE_CHOOSE_TYPE}
        component={View}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              style={tw`tint-[${color}] h-12 w-12`}
              resizeMode="contain"
              source={require('@/assets/images/img_icon_add.png')}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate(navigatorIds.NAVIGATOR_CREATE);
          },
        })}
      />
      <Tab.Screen
        name={screenIds.SCREEN_SEARCH}
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              style={tw`tint-[${color}] h-6 w-6`}
              resizeMode="contain"
              source={require('@/assets/images/img_icon_search.png')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
