import React from 'react';
import tw from '@/lib/tw';
import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

type ButtonProps = PressableProps & {
  title: string;
  small?: boolean;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  outlined?: boolean;
  rounded?: boolean;
  color?: string;
  leftIcon?: any;
  mini?: boolean;
  textStyle?: StyleProp<TextStyle>;
};

const Button = ({
  title,
  small,
  style,
  disabled,
  loading,
  onPress,
  outlined,
  rounded,
  leftIcon,
  mini,
  color,
  textStyle,
  ...props
}: ButtonProps) => {
  const handlePress = (e: any) => {
    ReactNativeHapticFeedback.trigger('impactHeavy');
    if (onPress) {
      onPress(e);
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        tw.style(
          `bg-${
            color ? `[${color}]` : 'primary'
          } rounded-full shadow-lg shadow-${
            color ? `[${color}]` : 'primary'
          } justify-center px-6 py-3 items-center border-2 border-${
            color ? `[${color}]` : 'primary'
          }`,
          {
            'py-1.6': !!small,
            'py-0.6': !!mini,
            'opacity-90': pressed,
            'opacity-70': !!disabled || !!loading,
            'bg-transparent shadow-none': !!outlined,
            'rounded-full px-6': !!rounded,
          },
        ),
        style,
      ]}
      onPress={loading || disabled ? () => {} : handlePress}
      {...props}>
      {loading ? (
        <ActivityIndicator
          color={outlined ? color || tw.color('primary') : tw.color('black')}
          size="small"
        />
      ) : (
        <View style={tw`flex-row items-center justify-center`}>
          {!!leftIcon && (
            <Image
              style={tw`h-6 w-6 tint-black mr-2`}
              resizeMode="contain"
              source={leftIcon}
            />
          )}
          <Text
            numberOfLines={1}
            style={[
              tw.style('text-secondary font-bold', {
                [`text-${color ? `[${color}]` : 'primary'}`]: !!outlined,
                'text-xs font-semibold': !!mini,
                '-mb-1': Platform.OS === 'android',
              }),
              textStyle,
            ]}>
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default Button;
