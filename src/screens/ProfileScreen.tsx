import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import tw from '@/lib/tw';
import { useMe } from '@/services/users';
import auth from '@react-native-firebase/auth';
import { NavigationService, navigatorIds } from '@/navigation';
import { Avatar } from '@/components';

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
          <Avatar size={24} name={me?.firstName} withBorder />
        </View>
        <View style={tw`flex-1`}>
          <Text style={tw`font-semibold text-center mt-10`}>
            {me?.firstName}
          </Text>
          <Text style={tw`font-semibold text-center mt-2`}>{me?.lastName}</Text>
        </View>
        <Pressable
          style={tw`flex-row items-center px-6 pb-4 gap-6`}
          onPress={handleClickLogout}>
          <View
            style={tw`h-10 w-10 rounded-xl bg-neutral-200 items-center justify-center`}>
            <View style={tw`h-5 w-5 rounded-full bg-neutral-500`} />
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw``}>Déconnecter</Text>
          </View>
          <View style={tw`items-center`}>
            <Image
              style={tw`h-4 w-4 tint-black`}
              resizeMode="contain"
              source={require('@/assets/images/img_icon_chevron_right.png')}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileScreen;
