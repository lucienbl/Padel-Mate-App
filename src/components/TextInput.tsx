import React, { type PropsWithChildren } from 'react';
import {
  Platform,
  TextInput as BaseTextInput,
  TextInputProps as BaseTextInputProps,
  View,
} from 'react-native';
import tw from '@/lib/tw';

type TextInputProps = BaseTextInputProps &
  PropsWithChildren<{
    small?: boolean;
    editable?: boolean;
    error?: boolean;
    showBadge?: boolean;
  }>;

const TextInput = ({
  small,
  style,
  editable,
  error,
  showBadge,
  ...props
}: TextInputProps) => {
  return (
    <>
      <BaseTextInput
        style={[
          tw.style(
            'text-white px-6 py-4 rounded-xl',
            { 'py-2': !!small },
            { 'opacity-70': editable === false },
            { 'bg-red-100': !!error },
            { 'py-2': Platform.OS === 'android' },
            { 'py-1': !!small && Platform.OS === 'android' },
          ),
          style,
        ]}
        placeholderTextColor={
          error ? tw.color('red-400') : tw.color('white/60')
        }
        {...props}
      />
      {showBadge && (
        <View>
          <View
            style={tw`absolute -top-5 left-2 h-2 w-2 rounded-full bg-red-400`}
          />
        </View>
      )}
    </>
  );
};

export default TextInput;
