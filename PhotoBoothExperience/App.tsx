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

const purple = '#6D27A2'

function App(): JSX.Element {
  const backgroundStyle = {
    backgroundColor: Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
        <View
          style={{
            alignItems: 'center',
            backgroundColor: Colors.white,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center'
          }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'center'
              }}
            >
              <Image 
                source={require('./public/starbucks.png')}
                style={
                  {
                    width: 250, 
                    height: 250,
                    marginTop: 20,
                    marginBottom: 40,
                  }
                }
              />
            </View>
            <Text
              style={{
                color: Colors.black,
                fontSize: 40,
                fontWeight: 'bold',
                fontFamily: 'Roboto',
                textAlign: 'center'
              }}>
              {'CREA RECUERDOS CON'}
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontSize: 32,
                fontWeight: 'bold',
                marginBottom: 180,
                fontFamily: 'Roboto',
                textAlign: 'center'
              }}>
              {'ZACK STEAM Y STARBUCKS'}
            </Text>
        </View>
        <Image 
              source={require('./public/qr.png')}
              style={{
                width: 80, 
                height: 80,
                bottom: 75,
                right: Dimensions.get('window').width/2 - 40, 
                position: 'absolute'
              }}
            />
    </SafeAreaView>
  );
}

export default App;
