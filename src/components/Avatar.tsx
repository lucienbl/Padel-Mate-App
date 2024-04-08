import { Text, View } from 'react-native';
import tw from '@/lib/tw.ts';
import React from 'react';

type AvatarProps = {
  name?: string;
  size: number;
  withBorder?: boolean;
};

const Avatar = ({ name, size, withBorder }: AvatarProps) => {
  return (
    <View
      style={tw`items-center justify-center h-${size} w-${size} rounded-full bg-white ${
        withBorder ? 'border-4 border-black' : ''
      }`}>
      <Text style={tw`font-bold text-secondary text-[${size * 1.8}px]`}>
        {name?.[0]}
      </Text>
    </View>
  );
};

export default Avatar;
