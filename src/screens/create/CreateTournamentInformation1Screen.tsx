import React, { useMemo, useState } from 'react';
import { FlatList, ImageBackground, Pressable, Text, View } from 'react-native';
import tw from '@/lib/tw.ts';
import { NavigationService, screenIds } from '@/navigation';
import { RouteProp } from '@react-navigation/native';
import dayjs from 'dayjs';
import { Calendar } from 'react-native-calendars';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useClubs } from '@/services/clubs/getClubs.ts';

type CreateChoseTypeScreenProps = {
  route: RouteProp<any>;
};

const CreateChooseTypeScreen = ({ route }: CreateChoseTypeScreenProps) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format('YYYY-MM-DD'),
  );
  const [selectedStartHour, setSelectedStartHour] = useState<Date | undefined>(
    new Date(),
  );
  const [selectedEndHour, setSelectedEndHour] = useState<Date | undefined>(
    new Date(),
  );

  const [selectedFieldIds, setSelectedFieldIds] = useState<string[]>([]);
  const [selectFields, setSelectFields] = useState(false);
  const { data: clubs } = useClubs({});

  const handleClickNext = () => {
    NavigationService.navigate(
      screenIds.SCREEN_CREATE_TOURNAMENT_INFORMATION_2,
      {
        selectedClubId: route.params?.selectedClubId,
        selectedDate,
        selectedStartHour: selectedStartHour?.toISOString(),
        selectedEndHour: selectedEndHour?.toISOString(),
        selectedFieldIds,
      },
    );
  };

  const handleClickToggleSelectFields = () => {
    setSelectFields(!selectFields);
  };

  const marked = useMemo(() => {
    return {
      [dayjs(selectedDate).format('YYYY-MM-DD')]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: tw.color('primary'),
        selectedTextColor: 'white',
      },
    };
  }, [selectedDate]);

  return (
    <ImageBackground
      style={tw`flex-1`}
      source={require('@/assets/images/img_bg_tournament.png')}>
      <View style={tw`flex-1 bg-orange-dark/70 px-6 pt-20 pb-6`}>
        {selectFields ? (
          <>
            <Text style={tw`text-white mt-4 mb-1`}>
              Sélectionnez vos terrains
            </Text>
            <FlatList
              style={tw`my-4`}
              data={
                clubs.find(
                  (club: any) => club.id === route.params?.selectedClubId,
                )?.fields ?? []
              }
              renderItem={({ item: field }) => (
                <Pressable
                  onPress={() => {
                    if (selectedFieldIds.includes(field.id)) {
                      setSelectedFieldIds(
                        selectedFieldIds.filter(
                          fieldId => fieldId !== field.id,
                        ),
                      );
                    } else {
                      setSelectedFieldIds([...selectedFieldIds, field.id]);
                    }
                  }}
                  style={tw`bg-orange-dark/80 rounded-lg px-4 py-2 border-2 mb-2 ${
                    selectedFieldIds.includes(field.id)
                      ? 'border-primary'
                      : 'border-orange-dark/80'
                  }`}>
                  <Text style={tw`text-white font-semibold`}>{field.name}</Text>
                </Pressable>
              )}
            />
            <View style={tw`gap-3 mt-6`}>
              <Pressable
                style={tw`bg-primary rounded-xl py-3 items-center`}
                onPress={handleClickToggleSelectFields}>
                <Text style={tw`text-white font-semibold uppercase`}>
                  Valider
                </Text>
              </Pressable>
            </View>
          </>
        ) : (
          <>
            <Text style={tw`font-semibold text-lg text-white`}>
              Votre nouveau tournoi
            </Text>
            <Text style={tw`text-white`}>Quelques détails à compléter...</Text>
            <Text style={tw`text-white mt-4 mb-1`}>
              Choisissez une date du tournoi
            </Text>
            <Calendar
              enableSwipeMonths
              style={tw`px-4 bg-orange-dark/80 rounded-xl border border-white`}
              onDayPress={date => setSelectedDate(date.dateString)}
              firstDay={1}
              markedDates={marked}
              markingType={'multi-dot'}
              theme={{
                calendarBackground: 'transparent',
                dayTextColor: 'white',
              }}
              hideArrows
              renderHeader={date => (
                <View style={tw`flex-1`}>
                  <Text style={tw`text-white/40 text-xl font-bold text-center`}>
                    {dayjs(date).format('MMMM YYYY')}
                  </Text>
                </View>
              )}
            />
            <Text style={tw`text-white mt-4 mb-1`}>Choisissez une heure</Text>
            <View
              style={tw`flex-row items-center bg-orange-dark/80 rounded-xl border border-white px-4 py-3`}>
              <View style={tw`flex-1 items-center justify-center`}>
                <Text style={tw`text-white`}>Début</Text>
                <RNDateTimePicker
                  style={tw`h-12`}
                  mode="time"
                  themeVariant="dark"
                  onChange={(_, date) => setSelectedStartHour(date)}
                  value={selectedStartHour ?? new Date()}
                />
              </View>
              <View style={tw`flex-1 items-center justify-center`}>
                <Text style={tw`text-white`}>Fin</Text>
                <RNDateTimePicker
                  style={tw`h-12`}
                  mode="time"
                  themeVariant="dark"
                  onChange={(_, date) => setSelectedEndHour(date)}
                  value={selectedEndHour ?? new Date()}
                />
              </View>
            </View>
            <Text style={tw`text-white mt-4 mb-1`}>
              Choisissez vos terrains
            </Text>
            <Pressable
              onPress={handleClickToggleSelectFields}
              style={tw`bg-orange-dark/80 rounded-xl border border-white px-4 py-3`}>
              <Text style={tw`text-white`}>
                {selectedFieldIds.length > 0
                  ? `${selectedFieldIds.length} terrain(s) choisi(s)`
                  : 'Choisissez les terrains...'}
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
          </>
        )}
      </View>
    </ImageBackground>
  );
};

export default CreateChooseTypeScreen;
