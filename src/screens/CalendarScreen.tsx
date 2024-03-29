import React from 'react';
import { ImageBackground, ScrollView, Text, View } from 'react-native';
import tw from '@/lib/tw';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';

type CalendarScreenProps = {};

const CalendarScreen = ({}: CalendarScreenProps) => {
  return (
    <View style={tw`flex-1 bg-black px-2`}>
      <ScrollView contentContainerStyle={tw`gap-2 pb-4`}>
        <View style={tw`rounded-lg bg-white overflow-hidden py-4`}>
          <Calendar
            enableSwipeMonths
            current={new Date().toISOString()}
            style={tw`px-4`}
            firstDay={1}
            markedDates={{
              [dayjs().add(5, 'days').format('YYYY-MM-DD')]: {
                dots: [{ color: tw.color('secondary') ?? 'black' }],
              },
            }}
            markingType={'multi-dot'}
            theme={{
              todayBackgroundColor: tw.color('primary'),
              todayTextColor: 'white',
              selectedDayBackgroundColor: '#333248',
            }}
            hideArrows
            renderHeader={date => (
              <View style={tw`flex-1`}>
                <Text style={tw`text-neutral-400 text-sm text-center mb-2`}>
                  {dayjs(date).format('MMMM YYYY')}
                </Text>
                <Text style={tw`font-semibold text-left mb-4`}>
                  Ton planning
                </Text>
              </View>
            )}
          />
        </View>
        <View style={tw`rounded-lg bg-white overflow-hidden pt-4`}>
          <View style={tw`flex-row`}>
            <View style={tw`bg-secondary py-2 px-4`}>
              <Text style={tw`text-white font-bold`}>
                {dayjs().add(5, 'days').format('dddd DD MMMM')} à 18h30
              </Text>
            </View>
            <View style={tw`flex-1 bg-primary items-center justify-center`}>
              <Text>Actions</Text>
            </View>
          </View>
          <Text style={tw`text-secondary mx-4 my-2`}>
            Match amical à Nom du lieu
          </Text>
          <ImageBackground
            source={require('@/assets/images/img_field_background.png')}>
            <View
              style={tw`absolute top-0 right-0 left-0 items-center justify-center`}>
              <View style={tw`bg-white px-3 py-1 rounded-b-xl`}>
                <Text style={tw`text-xs text-secondary`}>
                  Terrain : Daiblo n°6
                </Text>
              </View>
            </View>
            <View style={tw`flex-row flex-wrap h-54 pt-6`}>
              <View style={tw`w-1/2 h-1/2 items-center justify-center`}>
                <View
                  style={tw`h-12 w-12 border-2 border-white rounded-full`}
                />
                <Text style={tw`text-white mt-2 font-bold`}>Toi</Text>
              </View>
              <View style={tw`w-1/2 h-1/2 items-center justify-center`}>
                <View
                  style={tw`h-12 w-12 border-2 border-white rounded-full`}
                />
                <Text style={tw`text-white mt-2 font-bold`}>Toi</Text>
              </View>
              <View style={tw`w-1/2 h-1/2 items-center justify-center`}>
                <View
                  style={tw`h-12 w-12 border-2 border-white rounded-full`}
                />
                <Text style={tw`text-white mt-2 font-bold`}>Toi</Text>
              </View>
              <View style={tw`w-1/2 h-1/2 items-center justify-center`}>
                <View
                  style={tw`h-12 w-12 border-2 border-white rounded-full`}
                />
                <Text style={tw`text-white mt-2 font-bold`}>Toi</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </View>
  );
};

export default CalendarScreen;
