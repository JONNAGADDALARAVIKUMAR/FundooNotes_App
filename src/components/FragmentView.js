import React, { Component, Fragment } from 'react'
import {View, Text} from 'react-native'

export default class FragmentView extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View>
                <View>
                    <Text>
                        Hello BridgeLabz
                    </Text>
                    <Text>
                        Hello BridgeLabz
                    </Text>
                    <Text>
                        Hello BridgeLabz
                    </Text>
                </View>
                <React.Fragment>
                    <Text>
                        Hello BridgeLabz
                    </Text>
                    <Text>
                        Hello BridgeLabz
                    </Text>
                    <Text>
                        Hello BridgeLabz
                    </Text>
                </React.Fragment>
            </View>
        )
    }
}