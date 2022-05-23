import * as React from 'react';
import {
  Appbar,
  Provider as PaperProvider
} from 'react-native-paper';
import {
  NavigationContainer
} from '@react-navigation/native';
import {
  createNativeStackNavigator
} from '@react-navigation/native-stack';
import {
  Dashboard
} from './components/dashboard';
import {
  userData
} from './components/utils';
import LoginScreen from './components/login';
import { observer } from 'mobx-react';

const Stack = createNativeStackNavigator();

function CustomHeaderBar({navigation,back}:any) {
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="Accademica" />
    </Appbar.Header>
  )
}

const App = observer(() => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          header: (props:any)=> <CustomHeaderBar {...props} />,
        }}>
        {userData.data ? (
          <>
            <Stack.Screen name='Dashboard' component={Dashboard} />
          </>
        ):(
          <>
            <Stack.Screen name='Login' component={LoginScreen} />
          </>
        )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
})

export default App