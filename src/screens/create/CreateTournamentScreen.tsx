import React from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  Text,
  View,
} from 'react-native';
import tw from '@/lib/tw.ts';
import { NavigationService, screenIds } from '@/navigation';
import { CommonActions } from '@react-navigation/native';

type CreateChoseTypeScreenProps = {};

const CreateChooseTypeScreen = ({}: CreateChoseTypeScreenProps) => {
  const handleClickChooseClub = () => {
    NavigationService.navigate(screenIds.SCREEN_CREATE_TOURNAMENT_CHOOSE_CLUB);
  };

  const handleClickCancel = () => {
    NavigationService.dispatch(CommonActions.goBack());
  };

  return (
    <ImageBackground
      style={tw`flex-1`}
      source={require('@/assets/images/img_bg_tournament.png')}>
      <View style={tw`flex-1 bg-orange-dark/70 justify-center px-6`}>
        <Text style={tw`font-semibold text-lg text-white`}>
          Créer un nouveau tournoi
        </Text>
        <Text style={tw`text-white`}>En tant que...</Text>
        <View style={tw`gap-3 mt-6`}>
          <Pressable
            style={tw`bg-orange-dark/80 border-white border rounded-xl py-3 items-center opacity-50`}
            disabled>
            <Text style={tw`text-white font-semibold uppercase`}>
              Gestionnaire d'un club
            </Text>
          </Pressable>
          <Pressable
            style={tw`bg-orange-dark/80 border-white border rounded-xl py-3 items-center`}
            onPress={handleClickChooseClub}>
            <Text style={tw`text-white font-semibold uppercase`}>
              Gestionnaire d'un groupe
            </Text>
          </Pressable>
          <Pressable
            style={tw`bg-primary rounded-xl py-3 items-center`}
            onPress={handleClickCancel}>
            <Text style={tw`text-white font-semibold uppercase`}>Annuler</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
};

export default CreateChooseTypeScreen;
