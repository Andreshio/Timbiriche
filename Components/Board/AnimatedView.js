import React, {Component} from 'react';
import { Animated, View, Easing } from 'react-native'; 

export default class extends Component {
  constructor () {
    super()
    this.colorValue = new Animated.Value(0);
    this.animationSpeed = 1000;
  }
 
  componentDidUpdate(){
    if(this.props.isLast){
      this.spinUp()
    }
  }
  spinUp = () => {
    //console.log("on spin");
    //this.colorValue.setValue(0)
    Animated.timing(
      this.colorValue,
      {
        toValue: 1,
        duration: this.animationSpeed,
        easing: Easing.ease,
        //easing: Easing.linear
      }
    ).start(() => this.spinDown())
  }
  spinDown = () => {
    //this.colorValue.setValue(1)
    Animated.timing(
      this.colorValue,
      {
        toValue: 0,
        duration: this.animationSpeed,
        easing: Easing.ease,
        //easing: Easing.linear
      }
    ).start(() => this.props.isLast && this.spinUp())
  }
  render () {
    const color = this.colorValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["#263238", this.props.playerColor]
    })
    return (
      <Animated.View
        style={{
          ...this.props.style,
          backgroundColor: this.props.isLast? color : this.props.isSelected? "#263238" : "white",
          //transform: [{rotate: spin}] }}
        }}
      />
    )
  }

}
