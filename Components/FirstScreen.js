import React, {Component, Fragment} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import { Button } from 'react-native-material-ui';

import mouse from '../mouseWhite.png'

export default () => {
	return (
		<View style={{
            flex: 1, 
            backgroundColor: "#263238", 
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Image 
            	source={mouse} 
                style={{width: 150, height: 150, marginBottom: 50}}
            />
            <Text style={{
                fontSize: 80, 
                color: "white",
                fontFamily: "monospace",   
                marginBottom: 50,
            }}>
                Timbiriche
            </Text>

           	{ /* <Button text="Primary" /> */}

            <TouchableOpacity
			  onPress={()=>console.log("clicked")}
			  style={{height: 100, width: 300, backgroundColor: "#841584"}}
			  title="Learn More"
			  accessibilityLabel="Learn more about this purple button"
			/>

      
            <View style={{backgroundColor: "black", height: 100, width: 300, marginTop: 30}} />
        	<View style={{backgroundColor: "black", height: 100, width: 300, marginTop: 30}} />

        </View>
    )
}