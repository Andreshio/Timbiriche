import React, {Component, Fragment} from 'react';
import { View, Text, TouchableWithoutFeedback, Switch } from 'react-native';
import { connect } from 'react-redux';

import { Wraper, Button } from './Styled/';
import PlayerConfig from './PlayerConfig';
import Picker from './Picker';

import { changeColor, toggleCurrentPlayer } from '../State/actions';

const JustSpace = () => (<View/>);


const colors = ["#00E676", "#ff1744", "#1A237E", "#6200EA", '#00B8D4', '#FFEA00'];


class ConfigGameScreen extends Component {
	static navigationOptions = {
    	//header: null,
  	};
  	render(){
  		const { navigation: {navigate}, players, changeColor, currentPlayer, toggleCurrentPlayer } = this.props;

		return (
			<Wraper>
				<Text style={{color: 'white', fontSize: 40, margin: 40}}>
					Escolha sua cor
				</Text>
				<Wraper row style={{flexWrap: 'wrap', alignContent: "space-around"}}> 
					{
						colors.map((color, i)=>
							<TouchableWithoutFeedback key={color} onPress={()=>{
								changeColor(color, 0)
							}}>
								<View 
									key={i}
									style={{
										backgroundColor: color, 
										width: 160, 
										height: 160,
										borderColor: 'black',
										borderWidth: color===players[0].color?20:0,
									}}
								/>
							</TouchableWithoutFeedback>
						)
					}
				</Wraper>
				<Wraper>
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
		            <Button 
		            	text={"Começar"}
		            	onPress={()=>navigate('Game')}
		            />
		        </Wraper>
	  	    </Wraper>
	    )
	}
}
const mapDispatchToProps = (dispatch) => ({
	changeColor: (i, color) => dispatch(changeColor(i, color)),
	toggleCurrentPlayer: (i) => dispatch(toggleCurrentPlayer(i)),
})

const mapStateToProps = ({board: {players, currentPlayer}}) => ({
	players, currentPlayer, 
})


export default connect(mapStateToProps, mapDispatchToProps)(ConfigGameScreen);