import React, {Component} from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import {backgroundStyle, titleStyle, imageStyle} from './styles';

import mouse from '../../blackWhite.png'

import { connect } from 'react-redux';


import { Button, Wraper } from '../Styled'

const JustSpace = () => (<View/>);
const Title = ({text}) => (<Text style={titleStyle}>{text}</Text>);


class FirstScreen extends Component {
	static navigationOptions = {
    	header: null,
  	};
  	render(){
  		const { navigation: { navigate }, gameRunning } = this.props;
		return (
			<Wraper>
				<JustSpace />
	            <Title text={"Timbiriche"} />
	            <Image
	            	source={mouse} 
	                style={imageStyle}
	            />
	            {gameRunning&&
	            	<Button 
		            	text={"Continuar"}
		            	onPress={()=>navigate('Game')}
		            />
	            }
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

const mapStateToProps = ({board: {gameRunning}}) => ({gameRunning})

export default connect(mapStateToProps)(FirstScreen);