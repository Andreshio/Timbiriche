import React, {Component} from 'react';
import { Animated, View, Easing } from 'react-native'; 

export default class extends Component {
  constructor () {
    super()

    this.colorValue = new Animated.Value(0);
    //this.animationSpeed = this.props.isLast?750:250;
  }
 
  componentDidUpdate(){
    if(this.props.isLast){
      this.spinUp()
    }
  }
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.isLast !== this.props.isLast || nextProps.isSelected !== this.props.isSelected
  }

  spinUp = () => {
    if(this.props.isLast){
      Animated.timing(
        this.colorValue,
        {
          toValue: 1,
          duration: this.props.isLast?750:250,
          easing: Easing.ease,
        }
      ).start(this.spinDown)
    }
  }
  spinDown = () => {
    Animated.timing(
      this.colorValue,
      {
        toValue: 0,
        duration: this.props.isLast?750:250,
        easing: Easing.ease,
      }
    ).start(this.spinUp);
  }
  render () {
    const color = this.colorValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.70]
    })
    return (
      <Animated.View
        style={{
          ...this.props.style,
          backgroundColor: this.props.isSelected? "#263238" : "white",
          opacity: color,
          //transform: [{rotate: spin}] }}
        }}
      />
    )
  }

}
