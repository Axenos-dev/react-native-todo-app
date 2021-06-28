import React from 'react'
import {View, Text, StyleSheet, Switch, TouchableOpacity, Image, Animated} from 'react-native'
import {useFonts} from 'expo-font'
import AppLoading from 'expo-app-loading'

export default function SettingsWindow({isDark, switchHandler, moveSettings, coords}){
    let [loaded] = useFonts({
        'OswaldRegular': require('../assets/fonts/Oswald-Regular.ttf'),
        'OswaldBold': require('../assets/fonts/Oswald-Bold.ttf')
    })

    if(!loaded) return <AppLoading/>
    else{
    return(
        <Animated.View style = {[styles.settings, {top: coords.y, left: coords.x}]}>
            <View style = {{flexDirection: 'row', justifyContent: 'space-between', padding: 15}}>
                <Text style = {{color: 'white', fontFamily: 'OswaldBold', fontSize: 30}}>Settings</Text>
                <TouchableOpacity onPress = {() => moveSettings()}>
                    <Image source = {require('../assets/cross.png')} style = {{height: 30, width: 30, marginTop: 15}}/>
                </TouchableOpacity>
            </View>
            <View style = {styles.container}>
                <View style = {{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style = {{color: 'white', fontFamily: 'OswaldRegular', fontSize: 15, margin: 0}}>{isDark? "Light" : "Dark"} theme</Text>
                    <Switch
                        trackColor={{ false: "#30c174", true: "#f4f3f4" }}
                        thumbColor={isDark ? "#ff4655" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={switchHandler}
                        value={isDark}
                    />
                </View>
            </View>
        </Animated.View>
    )
    }
}

const styles = StyleSheet.create({
    settings: {
        height: '100%',
        width: 270,
        position: 'absolute',
        zIndex: 10,
        padding: 5,
        borderRightWidth: 1,
        borderRightColor: '#111',
        backgroundColor: '#ff4655'
    },
    container: {
        height: '100%',
        width: '100%',
        borderRadius: 4,
        backgroundColor: '#111',
        padding: 5
    }
})