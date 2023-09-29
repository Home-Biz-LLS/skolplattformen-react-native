/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as eva from '@eva-design/eva';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  // StyleSheet,
  // Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  // DebugInstructions,
  // LearnMoreLinks,
  // ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {AppNavigator} from './components/navigation.component';
// import {ApiProvider, Reporter} from './libs/hooks/src';
import {ApiProvider} from './libs/hooks/src';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FeatureProvider} from './context/feature/featureContext';
import {ApplicationProvider} from '@ui-kitten/components';
import initSkolplattformen, {
  features as featuresSkolPlattformen,
} from './libs/api-skolplattformen/lib';
import CookieManager from '@react-native-cookies/cookies';
// import {LanguageProvider} from './context/language/languageContext';
// import {translations} from './utils/translation';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const platform = {
    id: 'stockholm-skolplattformen',
    displayName: 'Stockholms stad (Skolplattformen)',
    api: initSkolplattformen(fetch as any, CookieManager),
    features: featuresSkolPlattformen,
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <FeatureProvider features={platform.features}>
      <ApiProvider api={platform.api} storage={AsyncStorage}>
        <ApplicationProvider
          {...eva}
          // @ts-expect-error Unknown error
          // customMapping={customMapping}
          theme={eva.light}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          {/* <LanguageProvider cache={true} data={translations}> */}
          <AppNavigator />
          {/* </LanguageProvider> */}
        </ApplicationProvider>
      </ApiProvider>
    </FeatureProvider>
  );
}

export default App;
