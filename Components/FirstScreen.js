import React, {Component, Fragment} from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';

import mouse from '../blackWhite.png'

export default () => {
	return (
		<View style={{
            flex: 1, 
            backgroundColor: "#263238", 
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            
            <Text style={{
                fontSize: 90, 
                fontWeight: "900",
                color: "white",
                fontFamily: "monospace",   
                marginBottom: 40,
                textShadowColor: '#212121',
  				textShadowOffset: {width: 10, height: 10},
 				textShadowRadius: 10

            }}>
                Timbiriche
            </Text>
            <View style={{elevation: 10, height: 250, width: 210}}>
	            <Image
	            	source={mouse} 
	                style={{
	                	width: 210, 
	                	height: 250, 
	                	borderWidth: 1,
	                }}
	            />
	           </View>

            <TouchableWithoutFeedback
			  onPress={()=>console.log("clicked")}
			  style={{
			  	shadowOffset:{  width: 50,  height: 10,  },
				shadowColor: 'black',
			  }}
			>	
				<View  
					style={{
						backgroundColor: "#212121", 
						height: 100, 
						width: 300, 
						borderWidth: 2, 
						borderColor: "white",
						borderRadius: 30, 
						marginTop: 40,
						justifyContent: 'center',
            			alignItems: 'center',
            			elevation: 10
					}}
				>
					<Text 
						style={{
							fontSize: 40,
  							color: "white",
						}}
					> 
						Jogar 
					</Text>
				</View>
			</TouchableWithoutFeedback>
	
      
        	<TouchableWithoutFeedback
			  onPress={()=>console.log("clicked")}
			>
				<View  
					style={{
						backgroundColor: "#212121", 
						height: 100, 
						width: 300, 
						borderWidth: 2, 
						borderColor: "white",
						borderRadius: 30, 
						marginTop: 40,
						justifyContent: 'center',
            			alignItems: 'center',
            			elevation: 10
					}}
				>
					<Text 
						style={{
							fontSize: 40,
  							color: "white",
						}}
					> 
						Sobre 
					</Text>
				</View>
			</TouchableWithoutFeedback>
		

        </View>
    )
}