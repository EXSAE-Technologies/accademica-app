import * as React from 'react';
import {
  Provider as PaperProvider
} from 'react-native-paper';
import {
  NavigationContainer
} from '@react-navigation/native';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <View>
          <Text>Open up App.tsx to start working on your app!</Text>
        </View>
      </NavigationContainer>
    </PaperProvider>
  );
}