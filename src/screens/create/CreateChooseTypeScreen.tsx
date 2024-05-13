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
  const handleClickCreateTournament = () => {
    NavigationService.navigate(screenIds.SCREEN_CREATE_TOURNAMENT);
  };

  const handleClickCancel = () => {
    NavigationService.dispatch(CommonActions.goBack());
  };

  return (
    <ImageBackground
      style={tw`flex-1`}
      source={require('@/assets/images/img_bg_tournament.png')}>
      <View style={tw`flex-1 bg-orange-dark/70`}>
        <View style={tw`flex-1 justify-center p-12 gap-4`}>
          <Pressable
            style={tw`bg-primary rounded-xl py-3 items-center`}
            onPress={handleClickCreateTournament}>
            <Text style={tw`text-white font-semibold uppercase`}>
              Créer un tournoi
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
