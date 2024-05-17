import React, { useState } from 'react';
import { FlatList, ImageBackground, Pressable, Text, View } from 'react-native';
import tw from '@/lib/tw.ts';
import { NavigationService, screenIds } from '@/navigation';
import { useClubs } from '@/services/clubs/getClubs.ts';

type CreateChoseTypeScreenProps = {};

const CreateChooseTypeScreen = ({}: CreateChoseTypeScreenProps) => {
  const { data: clubs } = useClubs({});

  const [selectedClubId, setSelectedClubId] = useState<string | null>(null);

  const handleClickNext = () => {
    NavigationService.navigate(
      screenIds.SCREEN_CREATE_TOURNAMENT_INFORMATION_1,
      { selectedClubId },
    );
  };

  return (
    <ImageBackground
      style={tw`flex-1`}
      source={require('@/assets/images/img_bg_tournament.png')}>
      <View style={tw`flex-1 bg-orange-dark/70 justify-center px-6 pt-20 pb-6`}>
        <Text style={tw`font-semibold text-lg text-white`}>
          Sélectionnez votre club
        </Text>
        <Text style={tw`text-white`}>
          Une validation sera nécessaire auprès de PADEL MATE...
        </Text>
        <FlatList
          style={tw`my-4`}
          data={clubs}
          renderItem={({ item: club }) => (
            <Pressable
              onPress={() => setSelectedClubId(club.id)}
              style={tw`bg-orange-dark/80 rounded-lg px-4 py-2 border-2 ${
                selectedClubId === club.id
                  ? 'border-primary'
                  : 'border-orange-dark/80'
              }`}>
              <Text style={tw`text-white font-semibold`}>{club.name}</Text>
            </Pressable>
          )}
        />
        <View style={tw`gap-3 mt-6`}>
          <Pressable
            style={tw`bg-primary rounded-xl py-3 items-center`}
            onPress={handleClickNext}>
            <Text style={tw`text-white font-semibold uppercase`}>Valider</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
};

export default CreateChooseTypeScreen;
