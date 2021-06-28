import React, {useRef} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated } from 'react-native'
import {useFonts} from 'expo-font'
import AppLoading from 'expo-app-loading'

export default ({moveSettings}) => {
    let [loaded] = useFonts({
        'OswaldBold': require('../assets/fonts/Oswald-Bold.ttf')
    })

    const spinAnim = useRef(new Animated.Value(0)).current

    const animation = () => {
        Animated.loop(
            Animated.timing(spinAnim, {
                duration: 2000,
                useNativeDriver: false,
                toValue: 1
            })
        ).start()
    }

    const interpolated = spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg']
    })

    const animatedStyle = {
        transform: [
          {
            rotate: interpolated,
          }
        ]
    }
    if(!loaded) return <AppLoading/>
    else{
        animation()
        return(
            <View style = {styles.navbar}>
                <View>
                    <Text style = {{fontSize: 33, color: "#111111", fontFamily: 'OswaldBold'}}>App</Text>
                </View>
                <Animated.View style = {[styles.settingsBtn, animatedStyle]}>
                    <TouchableOpacity activeOpacity = {0.8} onPress = {() => moveSettings()}>
                        <Image source = {require('../assets/gear2.png')} style = {[{height: 30, width: 30}]}/>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navbar : {
        width: "100%",
        height: 80,
        backgroundColor: "#ff4655",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row-reverse'
    },
    settingsBtn: {
        position: 'absolute',
        top: 35,
        right: 20,
        height: 30,
        width: 30,
        borderRadius: 15
    }
})