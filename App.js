import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableWithoutFeedback, Dimensions, Button } from 'react-native';
import Svg, { Circle, Rect, Image as SvgImage, Text as SvgText } from 'react-native-svg';
import { launchImageLibrary } from 'react-native-image-picker';

const App = () => {
  const [imageUri, setImageUri] = useState(null);
  const [overlayIndex, setOverlayIndex] = useState(0);

  const pickImage = () => {
    launchImageLibrary(
      { mediaType: 'photo' },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorCode);
        } else if (response.assets && response.assets.length > 0) {
          setImageUri(response.assets[0].uri);
        }
      }
    );
  };

  const swapOverlay = () => {
    setOverlayIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
  };

  const renderOverlay = () => {
    if (overlayIndex === 0) {
      return (
        <Svg height="100%" width="100%" style={styles.overlay}>
          <Circle cx="50%" cy="50%" r="45%" fill="rgba(0, 0, 0, 0.5)" />
          <Circle cx="50%" cy="50%" r="40%" fill="none" stroke="red" strokeWidth="10" />
          <SvgText
            x="50%"
            y="90%"
            fill="white"
            fontSize="24"
            fontWeight="bold"
            textAnchor="middle"
          >
          </SvgText>
          <SvgImage
            x="10%"
            y="10%"
            width="50"
            height="50"
            href={require('./assets/heart.png')}
          />
          <SvgImage
            x="80%"
            y="10%"
            width="50"
            height="50"
            href={require('./assets/star.png')}
          />
        </Svg>
      );
    } else {
      return (
        <Svg height="100%" width="100%" style={styles.overlay}>
          <Circle cx="50%" cy="50%" r="45%" fill="none" />
          <Circle cx="50%" cy="50%" r="40%" fill="none" stroke="yellow" strokeWidth="10" />
          <SvgText
            x="50%"
            y="90%"
            fill="yellow"
            fontSize="24"
            fontWeight="bold"
            textAnchor="middle"
          >
          </SvgText>
          <SvgImage
            x="10%"
            y="70%"
            width="80"
            height="80"
            href={require('./assets/flag.png')}
          />
          <SvgImage
            x="70%"
            y="20%"
            width="100"
            height="100"
            href={require('./assets/cartoon.png')}
          />
        </Svg>
      );
    }
  };

  const handlePress = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    const screenWidth = Dimensions.get('window').width;
    const imageContainerWidth = styles.imageContainer.width;

    console.log(`locationX: ${locationX}, screenWidth: ${screenWidth}, imageContainerWidth: ${imageContainerWidth}`);

    // Check if the press is on the right side of the image
    if (locationX > (screenWidth - imageContainerWidth) / 2 + imageContainerWidth / 2) {
      console.log('Tapped on the right side, not overlay');
    } else {
      console.log('Tapped on the left side, swapping overlay');
      swapOverlay();
    }
  };

  return (
    <View style={styles.container}>
      {imageUri && (
        <TouchableWithoutFeedback onPress={handlePress}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.profileImage} />
            {renderOverlay()}
          </View>
        </TouchableWithoutFeedback>
      )}
      <Button title="Pick an Image" onPress={pickImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  imageContainer: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 150,
    position: 'absolute',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default App;
