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
  PhotoFile,
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
import RNRestart from 'react-native-restart';

function App(): JSX.Element {
  const [step, setStep] = React.useState(2);
  const [takenPhotos, setTakenPhotos] = React.useState(0);
  const [hasTakenPhotos, setHasTakenPhotos] = React.useState(false);
  const [counter, setCounter] = React.useState(6);
  const [showedText, setShowedText] = React.useState('');
  const [photos, setPhotos] = React.useState(new Array<PhotoFile>);
  const [photosCaches, setPhotosCaches] = React.useState(new Array<string>);
  const [_, setHasPermission] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const devices = useCameraDevices();
  const device = devices.front;
  const camera = React.useRef<Camera>(null)

  const [showFirstPic, setShowFirstPic] = React.useState(false);
  const [showSecondPic, setShowSecondPic] = React.useState(false);
  const [showThirdPic, setShowThirdPic] = React.useState(false);
  const [showFourthPic, setShowFourthPic] = React.useState(false);
  const [showSixthPic, setShowSixthPic] = React.useState(false);
  const [showSeventhPic, setShowSeventhPic] = React.useState(false);
  const [showEighthPic, setShowEighthPic] = React.useState(false);
  const [showNinethPic, setShowNinethPic] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  React.useEffect(() => {
    async function setup() {
      await setupPlayer();
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

  const backgroundStyle = {
    backgroundColor: Colors.lighter,
  };

  function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  function onStart() {
    TrackPlayer.play();
    
    setStep(1);

    async function PictureSequence() {
      if(camera.current!=null){
        camera.current.startRecording({
          onRecordingFinished: (video) => console.log(video),
          onRecordingError: (error) => console.error(error),
        })
      }
      setTakenPhotos(0)
      //Starting first picture                     
      setShowedText('¡Tienes 3 segundos para hacer la pose más loca!')
      await delay(790)
      setCounter(5)
      await delay(790)
      setCounter(4)
      await delay(790)
      setCounter(3)
      await delay(790)
      setCounter(2)
      await delay(790)
      setCounter(1)
      if(camera.current!=null){
        const my_photo = [await camera.current.takePhoto({
          flash: 'on' 
        })]
        setPhotos(my_photo)
      }
      setHasTakenPhotos(true)
      setTakenPhotos(1)

      //Taking Second Picture
      setShowedText('¡Tomemos una más!')
      setCounter(5)
      await delay(790)
      setCounter(4)
      await delay(790)
      setHasTakenPhotos(false)
      setCounter(3)
      await delay(790)
      setCounter(2)
      await delay(790)
      setCounter(1)
      if(camera.current!=null){
        const my_photo = [await camera.current.takePhoto({
          flash: 'on' 
        })]
        setPhotos(my_photo)
      }
      setHasTakenPhotos(true)
      setTakenPhotos(2)

      //Taking Third Picture
      setShowedText('¡Haz una pose diferente esta vez!')
      setCounter(6)
      await delay(790)
      setCounter(5)
      setHasTakenPhotos(false)
      await delay(790)
      setCounter(4)
      await delay(790)
      setCounter(3)
      await delay(790)
      setCounter(2)
      await delay(790)
      setCounter(1)
      if(camera.current!=null){
        const my_photo = [await camera.current.takePhoto({
          flash: 'on' 
        })]
        setPhotos(my_photo)
      }
      setHasTakenPhotos(true)
      setTakenPhotos(3)

      //Taking Fourth Picture

      setShowedText('¡Intenta bailar la canción!')
      setCounter(5)
      await delay(790)
      setCounter(4)
      setHasTakenPhotos(false)
      await delay(790)
      setCounter(3)
      await delay(790)
      setCounter(2)
      await delay(790)
      setCounter(1)
      if(camera.current!=null){
        const my_photo = [await camera.current.takePhoto({
          flash: 'on' 
        })]
        setPhotos(my_photo)
      }
      setHasTakenPhotos(true)
      setTakenPhotos(4)
      await delay(330)
      setHasTakenPhotos(false)

      await delay(170)
      setShowFirstPic(true)
      await delay(170)
      setShowSecondPic(true)
      await delay(170)
      setShowThirdPic(true)
      await delay(170)
      setShowFourthPic(true)
      await delay(170)
      setShowSixthPic(true)
      await delay(170)
      setShowSeventhPic(true)
      await delay(170)
      setShowEighthPic(true)
      await delay(420)
      setShowNinethPic(true)
      await delay(100)
      setShowSixthPic(false)
      await delay(100)
      setShowSeventhPic(false)
      await delay(100)
      setShowEighthPic(false)
      await delay(100)
      setShowNinethPic(false)
      await delay(100)

      setStep(2);
      if(camera.current!=null){
        const video = await camera.current.stopRecording()
        console.log(video)
      }

      await delay(8000)
      setStep(3);
      console.log(photosCaches)
    }

    PictureSequence()
  }

  function onPause(){
    if(paused){
      TrackPlayer.play();
      if(camera.current!=null){
        camera.current.resumeRecording()
      }
    } else {
      TrackPlayer.pause();
      if(camera.current!=null){
        camera.current.pauseRecording()
      }
    }
  }

  function onStop() {
    RNRestart.restart();
    // setTakenPhotos(0);
    // setStep(0);
    // TrackPlayer.pause();
    // async function set() {
    //   await addTrack();
    // }
    // set();
    // TrackPlayer.skipToNext();
  }


  function logTakenPhotos() {
    if(!photosCaches.includes('file://' + photos[0].path)){
      const photos_caches = photosCaches
      photosCaches.push('file://' + photos[0].path)
      setPhotosCaches(photos_caches)
    }
    return true
  }

  return (
      step===0 ?
      <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.white}
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
      step === 1 ?
      <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor={Colors.black}
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
            {
              hasTakenPhotos && logTakenPhotos() &&
              <Animated.Image 
                source={{uri: 'file://' + photos[0].path}}
                style={{
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').height,
                  bottom: 0,
                  left: 0,
                  position: 'absolute',
                }}
              />
            }
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
                    {counter}
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
                    }}>{takenPhotos}</Text>
            </View>
            { showFirstPic && <Image 
              //Right half IMG
              source={{uri: photosCaches[0]}}
              style={{
                width: Dimensions.get('window').width/2, 
                height: Dimensions.get('window').height,
                position: 'absolute',
                right: 0
              }}
            />}
            { showSecondPic && <Image 
              //Left half IMG
              source={{uri: photosCaches[1]}}
              style={{
                width: Dimensions.get('window').width/2, 
                height: Dimensions.get('window').height,
                position: 'absolute',
                left: 0
              }}
            />}
            { showThirdPic && <Image 
              //On top half img
              source={{uri: photosCaches[2]}}
              style={{
                width: Dimensions.get('window').width, 
                height: Dimensions.get('window').height/2,
                position: 'absolute',
                top: 0
              }}
            />}
            { showFourthPic && <Image 
              //On bottom half img
              source={{uri: photosCaches[3]}}
              style={{
                width: Dimensions.get('window').width, 
                height: Dimensions.get('window').height/2,
                position: 'absolute',
                top: Dimensions.get('window').width
              }}
            />}
            { showSixthPic && <Image 
              //Corner left top
              source={{uri: photosCaches[0]}}
              style={{
                width: Dimensions.get('window').width/2, 
                height: Dimensions.get('window').height/2,
                position: 'absolute',
                top: 0
              }}
            />}
            { showSeventhPic && <Image 
              //Corner right top
              source={{uri: photosCaches[1]}}
              style={{
                width: Dimensions.get('window').width/2, 
                height: Dimensions.get('window').height/2,
                position: 'absolute',
                top: 0,
                right: 0,
              }}
            />}
            { showEighthPic && <Image 
              //Corner right bottom
              source={{uri: photosCaches[2]}}
              style={{
                width: Dimensions.get('window').width/2, 
                height: Dimensions.get('window').height/2,
                position: 'absolute',
                top: Dimensions.get('window').height/2,
                right: 0,
              }}
            />}
            { showNinethPic && <Image 
              //Corner left bottom
              source={{uri: photosCaches[3]}}
              style={{
                width: Dimensions.get('window').width/2, 
                height: Dimensions.get('window').height/2,
                position: 'absolute',
                top: Dimensions.get('window').height/2,
              }}
            />}
        </SafeAreaView> :
        step === 2 ?
        <SafeAreaView style={{backgroundColor:Colors.black}}>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor={Colors.black}
          />
          <Spinner
            visible={true}
            textContent={'Generating...'}
            size={'large'}
            textStyle={{
              color: Colors.white,
              fontFamily: 'Roboto',
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
