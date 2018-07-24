import React, {Component} from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import {backgroundStyle, titleStyle, imageStyle, buttonViewStyle} from './styles';

import mouse from '../../blackWhite.png'

const Button = ({text, onPress}) => (
	<TouchableWithoutFeedback onPress={onPress}>	
		<View style={buttonViewStyle}>
			<Text style={{fontSize: 40,color: "white"}}> 
				{text} 
			</Text>
		</View>
	</TouchableWithoutFeedback>
)

const JustSpace = () => (<View/>);
const Title = ({text}) => (<Text style={titleStyle}>{text}</Text>);


export default class extends Component {
	static navigationOptions = {
    	header: null,
  	};
  	render(){
  		const { navigate } = this.props.navigation;

		return (
			<View style={backgroundStyle}>
				<JustSpace />
	            <Title text={"Timbiriche"} />
	            <Image
	            	source={mouse} 
	                style={imageStyle}
	            />
	            <Button 
	            	text={"Jogar"}
	            	onPress={()=>navigate('Game')}
	            />
				<Button 
	            	text={"Sobre"}
	            	onPress={()=>console.log("clicked")}
	            />
	            <Button 
	            	text={"Sobre"}
	            	onPress={()=>console.log("clicked")}
	            />
	            <JustSpace />
	        </View>
	    )
	}
}