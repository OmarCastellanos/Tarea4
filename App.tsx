import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GameScreen from './screens/GameScreen';
/* import WinnerScreen from './screens/WinnerScreen'; */


const Stack = createStackNavigator();

const App =()=>{
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Game'>
          <Stack.Screen name='Game' component={GameScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;