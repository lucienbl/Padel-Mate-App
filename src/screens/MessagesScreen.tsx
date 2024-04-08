import React from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import tw from '@/lib/tw';
import { useMe } from '@/services/users';
import { Button } from '@/components';

type MembersScreenProps = {};

const MembersScreen = ({}: MembersScreenProps) => {
  const { data: me } = useMe({});

  return (
    <View style={tw`flex-1 bg-black`}>
      {(me?.groups?.length ?? 0) > 0 ? (
        <View style={tw`flex-1 bg-white rounded-t-3xl mt-4 px-6 py-6`}>
          <Text style={tw`font-semibold`}>Actualités du groupe</Text>
          <View style={tw`my-6`}>
            <ScrollView horizontal contentContainerStyle={tw`flex-row gap-3`}>
              <View style={tw`items-center gap-1 justify-center`}>
                <View style={tw`w-12 h-12 border-2 rounded-full`} />
                <Text style={tw`font-semibold text-xs`}>Test test</Text>
              </View>
              <View style={tw`items-center gap-1 justify-center`}>
                <View style={tw`w-12 h-12 border-2 rounded-full`} />
                <Text style={tw`font-semibold text-xs`}>Test test</Text>
              </View>
            </ScrollView>
          </View>
          <FlatList
            data={[{}, {}, {}, {}, {}, {}]}
            contentContainerStyle={tw`gap-4`}
            renderItem={({ item }) => (
              <View style={tw`flex-row gap-3`}>
                <View style={tw`w-12 h-12 border-2 rounded-full`} />
                <View style={tw`flex-1 gap-1 justify-center`}>
                  <Text style={tw`font-semibold`}>Test test</Text>
                  <Text style={tw`text-neutral-300 text-xs`}>
                    Lorem ipsum dolor sit amet...
                  </Text>
                </View>
                <View style={tw`gap-1 justify-center`}>
                  <Text style={tw`text-neutral-300 text-xs`}>14h</Text>
                </View>
              </View>
            )}
          />
        </View>
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
