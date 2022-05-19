import * as React from 'react';
import {
  Appbar,
  Provider as PaperProvider
} from 'react-native-paper';
import {
  NavigationContainer
} from '@react-navigation/native';
import { 
  View,
  Text
} from 'react-native';
import {
  createNativeStackNavigator
} from '@react-navigation/native-stack';
import {
  Dashboard
} from './components/dashboard';

const Stack = createNativeStackNavigator();

function CustomHeaderBar({navigation,back}:any) {
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="Accademica" />
    </Appbar.Header>
  )
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          header: (props:any)=> <CustomHeaderBar {...props} />,
        }}>
          <Stack.Screen name='Dashboard' component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}