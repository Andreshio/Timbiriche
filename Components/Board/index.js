import React, {Component, Fragment} from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import MinRow from './MinRow';

const style = {
  width: "100%",
  aspectRatio: 1, 
  justifyContent: "center", 
  alignItems: "center",
  //backgroundColor: "#ECEFF1",
}

const mapStateToProps = ({board: {
    tiles, hitArea, players, currentPlayer}
  }) => ({
    tiles, hitArea,
    isBot: players[currentPlayer].isBot,
  }
);


export default connect(mapStateToProps)(
  class extends Component {
    render(){
      const {tiles, hitArea} = this.props;
      return (
        <View style={{...style}}>
          {
            tiles.map((row, i) =>
              <Fragment key={i}>
                <MinRow i={i} row={row} show />
                <MinRow i={i} row={row} show isBig />
                <MinRow i={i+1} row={row} show={i===tiles.length-1} />
              </Fragment>
            )
          }
        </View>
      )
    }
  }
)
