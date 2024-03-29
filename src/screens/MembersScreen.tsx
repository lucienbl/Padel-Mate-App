import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import tw from '@/lib/tw';

type MembersScreenProps = {};

const MembersScreen = ({}: MembersScreenProps) => {
  return (
    <View style={tw`flex-1 bg-black`}>
      <Text style={tw`text-white font-semibold text-center`}>123 Membres</Text>
      <View style={tw`flex-1 bg-white rounded-t-3xl mt-4`}>
        <FlatList
          data={[{}, {}, {}, {}, {}, {}, {}, {}]}
          numColumns={4}
          style={tw`px-3 py-5`}
          columnWrapperStyle={tw`gap-4`}
          contentContainerStyle={tw`gap-4`}
          renderItem={({ item }) => (
            <View style={tw`flex-1 items-center justify-center`}>
              <View style={tw`w-12 h-12 border-2 rounded-full`} />
              <Text style={tw`font-semibold`}>Test test</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default MembersScreen;
