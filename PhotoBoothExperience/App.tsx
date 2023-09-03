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
  VideoFile,
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
import Sound from 'react-native-sound';
import axios from 'axios';

const API_URL = 'https://localhost:8000/' 

Sound.setCategory('Playback');
//Instantiate sounds
var Estamos_generando_tus_fotografias = new Sound('estamos_generando_tus_fotografias.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});
var Haz_una_pose_diferente_esta_vez = new Sound('haz_una_pose_diferente_esta_vez.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});
var Intenta_bailar_la_cancion = new Sound('intenta_bailar_la_cancion.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});
var Photo_FX_1 = new Sound('photo_fx_1.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});
var Photo_FX_2 = new Sound('photo_fx_2.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});
var sigue_a_zack = new Sound('sigue_a_zack.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});
var Tienes_3_segundos_para_hacer_la_pose_mas_loca = new Sound('tienes_3_segundos_para_hacer_la_pose_mas_loca.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});
var Tomemos_una_mas = new Sound('Tomemos_una_mas.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});

function App(): JSX.Element {
  const [step, setStep] = React.useState(0);
  const [takenPhotos, setTakenPhotos] = React.useState(0);
  const [hasTakenPhotos, setHasTakenPhotos] = React.useState(false);
  const [counter, setCounter] = React.useState(6);
  const [showedText, setShowedText] = React.useState('');
  const [photos, setPhotos] = React.useState(new Array<PhotoFile>);
  const [photosCaches, setPhotosCaches] = React.useState(new Array<PhotoFile>);
  const [videosCaches, setVideosCaches] = React.useState(new Array<VideoFile>);
  const [videos, setVideos] = React.useState(new Array<VideoFile>);
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
    Estamos_generando_tus_fotografias.setVolume(100);
    return () => {
      Estamos_generando_tus_fotografias.release();
    };
  }, []);

  React.useEffect(() => {
    Haz_una_pose_diferente_esta_vez.setVolume(100);
    return () => {
      Haz_una_pose_diferente_esta_vez.release();
    };
  }, []);

  React.useEffect(() => {
    Intenta_bailar_la_cancion.setVolume(100);
    return () => {
      Intenta_bailar_la_cancion.release();
    };
  }, []);

  React.useEffect(() => {
    Photo_FX_1.setVolume(100);
    return () => {
      Photo_FX_1.release();
    };
  }, []);

  React.useEffect(() => {
    Photo_FX_2.setVolume(100);
    return () => {
      Photo_FX_2.release();
    };
  }, []);

  React.useEffect(() => {
    sigue_a_zack.setVolume(100);
    return () => {
      sigue_a_zack.release();
    };
  }, []);

  React.useEffect(() => {
    Tienes_3_segundos_para_hacer_la_pose_mas_loca.setVolume(100);
    return () => {
      Tienes_3_segundos_para_hacer_la_pose_mas_loca.release();
    };
  }, []);

  React.useEffect(() => {
    Tomemos_una_mas.setVolume(100);
    return () => {
      Tomemos_una_mas.release();
    };
  }, []);

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
      // recording start
      
      Tienes_3_segundos_para_hacer_la_pose_mas_loca.play(_ => {});

      setTakenPhotos(0)
      setCounter(5)
      //Starting first picture                     
      await delay(790)
      if(camera.current!=null){
        camera.current.startRecording({
          onRecordingFinished: (video_) => {
            setVideos([video_])
          },
          onRecordingError: (error) => console.error(error),
        })
      }
      setCounter(4)
      await delay(975)
      setCounter(3)
      await delay(975)
      setCounter(2)
      await delay(975)
      setCounter(1)
      await delay(975)
      setCounter(0)
      // recording stop
      if(camera.current!=null){
        await camera.current.stopRecording()
      }
      if(camera.current!=null){
        const my_photo = [await camera.current.takePhoto({
        })]
        setPhotos(my_photo)
      }

      Photo_FX_1.play(_ => {});
      setHasTakenPhotos(true)


      if(camera.current!=null){
        camera.current.startRecording({
          onRecordingFinished: (video_) => {
            setVideos([video_])
          },
          onRecordingError: (error) => console.error(error),
        })
      }

      setTakenPhotos(1)

      //Taking Second Picture
      Tomemos_una_mas.play(_ => {});
      setCounter(4)
      await delay(975)
      setHasTakenPhotos(false)
      setCounter(3)
      await delay(975)
      setCounter(2)
      await delay(975)
      setCounter(1)
      await delay(975)
      setCounter(0)
      
      // recording stop
      if(camera.current!=null){
        await camera.current.stopRecording()
      }
      if(camera.current!=null){
        const my_photo = [await camera.current.takePhoto({
        })]
        setPhotos(my_photo)
      }


      Photo_FX_2.play(_ => {});
      setHasTakenPhotos(true)


      if(camera.current!=null){
        camera.current.startRecording({
          onRecordingFinished: (video_) => {
            setVideos([video_])
          },
          onRecordingError: (error) => console.error(error),
        })
      }

      setTakenPhotos(2)

      //Taking Third Picture
      Haz_una_pose_diferente_esta_vez.play(_ => {});
      setCounter(5)
      await delay(975)
      setCounter(4)
      setHasTakenPhotos(false)
      await delay(975)
      setCounter(3)
      await delay(975)
      setCounter(2)
      await delay(975)
      setCounter(1)
      await delay(975)
      setCounter(0)
      

      // recording stop
      if(camera.current!=null){
        await camera.current.stopRecording()
      }
      if(camera.current!=null){
        const my_photo = [await camera.current.takePhoto({
        })]
        Photo_FX_1.play(_ => {});
        setPhotos(my_photo)
      }

      Photo_FX_1.play(_ => {});


      if(camera.current!=null){
        camera.current.startRecording({
          onRecordingFinished: (video_) => {
            setVideos([video_])
          },
          onRecordingError: (error) => console.error(error),
        })
      }
      setHasTakenPhotos(true)

      setTakenPhotos(3)

      //Taking Fourth Picture

      Intenta_bailar_la_cancion.play(_ => {});
      setCounter(6)
      await delay(975)
      setCounter(5)
      await delay(975)
      setHasTakenPhotos(false)
      setCounter(4)
      await delay(975)
      setCounter(3)
      await delay(975)
      setCounter(2)
      await delay(975)
      setCounter(1)
      await delay(975)
      setCounter(0)

      Photo_FX_2.play(_ => {});
      

      // recording stop
      if(camera.current!=null){
        await camera.current.stopRecording()
      }
      if(camera.current!=null){
        const my_photo = [await camera.current.takePhoto({
        })]
        setPhotos(my_photo)
      }


      setHasTakenPhotos(true)
      setTakenPhotos(4)
      await delay(1000)
      setHasTakenPhotos(false)
      
      

      // await delay(170)
      // setShowFirstPic(true)
      // await delay(170)
      // setShowSecondPic(true)
      // await delay(170)
      // setShowThirdPic(true)
      // await delay(170)
      // setShowFourthPic(true)
      // await delay(170)
      // setShowSixthPic(true)
      // await delay(170)
      // setShowSeventhPic(true)
      // await delay(170)
      // setShowEighthPic(true)
      // await delay(420)
      // setShowNinethPic(true)
      // await delay(100)
      // setShowNinethPic(false)
      // await delay(100)
      // setShowEighthPic(false)
      // await delay(100)
      // setShowSeventhPic(false)
      // await delay(100)
      // setShowSixthPic(false)
      // await delay(100)

      
      setStep(2);
      Estamos_generando_tus_fotografias.play(_ => {});
      //Generate video
    //   var response = await axios.get(
    //     `${API_URL}`,
    //     {'audio_file': 
    //       {
    //         uri: photosCaches[0],
    //         name:'userProfile.jpg',
    //         type:'image/jpg'
    //       }
    //     },
    //     {
    //       headers: {
    //           'Accept': '*/*',
    //           'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
    //       },
    //     }
    //   )
    //   console.log(response)
    // }
      await delay(8000)
      sigue_a_zack.play(_ => {});
      setStep(2);
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
    if(!photosCaches.includes(photos[0])){
      const photos_caches = photosCaches
      photosCaches.push(photos[0])
      setPhotosCaches(photos_caches)
    }
    if(!videosCaches.includes(videos[0])){
      const videos_caches = videosCaches
      videosCaches.push(videos[0])
      setVideosCaches(videos_caches)
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
                  marginBottom: 10,
                }
              }
            />
            <Text
              style={{
                color: Colors.black,
                fontSize: 30,
                fontWeight: 'bold',
                fontFamily: 'Roboto',
                textAlign: 'center'
              }}>
              {'CREA RECUERDOS CON'}
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontSize: 24,
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
                  video={true}
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
            {/* { showFirstPic && <Image 
              //Right half IMG
              source={{uri:  photosCaches[0]}}
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
            />} */}
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
