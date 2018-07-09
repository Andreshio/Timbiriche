import React, {Fragment} from 'react';
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

const mapStateToProps = ({board: {tiles, hitArea}}) => ({tiles, hitArea});

export default connect(mapStateToProps)(
  ({tiles, hitArea}) => {
    return (
      <View style={{...style, padding: hitArea}}>
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
)
