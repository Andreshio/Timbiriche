import React, {Component} from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';

import { Button, Wraper } from './Styled'

import { connect } from 'react-redux';

import mouse from '../blackWhite.png'

import { toggleIsBot } from '../State/actions';

const imageStyle = {
	width: "100%", 
	height: "100%", 
	height: 180, 
	width: 170, 
	//margin: 40,
}

const JustSpace = () => (<View/>);

class SelectGameType extends Component {
	static navigationOptions = {
    	//header: null,
  	};
  	render(){
  		const { navigation: { navigate }, toggleIsBot } = this.props;
		return (
			<Wraper>
				<Text style={{color: 'white', fontSize: 40}}>
					Modo de jogo
				</Text>
				<Image
	            	source={mouse} 
	                style={imageStyle}
	            />
	            <Button 
	            	text={"Single Player"}
	            	onPress={()=>{
	            		toggleIsBot(false, 0);
	            		toggleIsBot(true, 1);
	            		navigate('ConfigGame');
	            	}}
	            />
				<Button 
	            	text={"Multiplayer"}
	            	onPress={()=>{
	            		toggleIsBot(false, 0);
	            		toggleIsBot(false, 1);
	            		navigate('ConfigGame');
	            	}}
	            />
	            <Button 
	            	text={"CPU vs CPU"}
	            	onPress={()=>{
	            		toggleIsBot(true, 0);
	            		toggleIsBot(true, 1);
	            		navigate('Game');
	            	}}
	            />
	            <JustSpace />
	        </Wraper>
	    )
	}
}

const mapDispatchToProps = (dispatch) => ({
	toggleIsBot: (instance, index) => dispatch(toggleIsBot(instance, index)),
})

export default connect(null, mapDispatchToProps)(SelectGameType);