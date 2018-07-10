import React, {Component, Fragment} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';

const mapStateToProps = ({board: {players, currentPlayer, gameEnded, classification}}) => (
	{
		players, currentPlayer, gameEnded, classification,
		isDraw: classification.length > 0 && classification[0].length > 1,
	}
);

export default connect(mapStateToProps)(
	({players, currentPlayer, gameEnded, classification, isDraw}) => {
		if(gameEnded){
			return (
				<View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
				{
					isDraw&&<Text style={{color: "white", fontSize: 75}}> EMPATE! </Text>
				}
				{
					!isDraw&&
					<View style={{flex: 1, flexDirection: "row", justifyContent: "center", 
								alignItems: "center", padding: 20}}>
						<View style={{justifyContent: "center", alignItems: "center"}}>
							<Text style={{color: "white", fontSize: 50}}> VENCEDOR: </Text>
						</View>
						<View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
							<View style={{
								height: "50%", 
								aspectRatio: 1, 
								backgroundColor: classification[0][0].color,
							}}
							/>
						</View>
					</View>
				}
					
				</View>
			)
		}

		return(
			<View style={{flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
				<View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
					<View style={{width: "50%", aspectRatio: 1, backgroundColor: players[currentPlayer].color}} />
				</View>
				<View style={{flex:1, height: "50%" ,justifyContent: "center", alignItems: "center"}}>
					{
						players.map((player, i) => (
								<Text key={i} style={{color: player.color, fontSize: 45}}> {player.points} </Text>
							)
						)
					}
				</View>
				<View style={{flex:1, height: "50%" ,justifyContent: "center", alignItems: "center"}}>
					{
						players[currentPlayer].isBot?
							<Text style={{color: "white"}}>
								bot
							</Text>
						:
							<Text style={{color: "white"}}>
								human
							</Text> 
					}
				</View>
			</View>
		)
	}
)