import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';

import {RNCamera} from 'react-native-camera';

const PendingView = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 30, color: 'red'}}>Loading...</Text>
    </View>
  );
};

const App = () => {
  const [image, setImage] = useState(null);

  const takePicture = async camera => {
    try {
      const options = {
        quality: 0.9,
        base64: false,
      };
      const data = await camera.takePictureAsync(options);
      setImage(data.uri);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {image ? (
        <>
          <Text style={styles.camText}>Here is your new Profle Pic</Text>
          <Image
            style={styles.clicked}
            source={{uri: image, width: '100%', height: '100%'}}
          />
          <Button
            title="Click new Image"
            onPress={() => setImage(null)}></Button>
        </>
      ) : (
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'longer text to use camera',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use camera',
            message: 'longer text to use camera',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }}>
          {({camera, status}) => {
            if (status != 'READY') {
              return <PendingView />;
            }
            return (
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={styles.capture}
                  onPress={() => {
                    takePicture(camera);
                  }}>
                  <Text>SNAP</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#0A79DF',
  },
  preview: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: 'orange',
    padding: 20,
    alignSelf: 'center',
  },
  camText: {
    backgroundColor: '#3498DB',
    color: '#FFF',
    marginBottom: 10,
    width: '100%',
    textAlign: 'center',
    paddingVertical: 20,
    fontSize: 25,
  },
  clicked: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
});

export default App;
