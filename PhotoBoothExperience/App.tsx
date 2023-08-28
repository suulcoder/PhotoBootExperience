/**
 * Start Activity App
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Dimensions } from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
        <View
          style={{
            alignItems: 'center',
            backgroundColor: Colors.black,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center'
          }}>
            <Image 
              source={require('./public/photo_logo.png')}
              style={
                {width: 250, height: 250}
              }
            />
            <Text
              style={{
                color: '#6500ff',
                fontSize: 24,
                fontWeight: '600',
                marginBottom: 100,
                fontFamily: 'Baskerville',
                textAlign: 'center'
              }}>
              {'CREA RECUERDOS CON\n ZACK STEAM Y STARBUCKS'}
            </Text>
        </View>
        <Image 
              source={require('./public/qr.png')}
              style={{
                width: 100, 
                height: 100,
                bottom: 150,
                right: Dimensions.get('window').width/2 - 50, 
                position: 'absolute'
              }}
            />
    </SafeAreaView>
  );
}

export default App;
