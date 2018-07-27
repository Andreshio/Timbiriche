import React, {Component} from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import {backgroundStyle, titleStyle, imageStyle} from './styles';

import mouse from '../../blackWhite.png'

import { Button, Wraper } from '../Styled'

const JustSpace = () => (<View/>);
const Title = ({text}) => (<Text style={titleStyle}>{text}</Text>);


export default class extends Component {
	static navigationOptions = {
    	header: null,
  	};
  	render(){
  		const { navigate } = this.props.navigation;

		return (
			<Wraper>
				<JustSpace />
	            <Title text={"Timbiriche"} />
	            <Image
	            	source={mouse} 
	                style={imageStyle}
	            />
	            <Button 
	            	text={"Jogar"}
	            	onPress={()=>navigate('SelectGameType')}
	            />
				<Button 
	            	text={"Sobre"}
	            	onPress={()=>console.log("clicked")}
	            />
	            <JustSpace />
	        </Wraper>
	    )
	}
}