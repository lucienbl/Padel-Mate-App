import React from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import tw from '@/lib/tw';

type ProfileScreenProps = {};

const ProfileScreen = ({}: ProfileScreenProps) => {
  return (
    <View style={tw`flex-1 bg-black pt-4`}>
      <Text style={tw`font-semibold text-primary text-center`}>Ton profil</Text>
      <View style={tw`flex-1 bg-white rounded-t-3xl mt-4 py-6 mt-16`}>
        <View
          style={tw`absolute w-full -top-12 h-24 items-center justify-center`}>
          <View style={tw`h-24 w-24 border-2 rounded-full bg-white`} />
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
