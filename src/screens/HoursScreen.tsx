import React, { useState } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import tw from '@/lib/tw';

type HoursScreenProps = {};

const Switch = () => {
  const [status, setStatus] = useState(false);

  return (
    <Pressable
      onPress={() => setStatus(!status)}
      style={tw`flex-1 flex-row bg-neutral-100 rounded-xl overflow-hidden`}>
      <View
        style={tw.style('flex-1 px-2 py-3 items-center justify-center', {
          'bg-secondary rounded-xl': status,
        })}>
        <Text
          style={tw.style('font-semibold text-neutral-500', {
            'text-primary': status,
          })}>
          OUI
        </Text>
      </View>
      <View
        style={tw.style('flex-1 px-2 py-3 items-center justify-center', {
          'bg-secondary rounded-xl': !status,
        })}>
        <Text
          style={tw.style('font-semibold text-neutral-500', {
            'text-primary': !status,
          })}>
          NON
        </Text>
      </View>
    </Pressable>
  );
};

const HoursScreen = ({}: HoursScreenProps) => {
  return (
    <View style={tw`flex-1 bg-primary`}>
      <Text style={tw`text-white font-semibold text-center mt-6`}>
        Tes disponibilités
      </Text>
      <FlatList
        data={[{}, {}]}
        numColumns={2}
        style={tw`px-3 py-4`}
        columnWrapperStyle={tw`gap-3`}
        contentContainerStyle={tw`gap-3`}
        renderItem={({ item }) => (
          <View style={tw`flex-1 bg-white rounded-xl p-4 relative shadow-lg`}>
            <Text style={tw`text-xs font-semibold`}>Mardi 12 février 2024</Text>
            <Text style={tw`text-[10px] text-neutral-500 font-semibold`}>
              Match amical à LIEU
            </Text>
            <View style={tw`my-3 flex-row gap-2 items-center`}>
              <Image
                style={tw`tint-neutral-500 h-4 w-4`}
                resizeMode="contain"
                source={require('@/assets/images/img_icon_clock.png')}
              />
              <Text style={tw`text-neutral-500 text-[10px] font-semibold`}>
                18:30 - 19:00
              </Text>
            </View>
            <View
              style={tw`bg-primary absolute -top-1 right-0 rounded py-1 px-1.5`}>
              <Text style={tw`text-[9px] font-semibold text-secondary`}>
                Attribution dans 48h23min.
              </Text>
            </View>
            <Switch />
          </View>
        )}
      />
    </View>
  );
};

export default HoursScreen;
