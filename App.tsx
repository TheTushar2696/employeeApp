import React from 'react';

import {StatusBar, useColorScheme} from 'react-native';

import RootNavigator from './src/navigator/RootNavigator';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RootNavigator />
    </>
  );
}

export default App;
