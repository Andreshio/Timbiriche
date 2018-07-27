import React, {Component, Fragment} from 'react';
import { View, Text, TouchableWithoutFeedback, LayoutAnimation, UIManager } from 'react-native';
import { connect } from 'react-redux';

import { Wraper, Button } from './Styled/';
import PlayerConfig from './PlayerConfig';
import Picker from './Picker';

const JustSpace = () => (<View/>);


class ConfigGameScreen extends Component {
	static navigationOptions = {
    	//header: null,
  	};
  	render(){
  		const { navigation: {navigate}, players } = this.props;

		return (
			<Wraper>
				<Text style={{color: 'white', fontSize: 40, margin: 70}}>
					Jogadores
				</Text>

				<View style={{flex: 1, alignItems: "flex-start"}}>
					{
						players.map( (p, i) => 
							<PlayerConfig key={i} n={i}/>
						)
					}
				</View>
				<Wraper>
		            <Button 
		            	text={"Começar"}
		            	onPress={()=>navigate('Game')}
		            />
		        </Wraper>
	  	    </Wraper>
	    )
	}
}

const mapStateToProps = ({board: {players}}) => ({
	players
})


export default connect(mapStateToProps)(ConfigGameScreen);