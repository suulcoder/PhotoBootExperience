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
} from 'react-native';
import { Dimensions } from 'react-native';
import {
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import {
  Camera,
} from 'react-native-vision-camera';
import TrackPlayer from 'react-native-track-player';
import { scanFaces } from 'vision-camera-face-detector';


TrackPlayer.registerPlaybackService(() => require('./service'));

module.exports = async function() {
  await TrackPlayer.setupPlayer()
  const track2 = {
      url: require('./public/LMDA.wav'), // Load media from the app bundle
      title: 'LMDA',
      artist: 'Zack Steam',
      artwork: require('./public/Artwork.png'), // Load artwork from the app bundle
      duration: 126
  };
}

function App(): JSX.Element {
  const [hasPermission, setHasPermission] = React.useState(false);

  const devices = useCameraDevices();
  const device = devices.front;

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const scannedFaces = scanFaces(frame);
    if(scanFaces.length>0){

    }
  }, []);



  const backgroundStyle = {
    backgroundColor: Colors.lighter,
  };


  function onStart() {
    //
  }

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);


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
            {device != null && hasPermission &&
            <Camera
              device={device}
              isActive={true}
              frameProcessor={frameProcessor}
              frameProcessorFps={5}
            />}
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
    </SafeAreaView>
  );
}

export default App;
