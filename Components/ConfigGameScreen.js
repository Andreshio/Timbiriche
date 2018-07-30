import React, {Component, Fragment} from 'react';
import { View, Text, TouchableWithoutFeedback, Switch } from 'react-native';
import { connect } from 'react-redux';

import { Wraper, Button } from './Styled/';
import PlayerConfig from './PlayerConfig';
import Picker from './Picker';

import { startGame, changeColor, toggleCurrentPlayer } from '../State/actions';

const colors = ["#00E676", "#ff1744", "#1A237E", "#6200EA", '#00B8D4', '#FFEA00'];

class ConfigGameScreen extends Component {
	constructor(){
		super();
		this.state = {
			toConfigPlayer: 0,
		}
	}
	static navigationOptions = {

  	};
  	render(){
  		const { navigation: {navigate}, players, changeColor, currentPlayer, toggleCurrentPlayer, startGame } = this.props;

  		const alreadySelected = colors.find(c=>{
  			if(this.state.toConfigPlayer===0){
  				return c===players[1].color;
  			} else {
  				return c===players[0].color;
  			}
	  	});
		return (
			<Wraper>
				<Text style={{color: 'white', fontSize: 40, margin: 40}}>
					{players[1].isBot?
							'Escolha sua cor'
						:
							`Player ${this.state.toConfigPlayer+1}, selecione sua cor`
					}
				</Text>
				<Wraper row style={{flexWrap: 'wrap', alignContent: "space-around"}}> 
					{
						colors.map((color, i)=>
							<TouchableWithoutFeedback key={color} onPress={()=>{
									changeColor(color, this.state.toConfigPlayer)
								}}
								disabled={color===alreadySelected}
							>
								<View 
									key={i}
									style={{
										backgroundColor: color, 
										width: 160, 
										height: 160,
										opacity: color===alreadySelected?0.2:1,
										borderColor: 'black',
										borderWidth: color===players[0].color
													 ||	color===players[1].color?20:0,
									}}
								/>
							</TouchableWithoutFeedback>
						)
					}
				</Wraper>
				<Wraper>
					{players[1].isBot&&
						<View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
							<Switch 
								thumbTintColor={'#d50000'} 
								tintColor={'white'} 
								value={currentPlayer===0}
								onValueChange={()=>toggleCurrentPlayer(currentPlayer===0? 1 : 0)}
							/>
							
							<Text style={{color: 'white', fontSize: 25, marginLeft: 25}}>
								{currentPlayer===0?
										'Primeiro a jogar'
									:
										'Segundo a jogar'
								}
							</Text>
			            </View>
		        	}
		            <Button 
		            	text={
		            		players[1].isBot||this.state.toConfigPlayer?
		            		"Começar" : "Continuar"
		            	}
		            	onPress={()=>{
		            		const botColors = colors.filter(c=>c!==players[0].color);

		            		const randomNumber = Math.floor(Math.random()*botColors.length);

		            		if(players[1].isBot){
			            		changeColor(botColors[randomNumber], 1);
			            		startGame()
			            		navigate('Game');
			            	} else {
			            		if(this.state.toConfigPlayer === 0){
			            			this.setState({toConfigPlayer: 1});
			            		} else {
			            			startGame()
			            			navigate('Game')
			            		}
			            		
			            	}
		            		
		            	}}
		            />
		        </Wraper>
	  	    </Wraper>
	    )
	}
}
const mapDispatchToProps = (dispatch) => ({
	startGame: () => dispatch(startGame()),
	changeColor: (i, color) => dispatch(changeColor(i, color)),
	toggleCurrentPlayer: (i) => dispatch(toggleCurrentPlayer(i)),
})

const mapStateToProps = ({board: {players, currentPlayer}}) => ({
	players, currentPlayer, 
})


export default connect(mapStateToProps, mapDispatchToProps)(ConfigGameScreen);