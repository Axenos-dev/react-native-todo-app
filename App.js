import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Alert, ScrollView, Animated} from 'react-native';
import Header from './src/Header.js'
import AddTodo from "./src/AddTodo.js"
import Todo from './src/Todo.js'
import SettingsWindow from './src/SettingsWindow.js'

export default function App() {
	const [todos, setTodo] = useState([])

	const [isDark, setDark] = useState(false)

	const [showSet, setShow] = useState(false)

	const [animation, setAnimation] = useState(new Animated.Value(0))
	const [settingsAnim, setSet] = useState(new Animated.ValueXY({x: -270, y: 0}))

	const showSettings = () => setShow(!showSet)
	
	const closeSettings = () =>{
		Animated.timing(settingsAnim, {
			toValue: {x: -270, y: 0},
			duration: 700,
			useNativeDriver: false
		}).start()
		setTimeout(() => showSettings(), 701)
	}
	const openSettings = () => {
		showSettings()
		Animated.timing(settingsAnim, {
			toValue: {x: 0, y: 0},
			duration: 1000,
			useNativeDriver: false
		}).start()
	}

	const handleAnimation = () => {
		Animated.timing(animation, {
			toValue:1,
			duration: 500,
			useNativeDriver: false
		}).start()
	}

	const handleSetDark = () => {
		Animated.timing(animation, {
			toValue: 0,
			duration: 500,
			useNativeDriver: false
		}).start()
	}

	const boxInterpolation = animation.interpolate({
		inputRange: [0, 1],
		outputRange:["rgb(255, 255, 255)" , "rgb(17, 17, 17)"]
	})
	const animatedStyle = {
		backgroundColor: boxInterpolation
	}

	const switchHandler = () => {
		setDark(!isDark)
		if(isDark){
			handleSetDark()
		}
		else{
			handleAnimation()
		}
	}

	const addTodo = (title) =>{
		if( todos.length !== 50 && !todos.includes(title)){
			setTodo(prev => [...prev, title])
		}
		else{
			Alert.alert("erreo")
		}
	}

	const deleteTodo = (index, additionalFunc) => {
		additionalFunc()
		setTodo(prev => prev.filter(todoE => todos.findIndex(todo => todo === todoE) !== index))
	}

return (
    <Animated.View style = {[animatedStyle, {height: '100%'}]}>
      	<Header moveSettings = {openSettings}/>
		
		{
			showSet? <SettingsWindow isDark = {isDark} switchHandler = {switchHandler} moveSettings = {closeSettings} coords = {settingsAnim}/> : null
		}
		
		<View style = {styles.blocks}>
		  	<View>
				<AddTodo onSubmit = { addTodo } isDark = {isDark}/>
			</View>
		</View>
		<View style = {styles.scrollPanel}>
			<ScrollView scrollEnabled = {true} style = {{ padding: 10}}>
				{
					todos.map(todo => {
						return <Todo todoTitle = {todo} 
						key = {todos.findIndex(todoE => todoE === todo).toString()} 
						deleteTodo = {deleteTodo} 
						index = {todos.findIndex(todoE => todoE === todo)} 
						isDark = {isDark} 
						animation = {animation}/>
					})
				}
				<View style = {{ height: 40 }} />
			</ScrollView>
		</View>
      	<StatusBar style="auto" />
    </Animated.View>
  );
}
const styles = StyleSheet.create({
	blocks: {
		paddingHorizontal: 15
	},
	scrollPanel: {
		height: "78%",
		marginVertical: 5,
		borderTopWidth: 1,
		borderTopColor: "#ff4655"
	}
})
