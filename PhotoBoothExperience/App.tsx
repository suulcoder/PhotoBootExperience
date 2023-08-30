/**
 * Start Activity App
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Image,
  Text,
  View,
  StyleSheet,
  Animated,
} from 'react-native';
import { Dimensions } from 'react-native';
import {
  useCameraDevices,
} from 'react-native-vision-camera';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import {
  Camera,
} from 'react-native-vision-camera';
import TrackPlayer from 'react-native-track-player';
import { setupPlayer, addTrack } from './musicController';
import Spinner from 'react-native-loading-spinner-overlay';

function App(): JSX.Element {
  const step = React.useRef(new Animated.Value(0)).current
  const takenPhotos = React.useRef(new Animated.Value(0)).current
  const photos = []
  const counter = React.useRef(new Animated.Value(6)).current
  const [_, setHasPermission] = React.useState(false);
  const devices = useCameraDevices();
  const device = devices.front;
  const camera = React.useRef<Camera>(null)

  const _step = 0
  step.addListener(({value}) => _step);
  const _takenPhotos = 0
  takenPhotos.addListener(({value}) => _step);
  const _counter = 0
  counter.addListener(({value}) => _counter);

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  React.useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();
      await addTrack();
    }
    setup();
  }, []);

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  async function PictureSequence() {
    photos.push(camera.current!=null ? await camera.current.takePhoto({
      flash: 'on' 
    }) : null)
  }

  function takePicture(){
    PictureSequence()
  };

  const backgroundStyle = {
    backgroundColor: Colors.lighter,
  };

  function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  const sequence =  Animated.sequence([
    //Preparation
    Animated.timing(step, {
      toValue: 1,
      duration: 1,
      useNativeDriver: true,
    }),
    Animated.timing(takenPhotos, {
      toValue: 0,
      duration: 1,
      useNativeDriver: true,
    }),
    Animated.delay(790),
    Animated.timing(counter, {
      toValue: 5,
      duration: 1,
      useNativeDriver: true,
    }),
    Animated.delay(790),
    Animated.timing(counter, {
      toValue: 4,
      duration: 1,
      useNativeDriver: true,
    }),
    Animated.delay(790),
    Animated.timing(counter, {
      toValue: 3,
      duration: 1,
      useNativeDriver: true,
    }),
    Animated.delay(790),
    Animated.timing(counter, {
      toValue: 2,
      duration: 1,
      useNativeDriver: true,
    }),
    Animated.delay(790),
    Animated.timing(counter, {
      toValue: 1,
      duration: 1,
      useNativeDriver: true,
    }),
    //take picture here
    Animated.timing(takenPhotos, {
      toValue: 1,
      duration: 1,
      useNativeDriver: true,
    }),
    Animated.timing(counter, {
      toValue: 5,
      duration: 1,
      useNativeDriver: true,
    }),
    Animated.delay(790),
    Animated.timing(counter, {
      toValue: 4,
      duration: 1,
      useNativeDriver: true,
    }),
    Animated.delay(790),
    Animated.timing(counter, {
      toValue: 3,
      duration: 1,
      useNativeDriver: true,
    }),
    Animated.delay(790),
    Animated.timing(counter, {
      toValue: 2,
      duration: 1,
      useNativeDriver: true,
    }),
    Animated.delay(790),
    Animated.timing(counter, {
      toValue: 1,
      duration: 1,
      useNativeDriver: true,
    }),
    //take picture here
    Animated.timing(takenPhotos, {
      toValue: 2,
      duration: 1,
      useNativeDriver: true,
    }),
    Animated.timing(counter, {
      toValue: 6,
      duration: 1,
      useNativeDriver: true,
    }),
    Animated.delay(790),
    Animated.timing(counter, {
      toValue: 5,
      duration: 1,
      useNativeDriver: true,
    }),
    Animated.delay(790),
    Animated.timing(counter, {
      toValue: 4,
      duration: 1,
      useNativeDriver: true,
    }),
    Animated.delay(790),
    Animated.timing(counter, {
      toValue: 3,
      duration: 1,
      useNativeDriver: true,
    }),
    Animated.delay(790),
    Animated.timing(counter, {
      toValue: 2,
      duration: 1,
      useNativeDriver: true,
    }),
    Animated.delay(790),
    Animated.timing(counter, {
      toValue: 1,
      duration: 1,
      useNativeDriver: true,
    }),
    //take picture here
    Animated.timing(takenPhotos, {
      toValue: 3,
      duration: 1,
      useNativeDriver: true,
    }),
    Animated.timing(counter, {
      toValue: 7,
      duration: 1,
      useNativeDriver: true,
    }),
    Animated.delay(790),
    Animated.timing(counter, {
      toValue: 6,
      duration: 1,
      useNativeDriver: true,
    }),
    Animated.delay(790),
    Animated.timing(counter, {
      toValue: 5,
      duration: 1,
      useNativeDriver: true,
    }),
    Animated.delay(790),
    Animated.timing(counter, {
      toValue: 4,
      duration: 1,
      useNativeDriver: true,
    }),
    Animated.delay(790),
    Animated.timing(counter, {
      toValue: 3,
      duration: 1,
      useNativeDriver: true,
    }),
    Animated.delay(790),
    Animated.timing(counter, {
      toValue: 2,
      duration: 1,
      useNativeDriver: true,
    }),
    Animated.delay(790),
    Animated.timing(counter, {
      toValue: 1,
      duration: 1,
      useNativeDriver: true,
    }),
    //take picture here
    Animated.timing(takenPhotos, {
      toValue: 4,
      duration: 1,
      useNativeDriver: true,
    }),
    Animated.delay(8000),
    Animated.timing(step, {
      toValue: 2,
      duration: 1,
      useNativeDriver: true,
    }),
    Animated.delay(8000),
    Animated.timing(step, {
      toValue: 3,
      duration: 1,
      useNativeDriver: true,
    }),
  ])

  function onStart() {
    TrackPlayer.play();
    console.log(sequence);
    sequence.start()
  }

  function onStop() {
    sequence.stop()
    Animated.timing(takenPhotos, {
      toValue: 0,
      duration: 1,
      useNativeDriver: true,
    }).start(),
    Animated.timing(step, {
      toValue: 0,
      duration: 1,
      useNativeDriver: true,
    }).start(),
    TrackPlayer.pause();
    async function set() {
      await addTrack();
    }
    set();
    TrackPlayer.skipToNext();
  }

  return (
     Math.floor(_step)===0 ?
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
                marginBottom: 50,
                fontFamily: 'Roboto',
                textAlign: 'center'
              }}>
              {'ZACK STEAM Y STARBUCKS'}
            </Text>
            <TouchableOpacity
              onPress={onStart}
              style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: Colors.black,
                borderColor: Colors.black,
                borderWidth: 3,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 18,
                  textAlign: 'center',
                  fontFamily: 'Roboto',
                  padding: 8,
                  width: 200, 
                  height: 44,
                }}
              >
                {'Start Photobooth'}
              </Text>
              <Image 
                source={require('./public/photo.png')}
                style={{
                  padding: 10,
                  width: 44, 
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  height: 44,
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                marginBottom: 100,
              }}
            >
            </View>
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
      </SafeAreaView> :
      Math.floor(_step) === 1 ?
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
                {(device != null) && 
                <Camera
                  ref={camera}
                  photo={true}
                  style={StyleSheet.absoluteFill}
                  device={device}
                  isActive={true}
                />
                }
            </View>
            <View
              style={{
                bottom: 0,
                padding: 75,
                position: 'absolute',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'center'
              }}
            >
              <View
                style={{
                  width: 115,
                  height: 115,
                  borderRadius: 100,
                  borderColor: Colors.white,
                  borderWidth: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                    height: 100,
                    padding: 20,
                    width: 100,
                    backgroundColor: Colors.white,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'Roboto',
                      color: Colors.black,
                      fontSize: 16,
                      marginTop: 10,
                      lineHeight: 16,
                      fontWeight: 'bold',
                    }}
                  >
                    {'Next in'}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Roboto',
                      color: Colors.black,
                      fontSize: 40,
                      lineHeight: 40,
                      fontWeight: 'bold',
                    }}
                  >
                    {Math.floor(_counter)}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
                onPress={onStop}
                style={{
                  position: 'absolute',
                  bottom: 110,
                  right: 75,
                }}
                >
                  <Image 
                    source={require('./public/back_arrow.png')}
                    style={{
                      width: 40, 
                      height: 40,
                    }}
                  />
              </TouchableOpacity>

            <View
                style={{
                  position: 'absolute',
                  bottom: 110,
                  left: 75,
                }}
                >
                  <Text
                    style={{
                      backgroundColor: Colors.black,
                      color: Colors.white,
                      fontSize: 20,
                      borderRadius: 10,
                      lineHeight:32,
                      textAlign: 'center',
                      width: 40, 
                      height: 40,
                    }}>{Math.floor(_takenPhotos)}</Text>
              </View>
        </SafeAreaView> :
        Math.floor(_step) === 2 ?
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <Spinner
            visible={true}
            textContent={'Generating...'}
            size={'large'}
            textStyle={{
              color: Colors.white,
              fontFamily: 'Roboto',
            }}
            indicatorStyle={{
              backgroundColor: Colors.black
            }}
            color = "white"
          />
        </SafeAreaView>
        : 
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          
        </SafeAreaView>
     )
}

export default App;
