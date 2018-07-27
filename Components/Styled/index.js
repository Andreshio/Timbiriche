import React, {Component} from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

import Button from './Button';

const wrapersStyle = {
	flex: 1, 
	backgroundColor: "#263238", 
	justifyContent: 'space-evenly',
	alignItems: 'center',
}

const Wraper = ({children, style, row}) => {
	const wrapersStyle = {
		flex: 1,
		height: "100%",
		width: "100%",
		backgroundColor: "#263238", 
		justifyContent: 'space-evenly',
		alignItems: 'center',

		flexDirection: row?"row":"column",
		...style,
	}


	return (
		<View style={wrapersStyle}>
			{children}
		</View>
	)
}

export { Button, Wraper };