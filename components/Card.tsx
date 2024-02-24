import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Image } from 'react-native';

interface CardProps{
    image: any;
    isSelected: boolean;
    onCardPress: () => void;
}

export const Card: React.FC<CardProps>=({image, isSelected, onCardPress}) => {
    const scaleValue = useRef(new Animated.Value(0)).current;

    useEffect(()=> {
        if (isSelected){
            Animated.timing (scaleValue, {
                toValue:1,
                duration: 200,
                useNativeDriver: true,
            }).start();
        } else{
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    }, [isSelected, scaleValue]);
    const scaleAnimation ={
        transform: [{scale: scaleValue}],
    };

    return (
        <TouchableOpacity onPress={onCardPress} activeOpacity={0.8}>
            <Animated.View style={[styles.container, scaleAnimation]}>
                <Image source={image} style={styles.image}/>
            </Animated.View>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    container: {
      width: 80,
      height: 120,
      backgroundColor: 'lightblue',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
  });
export default Card;