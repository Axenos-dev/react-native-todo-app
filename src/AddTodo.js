import React, { useState} from 'react'
import { Alert, TextInput, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import {useFonts} from 'expo-font'
import AppLoading from 'expo-app-loading'

export default function AddTodo({isDark, onSubmit}){

    let [loaded] = useFonts({
        'OswaldRegular': require('../assets/fonts/Oswald-Regular.ttf'),
        'OswaldBold': require('../assets/fonts/Oswald-Bold.ttf')
    })

    const [value, setValue] = useState("");

    const onSubmitHandler = () =>{
        if(value.trim()){
            onSubmit(value);
            setValue('');
        }
        else{
            Alert.alert("Error")
        }
        
    }
    if(!loaded) return <AppLoading/>
    else{

    return(
        <View style = {styles.addBlock}>
            <TextInput
                placeholder = "write your todo..."
                placeholderTextColor = {isDark? "#ddd" : "gray"} 
                style = {isDark? [styles.input, styles.dark, {fontFamily: 'OswaldRegular'}] : [styles.input, styles.light, {fontFamily: 'OswaldRegular'}]} 
                onChangeText = {text => setValue(text)} 
                value = {value}
            />
            <TouchableOpacity style = {{ width: 100, height: 35 }} onPress = {onSubmitHandler} activeOpacity = {0.8}>
                <View style = {styles.button}>
                    <Image source = {require('../assets/plus.png')} style = {{width: 17, height: 17}}/>
                </View>
            </TouchableOpacity>
        </View>
    )

    }
}

const styles = StyleSheet.create({
	addBlock: {
		justifyContent: "space-between",
		flexDirection: "row",
		marginVertical: 20
	},
	input : {
		width: "70%",
		height: 35,
		borderWidth: 2,
		borderColor: '#ff4655',
		borderRadius: 2,
		textAlign: "center",
		color: "black" 
	},
	dark : {
		color: "white"
	},
	light: {
		color: "black"
	},  
	buttonBorder : {
		height: "100%",
		width: "100%",
		padding: 2,
		borderRadius: 12
	},
	button : {
		backgroundColor: "#ff4655",
		height: "100%",
		width: "100%", 
		alignItems: "center", 
		justifyContent: "center",
		borderRadius: 2
	}
})