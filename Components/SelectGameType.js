import React, {Component} from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';

import { Button, Wraper } from './Styled'


export default class extends Component {
	static navigationOptions = {
    	//header: null,
  	};
  	render(){
  		const { navigate } = this.props.navigation;

		return (
			<Wraper>
				<Text style={{color: 'white', fontSize: 40, margin: 40}}>
					Modo de jogo
				</Text>
	            <Button 
	            	text={"Single Player"}
	            	onPress={()=>navigate('ConfigGame')}
	            />
				<Button 
	            	text={"Multiplayer"}
	            	onPress={()=>console.log("clicked")}
	            />
	            <Button 
	            	text={"CPU vs CPU"}
	            	onPress={()=>console.log("clicked")}
	            />
	        </Wraper>
	    )
	}
}