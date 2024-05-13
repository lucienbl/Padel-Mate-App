import React, { useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import tw from '@/lib/tw.ts';
import { NavigationService, screenIds } from '@/navigation';
import {
  CommonActions,
  RouteProp,
  StackActions,
} from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import { TextInput } from '@/components';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useUsers } from '@/services/users';
import { useCreateTournament } from '@/services/tournaments/createTournament.ts';

type CreateChoseTypeScreenProps = {
  route: RouteProp<any>;
};

const CreateChooseTypeScreen = ({ route }: CreateChoseTypeScreenProps) => {
  const [tournamentType, setTournamentType] = useState<string>('Americano');
  const [tournamentOption, setTournamentOption] = useState<string>('Classic');
  const [points, setPoints] = useState<string>('8');
  const [selectPlayers, setSelectPlayers] = useState(false);
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>([]);
  const [name, setName] = useState<string>('');

  const { data: users } = useUsers({});

  const { mutateAsync: createTournament } = useCreateTournament({});

  const handleClickNext = async () => {
    const startDate = dayjs(route.params?.selectedDate).startOf('day');
    startDate.set('hour', dayjs(route.params?.selectedStartHour).hour());
    startDate.set('hour', dayjs(route.params?.selectedStartHour).minute());

    const endDate = dayjs(route.params?.selectedDate).startOf('day');
    endDate.set('hour', dayjs(route.params?.selectedEndHour).hour());
    endDate.set('hour', dayjs(route.params?.selectedEndHour).minute());

    await createTournament({
      clubId: route.params?.selectedClubId,
      startDate,
      endDate,
      fieldIds: route.params?.selectedFieldIds,
      points: parseInt(points, 10),
      playerIds: selectedPlayerIds,
      tournamentOption,
      tournamentType,
      name,
    });

    NavigationService.dispatch(StackActions.popToTop());
    NavigationService.dispatch(CommonActions.goBack());
  };

  const handleClickToggleSelectPlayers = () => {
    setSelectPlayers(!selectPlayers);
  };

  return (
    <ImageBackground
      style={tw`flex-1`}
      source={require('@/assets/images/img_bg_tournament.png')}>
      {selectPlayers ? (
        <View style={tw`flex-1 bg-orange-dark/70 px-6 pt-20 pb-6`}>
          <Text style={tw`text-white mt-4 mb-1`}>Sélectionnez vos joueurs</Text>
          <FlatList
            style={tw`my-4`}
            data={users}
            renderItem={({ item: player }) => (
              <Pressable
                onPress={() => {
                  if (selectedPlayerIds.includes(player.id)) {
                    setSelectedPlayerIds(
                      selectedPlayerIds.filter(
                        playerId => playerId !== player.id,
                      ),
                    );
                  } else {
                    setSelectedPlayerIds([...selectedPlayerIds, player.id]);
                  }
                }}
                style={tw`bg-orange-dark/80 rounded-lg px-4 py-2 border-2 mb-2 ${
                  selectedPlayerIds.includes(player.id)
                    ? 'border-primary'
                    : 'border-orange-dark/80'
                }`}>
                <Text style={tw`text-white font-semibold`}>
                  {player.firstName} {player.lastName}
                </Text>
              </Pressable>
            )}
          />
          <View style={tw`gap-3 mt-6`}>
            <Pressable
              style={tw`bg-primary rounded-xl py-3 items-center`}
              onPress={handleClickToggleSelectPlayers}>
              <Text style={tw`text-white font-semibold uppercase`}>
                Valider
              </Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <ScrollView>
          <View style={tw`flex-1 bg-orange-dark/70 px-6 pt-20 pb-6`}>
            <Text style={tw`font-semibold text-lg text-white`}>
              Votre nouveau tournoi
            </Text>
            <Text style={tw`text-white`}>Quelques détails à compléter...</Text>
            <Text style={tw`text-white mt-4 mb-1`}>Nom du tournoi</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={tw`bg-orange-dark/80 rounded-xl border border-white px-4 py-3`}
              placeholder="Compléter"
            />
            <Text style={tw`text-white mt-4 mb-1`}>Type de tournoi</Text>
            <SegmentedControl
              values={['Americano', 'Mexicano', 'Equipes']}
              onValueChange={setTournamentType}
              selectedIndex={0}
              style={tw`border border-white`}
              tintColor={tw.color('primary')}
              fontStyle={tw`text-white`}
            />
            <Text style={tw`text-white text-xs text-center mt-2`}>
              Le tournoi « AMERICANO », chaque joueur fera équipe une fois et
              chaque joueur collectera des points individuellement. ( 1 terrain
              pour 4 joueurs )
            </Text>
            {tournamentType === 'Americano' && (
              <View
                style={tw`border border-white rounded-lg mt-4 py-2 px-4 gap-3`}>
                <Pressable
                  onPress={() => setTournamentOption('Classic')}
                  style={tw`flex flex-row items-center gap-4 py-2 border-b border-b-white/40 pb-3`}>
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-white`}>Americano - Classique</Text>
                    <Text style={tw`text-white text-xs`}>
                      Tous les joueurs jouerons une fois ensemble.{' '}
                    </Text>
                  </View>
                  <View
                    style={tw`h-6 w-6 ${
                      tournamentOption === 'Classic' ? 'bg-primary' : 'bg-white'
                    } opacity-80 rounded-full`}
                  />
                </Pressable>
                <Pressable
                  disabled
                  onPress={() => setTournamentOption('Mix')}
                  style={tw`flex flex-row items-center gap-4 border-b border-b-white/40 pb-3 opacity-80`}>
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-white`}>Americano - Mixte</Text>
                    <Text style={tw`text-white text-xs`}>
                      Tous les joueurs feront équipe une fois avec un joueur du
                      sexe opposé. Ce type nécessite un nombre équilibré de
                      mâles et de femelles.
                    </Text>
                  </View>
                  <View
                    style={tw`h-6 w-6 ${
                      tournamentOption === 'Mix' ? 'bg-primary' : 'bg-white'
                    } opacity-80 rounded-full`}
                  />
                </Pressable>
                <Pressable
                  disabled
                  onPress={() => setTournamentOption('Team')}
                  style={tw`flex flex-row items-center gap-4 pb-3 opacity-80`}>
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-white`}>Americano - Par équipes</Text>
                    <Text style={tw`text-white text-xs`}>
                      Chaque équipe affrontera l’équipe adverse une fois.
                      Parfait si vous avez déjà assigné les équipes.
                    </Text>
                  </View>
                  <View
                    style={tw`h-6 w-6 ${
                      tournamentOption === 'Team' ? 'bg-primary' : 'bg-white'
                    } opacity-80 rounded-full`}
                  />
                </Pressable>
              </View>
            )}
            <Text style={tw`text-white mt-4 mb-1`}>Point par tour</Text>
            <SegmentedControl
              values={['8', '16', '21', '24', '32', '40']}
              onValueChange={setPoints}
              selectedIndex={0}
              style={tw`border border-white`}
              tintColor={tw.color('primary')}
              fontStyle={tw`text-white`}
            />
            <Text style={tw`text-white mt-4 mb-1`}>Joueurs</Text>
            <Pressable
              onPress={handleClickToggleSelectPlayers}
              style={tw`bg-orange-dark/80 rounded-xl border border-white px-4 py-3`}>
              <Text style={tw`text-white`}>
                {selectedPlayerIds.length > 0
                  ? `${selectedPlayerIds.length} joueur(s) choisi(s)`
                  : 'Choisissez les joueurs...'}
              </Text>
            </Pressable>
            <View style={tw`gap-3 mt-6`}>
              <Pressable
                style={tw`bg-primary rounded-xl py-3 items-center`}
                onPress={handleClickNext}>
                <Text style={tw`text-white font-semibold uppercase`}>
                  Valider
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      )}
    </ImageBackground>
  );
};

export default CreateChooseTypeScreen;
