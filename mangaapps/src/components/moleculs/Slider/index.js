import React, { useState, useRef, useEffect } from 'react'
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform, 
  ActivityIndicator
} from 'react-native';
import { fonts, colors, showError } from '../../../utils';
import { Fire } from '../../../config';

const {width: screenWidth} = Dimensions.get('window');

const Slider = props => {
  
    const [imageSlider, setImageSlider] = useState([])
    const [loading, setLoading] = useState(false)
    const carouselRef = useRef(null);

    useEffect(() => {
      getSlider()
    }, []);

    const goForward = () => {
      carouselRef.current.snapToNext();
    };

    const getSlider = () => {
      Fire.database()
        .ref(`slider_image/`)
        .once('value')
        .then((res)=>{
            if(res.val()){
              const data = res.val()
              const filterData = data.filter((el)=>(el !== null))
              setImageSlider(filterData)
            }
        })
        .catch((error)=>{
            showError(error.message)
        })
    }
  
    const renderItem = ({item, index}, parallaxProps) => {
      return (
        <View style={styles.item}>
          <ParallaxImage
            source={{uri: item.illustration}}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.5} //0.4
            {...parallaxProps}
          />
          <Text style={styles.title} numberOfLines={2}>
          {item.title}
          </Text>
        </View>
      );
    };
    
    
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={goForward}>
        </TouchableOpacity>
        <Carousel
          ref={carouselRef}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 50} //60
          data={imageSlider}
          renderItem={renderItem}
          hasParallaxImages={true}
        />
      </View>
    );
  };
  
  export default Slider;

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      item: {
        width: screenWidth - 45, //60
        height: screenWidth - 150, //200
      },
      imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
        backgroundColor: colors.white,
        borderRadius: 10,
      },
      image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'contain', //cover
        borderRadius: 10
      },
      title: {
          fontSize: 16,
          fontFamily: fonts.primary[800],
          color: colors.primary
      }
})
