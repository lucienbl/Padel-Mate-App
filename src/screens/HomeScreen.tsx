import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import tw from '@/lib/tw';
import dayjs from 'dayjs';
import { useMe } from '@/services/users';
import { NavigationService, screenIds } from '@/navigation';
import { useTournaments } from '@/services/tournaments/getTournaments.ts';

type CalendarScreenProps = {};

const CalendarScreen = ({}: CalendarScreenProps) => {
  const { data: me } = useMe({});
  const { data: tournaments } = useTournaments({});

  return (
    <View style={tw`flex-1 bg-white px-4`}>
      <View style={tw`p-4 flex-row justify-between`}>
        <View
          style={tw`bg-neutral-100 rounded-lg items-end justify-center p-4 aspect-video`}
        />
        <Pressable
          onPress={() => NavigationService.navigate(screenIds.SCREEN_PROFILE)}
          style={tw`flex-row gap-2`}>
          <View>
            <Text style={tw`text-right text-neutral-400`}>Salut,</Text>
            <Text style={tw`text-right text-lg text-neutral-400 -mt-1`}>
              {me?.firstName}
            </Text>
          </View>
          <View style={tw`h-16 w-16 bg-neutral-100 rounded-full`} />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={tw`pb-4`}>
        <Text
          style={tw`text-2xl text-neutral-100 font-semibold ml-12 mt-4 -mb-1`}>
          {dayjs().format('MMMM YYYY')}
        </Text>
        <View style={tw`rounded-lg bg-neutral-100 p-4`}>
          <View style={tw`flex-row justify-between px-4`}>
            {new Array(7).fill(null).map((_, index) => (
              <View style={tw`items-center justify-center gap-1`} key={index}>
                <Text style={tw`text-xs text-neutral-400`}>
                  {dayjs().add(index, 'days').format('dd')}
                </Text>
                <Text style={tw`text-neutral-500 font-semibold`}>
                  {dayjs().add(index, 'days').format('DD')}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View style={tw`mt-4`}>
          <Text style={tw`uppercase text-xs text-neutral-500 mb-1`}>
            Mes parties
          </Text>
          <Pressable
            style={tw`flex-row justify-between bg-neutral-100 rounded-lg border border-neutral-300 px-2 py-1 items-center gap-4`}>
            <View style={tw`flex-1`} />
            <Text style={tw`uppercase text-neutral-500 font-light`}>
              Mes parties
            </Text>
            <View
              style={tw`h-8 w-8 rounded-full bg-cyan-500 items-center justify-center`}>
              <Text style={tw`text-lg text-white font-semibold text-center`}>
                0
              </Text>
            </View>
          </Pressable>
          <Pressable
            style={tw`mt-2 flex-row justify-between bg-neutral-100 rounded-lg border border-neutral-300 px-2 py-1 items-center gap-4`}>
            <View style={tw`flex-1`} />
            <Text style={tw`uppercase text-neutral-500 font-light`}>
              Mes tournois
            </Text>
            <View
              style={tw`h-8 w-8 rounded-full bg-orange-500 items-center justify-center`}>
              <Text style={tw`text-lg text-white font-semibold text-center`}>
                {tournaments?.length ?? 0}
              </Text>
            </View>
          </Pressable>
        </View>
        <View style={tw`mt-4`}>
          <Text style={tw`uppercase text-xs text-neutral-500 mb-1`}>
            Mes groupes
          </Text>
          <View style={tw`rounded-lg bg-neutral-100 h-32 mt-1`} />
        </View>
        <View style={tw`mt-4`}>
          <Text style={tw`uppercase text-xs text-neutral-500 mb-1`}>News</Text>
          <View style={tw`rounded-lg bg-neutral-100 h-24 mt-1`} />
          <View style={tw`rounded-lg bg-neutral-100 h-8 mt-2`} />
        </View>
      </ScrollView>
    </View>
  );
};

export default CalendarScreen;
