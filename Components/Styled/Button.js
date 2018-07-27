import React, {Component} from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';;

const buttonViewStyle = {
	backgroundColor: "#212121", 
	height: 100, 
	width: 300, 
	borderWidth: 2, 
	borderColor: "white",
	borderRadius: 30, 
	//marginTop: 40,
	justifyContent: 'center',
	alignItems: 'center',
}

export default ({text, onPress}) => (
	<TouchableWithoutFeedback onPress={onPress}>	
		<View style={buttonViewStyle}>
			<Text style={{fontSize: 40, color: "white"}}> 
				{text} 
			</Text>
		</View>
	</TouchableWithoutFeedback>
)
