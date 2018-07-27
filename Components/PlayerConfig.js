import React, {Component, Fragment} from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { Wraper } from './Styled/';
import Picker from './Picker';

import { changeColor } from '../State/actions';

const ColorBlock = ({color}) => (
	<View 
		style={{
			height: 70,
			margin: 10,
			aspectRatio: 1,
			backgroundColor: color, 
		}}
	/>
)

const colors = ["#00E676", "#ff1744", "#1A237E", "#6200EA", '#00B8D4', '#FFEA00'];

const PlayerConfig = ({players, n, changeColor}) => {
	const player = players[n];
	return (
		<Wraper row>
			<Picker selected={player.isBot} onValueChange={
				(value)=>console.log(`${value} pressed -> onValueChange`)
			}>
				<Text style={{fontSize: 30, color: 'white'}} value={false}> Jogador </Text>
				<Text style={{fontSize: 30, color: 'white'}} value={true}> Computador </Text>
				
			</Picker>
			{console.log(player.color)}
			<Picker 
				row 
				style={{flexWrap: 'wrap', padding: 5}}
				selected={player.color} 
				onValueChange={
					(value)=>changeColor(value, n)
			}>
				{
					colors.map((color, i)=>
						<ColorBlock color={color} value={color} key={i}/>
					)
				}
			</Picker>
		</Wraper>
	)
}

const mapStateToProps = ({board: {players}}, {n}) => ({players: players});

const mapDispatchToProps = (dispatch) => ({
	changeColor: (i, color) => dispatch(changeColor(i, color))
})

export default connect(mapStateToProps, mapDispatchToProps)( PlayerConfig );