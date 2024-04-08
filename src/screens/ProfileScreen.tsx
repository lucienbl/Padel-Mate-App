import React from 'react';
import { Pressable, Text, View } from 'react-native';
import tw from '@/lib/tw';
import { useMe } from '@/services/users';
import auth from '@react-native-firebase/auth';
import { NavigationService, navigatorIds } from '@/navigation';

type ProfileScreenProps = {};

const ProfileScreen = ({}: ProfileScreenProps) => {
  const { data: me } = useMe({});

  const handleClickLogout = async () => {
    await auth().signOut();
    NavigationService.replace(navigatorIds.NAVIGATOR_AUTH);
  };

  return (
    <View style={tw`flex-1 bg-black pt-4`}>
      <Text style={tw`font-semibold text-primary text-center`}>Ton profil</Text>
      <View style={tw`flex-1 bg-white rounded-t-3xl mt-4 py-6 mt-16`}>
        <View
          style={tw`absolute w-full -top-12 h-24 items-center justify-center`}>
          <View style={tw`h-24 w-24 border-2 rounded-full bg-white`} />
        </View>
        <View style={tw`flex-1`}>
          <Text style={tw`font-semibold text-center mt-10`}>
            {me?.firstName}
          </Text>
          <Text style={tw`font-semibold text-center mt-2`}>{me?.lastName}</Text>
        </View>
        <Pressable onPress={handleClickLogout}>
          <Text style={tw`text-center text-red-500`}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileScreen;
