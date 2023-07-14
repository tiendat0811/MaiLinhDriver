import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import Navigator from './src/navigation/navigation';
import {AuthProvider} from './src/contexts/AuthContext';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
