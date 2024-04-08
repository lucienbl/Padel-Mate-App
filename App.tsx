import React from 'react';
import { useDeviceContext } from 'twrnc';
import tw from '@/lib/tw';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { RootNavigator } from '@/navigation';
import { navigationRef } from '@/navigation/NavigationService.ts';
import AuthProvider from '@/contexts/Auth.tsx';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '@/lib/react-query.ts';

const App = () => {
  useDeviceContext(tw);

  return (
    <GestureHandlerRootView style={tw`flex-1`}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <NavigationContainer ref={navigationRef}>
              <StatusBar barStyle="light-content" />
              <RootNavigator />
            </NavigationContainer>
          </AuthProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
