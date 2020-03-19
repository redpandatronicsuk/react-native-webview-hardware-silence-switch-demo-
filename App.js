/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Switch,
} from 'react-native'

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'
import WebView from 'react-native-webview'

const js = `try{var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var oscillator = audioCtx.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(420, audioCtx.currentTime);
  oscillator.start();
  var oscillator_volume = audioCtx.createGain();
  oscillator_volume.gain.linearRampToValueAtTime(1, 0);
  oscillator.connect(oscillator_volume);
  oscillator_volume.connect(audioCtx.destination);
  }catch(e){}
  true;`

const App: () => React$Node = () => {

  const [ isWebViewAudioShowing, setIsWebViewAudioShowing ] = useState(true)
  const [ isWebViewVideoShowing, setIsWebViewVideoShowing ] = useState(false)
  const [ isIgnoringHardwareSwitch, setIsIgnoringHardwareSwitch ] = useState(true)
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Text>Switch below does not work dynamically, i.e. you have to hide/show the WebView for it to take effect.</Text>
          <View style={styles.row}>
            <Text>isIgnoringHardwareSwitch</Text>
            <Switch value={isIgnoringHardwareSwitch} onValueChange={b=>{setIsIgnoringHardwareSwitch(b)}} />
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={()=>{setIsWebViewAudioShowing(!isWebViewAudioShowing)}}>
                <Text> PRESS HERE TO { isWebViewAudioShowing ? 'HIDE' : 'SHOW' } AUDIO WebView </Text>
            </TouchableOpacity>
            {
              isWebViewAudioShowing && <WebView injectedJavaScript={js}
              style={{height: 30, width: 30, backgroundColor: 'green'}}
              source={{ html: '<style>*{background-color:green}</style>' }}
              ignoreSilentHardwareSwitch={isIgnoringHardwareSwitch}
              onMessage={() => {}} />
            }
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={()=>{setIsWebViewVideoShowing(!isWebViewVideoShowing)}}>
                <Text> PRESS HERE TO { isWebViewVideoShowing ? 'HIDE' : 'SHOW' } VIDEO WebView </Text>
            </TouchableOpacity>
            {
              isWebViewVideoShowing && <WebView source={{ uri: 'https://www.youtube.com/watch?v=wZZ7oFKsKzY' }} /> 
            }
          </View>
          <Text>When showing the video WebView, it should automatically go into fullscreen after a short moment. Then you have to unmute the video using the button near the top right corner. Video always ignores the hardware silence switch, regardless of the value of the `ignoreSilentHardwareSwitch` parameter.</Text>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    marginVertical: 20
  }
})

export default App
