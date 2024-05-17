import React from 'react';
import { FlatList, Text, View } from 'react-native';
import tw from '@/lib/tw';
import { useTournaments } from '@/services/tournaments/getTournaments.ts';

type TournamentsScreenProps = {};

const TournamentsScreen = ({}: TournamentsScreenProps) => {
  const { data: tournaments } = useTournaments({});

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={tournaments}
        contentContainerStyle={tw`gap-2 p-4`}
        renderItem={({ item: tournament }) => (
          <View style={tw`bg-neutral-100 rounded-lg px-4 py-2`}>
            <Text>{tournament.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default TournamentsScreen;
