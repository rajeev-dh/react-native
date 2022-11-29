import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AppUpdate from './src/screens/AppUpdate';
// import Auth from './src/screens/Auth';
import Home from './src/screens/Home';
import Tour from './src/screens/Tour';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AppUpdate">
        <Stack.Screen
          name="AppUpdate"
          component={AppUpdate}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen name="Auth" component={Auth} /> */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Tour" component={Tour} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
