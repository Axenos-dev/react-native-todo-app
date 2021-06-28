import React, {useRef} from 'react'
import {View, StyleSheet, Image, Animated} from 'react-native'

export default function LoadingScreen(){

    const spin = useRef(new Animated.Value(0)).current

    const spinAnim = () => {
        Animated.loop(
            Animated.timing(spin, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: false
            })
        ).start()
    }

    const interpolatedSpin = spin.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    const animatedStyle = {
        transform : [
            {
                rotate: interpolatedSpin
            }
        ]
    }
    spinAnim()
    return(

        <View style = {styles.loading}>
            <Animated.View style = {animatedStyle}>
                <Image source = {require('../assets/loading.png')} style = {styles.image}/>
            </Animated.View>
        </View>
    )
}
const styles = StyleSheet.create({
    loading: {
        height: '100%',
        width: '100%',
        backgroundColor: '#111',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image : {
        height: 50,
        width: 50
    }
})