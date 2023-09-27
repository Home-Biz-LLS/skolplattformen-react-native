/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

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
  Header,
  // LearnMoreLinks,
  // ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Login} from './components/login.component';
// import {ApiProvider, Reporter} from './libs/hooks/src';
import {ApiProvider} from './libs/hooks/src';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FeatureProvider} from './context/feature/featureContext';
import initSkolplattformen, {
  features as featuresSkolPlattformen,
} from './libs/api-skolplattformen/lib';
import CookieManager from '@react-native-cookies/cookies';

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
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}>
            {/* <Header /> */}
            <View
              style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
              }}>
              <Login />
              {/* <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks /> */}
            </View>
          </ScrollView>
        </SafeAreaView>
      </ApiProvider>
    </FeatureProvider>
  );
}

export default App;
