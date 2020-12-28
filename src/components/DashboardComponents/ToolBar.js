import React, { Component } from 'react';
import {View, TouchableOpacity} from 'react-native';
import {strings} from '../../Languages/strings';
import {Appbar, Avatar, Searchbar} from 'react-native-paper';
import DashBoardScreenStyles from '../../styles/DashBoardScreenStyles';

export default class ToolBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listView: true
        }
    }

    changeLayout = async () => {
        const {onPress} = this.props
        if(this.state.changeLayout) {
            await this.setState({
                listView: false
            })
        } else {
            await this.setState({
                listView: true
            })
        }
        //onPress()
    }

    render() {
        return(
            <View>
                <Appbar style = {DashBoardScreenStyles.App_Bar_Style}>
                    <Appbar.Action
                        icon="menu"
                        onPress = {() => this.props.navigation.openDrawer()}
                    />
                    <Searchbar
                        style ={DashBoardScreenStyles.Search_Bar_Style}
                        placeholder = {strings.Search}
                        onChangeText = {data => console.log(data)}
                    />
                    <Appbar.Action 
                        icon = {(this.props.listView) ? 'view-grid-outline' : 'view-agenda-outline'}
                        onPress={this.props.onPress}
                    />
                    <TouchableOpacity 
                        onPress = {() => console.log('Pressed Profile')}
                        >
                        <Avatar.Image
                            size = {35}
                            source = {require("../../assets/profilePic.jpg")}
                            style = {DashBoardScreenStyles.Profile_Style}
                        />
                    </TouchableOpacity>
                </Appbar>
            </View>
        )
    }
}