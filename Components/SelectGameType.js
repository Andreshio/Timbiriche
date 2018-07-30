import React, {Component} from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';

import { Button, Wraper } from './Styled'

import { connect } from 'react-redux';

import mouse from '../blackWhite.png'

import { toggleIsBot, changeColor, startGame } from '../State/actions';

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
  		const colors = ["#00E676", "#ff1744", "#1A237E", "#6200EA", '#00B8D4', '#FFEA00'];
  		const { navigation: { navigate }, toggleIsBot, changeColor, startGame } = this.props;
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
	            		const bot0colorIndex = Math.floor(Math.random()*colors.length)
	            		changeColor(colors[bot0colorIndex], 0);
	            		toggleIsBot(true, 0);

	            		const bot1colors = [
	            			...colors.slice(0, bot0colorIndex), 
	            			...colors.slice(bot0colorIndex+1, colors.length-1)
	            		];

	            		const bot1colorIndex = Math.floor(Math.random()*bot1colors.length);
	            		changeColor(bot1colors[bot1colorIndex], 1);
	            		toggleIsBot(true, 1);
	            		startGame();
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
	changeColor: (i, color) => dispatch(changeColor(i, color)),
	startGame: () => dispatch(startGame()),
})

export default connect(null, mapDispatchToProps)(SelectGameType);