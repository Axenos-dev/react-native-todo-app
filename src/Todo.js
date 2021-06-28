import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Animated, Image} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import {useFonts} from 'expo-font'
import AppLoading from 'expo-app-loading'

export default function Todo({todoTitle, deleteTodo, index, isDark, animation}){
    let [loaded] = useFonts({
        'OswaldRegular': require('../assets/fonts/Oswald-Regular.ttf'),
        'OswaldBold': require('../assets/fonts/Oswald-Bold.ttf')
    })

    const [show, setShow] = useState(false)
    const [done, setDone] = useState(false)

    const doneColors     =  [ "#30c174", isDark? "#222" : "#eee", "#30c174" ]
    const defaultColors  =  [ "#ff4655", isDark? "#222" : "#eee", "#30c174" ]

    const addDone = () => {
        setDone(!done)
        longHandler()
    }

	const longHandler = () => setShow(!show)
	
    const boxInterpolation = animation.interpolate({
		inputRange: [0, 1],
		outputRange:["rgb(255, 255, 255)" , "rgb(17, 17, 17)"]
	})

	const animatedStyle = {
		backgroundColor: boxInterpolation
	}

    if(!loaded) return <AppLoading/>

    else{
    return(
        <Animated.View>
                <TouchableOpacity style = {{width: "100%", marginVertical: 5 }} activeOpacity = {0.8} onLongPress = {longHandler}>
                    <LinearGradient colors = {done? doneColors : defaultColors} start = { [0, 0] } end = { [1, 1] } style = {styles.todoBorder}>
                        <Animated.View style = {[styles.todo, animatedStyle]}>
                            <Text style = {isDark? [styles.todoText, {color: 'white'}]: [styles.todoText, {color: '#111'}]}>{ todoTitle }</Text>
                            {
                                show?  
                                <View style = {{ width: "40%", flexDirection: 'row'}}>
                                    {
                                        done? 
                                        <TouchableOpacity style = {styles.btnDelExt} activeOpacity = {0.8} onPress = {() => deleteTodo(index, addDone)}>
                                            <Text style = {{ color: "white", fontSize: 18, fontFamily: 'OswaldRegular' }}>Delete</Text>
                                        </TouchableOpacity>
                                        : 
                                        <View style = {{flexDirection: 'row'}}>
                                            <TouchableOpacity style = {styles.btnDel} activeOpacity = {0.8} onPress = {() => deleteTodo(index, addDone)} >
                                                <Image source = {require('../assets/cross.png')} style = {{ height: 18, width: 18}}/>
                                            </TouchableOpacity>
        
                                            <TouchableOpacity style = {styles.btnOk} activeOpacity = {0.8} onPress = {() => addDone()} >
                                                <Image source = {require('../assets/tag.png')} style = {{height: 24, width: 24}}/>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                </View> : null
                            }
    
                        </Animated.View>
                    </LinearGradient>
                </TouchableOpacity>
            </Animated.View>
    )
    }
}

const styles = StyleSheet.create({
    todoBorder: {
        width: "100%",
        borderRadius: 20,
        padding: 3
    },
    todo : {
        width: "100%",
        borderRadius: 17,
        padding: 10,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    todoText: {
        fontSize: 18,
        width: "68%",
        color: "black",
        fontFamily: 'OswaldBold'
    },
    btnDel: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#ff4655",
        borderRadius: 20,
        marginLeft: 2
    },
    btnDelExt: {
        width: 100,
        height: 35,
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#ff4655",
        borderRadius: 3,
        marginLeft: 2
    },
    btnOk : {
        width: 60,
        height: 40,
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#30c174",
        borderRadius: 3,
        marginLeft: 2
    },
    dark: {
        backgroundColor: "#111111"
    },
    light: {
        backgroundColor: "white"
    }
})