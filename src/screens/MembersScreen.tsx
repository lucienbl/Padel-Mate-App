import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import tw from '@/lib/tw';
import { useMe } from '@/services/users';
import { Button } from '@/components';

type MembersScreenProps = {};

const MembersScreen = ({}: MembersScreenProps) => {
  const { data: me } = useMe({});

  return (
    <View style={tw`flex-1 bg-black`}>
      {(me?.groups?.length ?? 0) > 0 ? (
        <>
          <Text style={tw`text-white font-semibold text-center`}>
            123 Membres
          </Text>
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
        </>
      ) : (
        <View style={tw`flex-1 items-center justify-center gap-4`}>
          <Text style={tw`text-white font-semibold`}>
            Vous ne faites partie d'aucun groupe
          </Text>
          <Button title="Rejoindre un groupe" />
        </View>
      )}
    </View>
  );
};

export default MembersScreen;
