import React, {Component, Fragment} from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

import { Wraper } from './Styled/';

export default class extends Component {
	constructor(){
		super();
		this.state = {
			onSelect: false,
		}
	}
	select = (element) => {
		if(this.props.onValueChange){
			this.props.onValueChange(element.props.value);
		} else {
			console.log("onValueChange needed");
		}
		this.setState({...this.state, onSelect: false});
	}

	turnTouchable = (element, i) => (
		<TouchableWithoutFeedback 
			key={i} 
			//disabled={!this.state.onSelect}
			onPress={()=>{
				if(this.state.onSelect){
					this.select(element);
				} else {
					this.setState({...this.state, onSelect: true})
				}
				
			}}
		> 
			<View> 
				{element}
			</View>
		</TouchableWithoutFeedback>
	)

	render(){
		const {children, selected} = this.props;
		return (
	
			<Wraper {...this.props} style={{
				...this.props.style,
				borderColor: this.state.onSelect?"white": "transparent",
				borderWidth: 5,
			}}>
				{
					React.Children.map(children, (c,i)=>{
						if(c.props.value === selected){
							return this.turnTouchable(c, i);
						}
						return this.state.onSelect? this.turnTouchable(c, i) : null;
					})
				}
			</Wraper>

		)
	}
}