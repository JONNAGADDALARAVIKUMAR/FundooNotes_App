import React, { Component } from 'react';
import {View, TouchableOpacity} from 'react-native';
import strings from '../../language/Languages';
import {Appbar, Avatar, Searchbar} from 'react-native-paper';
import DashBoardScreenStyles from '../../styles/DashBoardScreenStyles';

export default class ToolBar extends Component {
    constructor() {
        super();
        this.state = {
            
        }
    }
    render() {
        return(
            <View>
                <Appbar style = {DashBoardScreenStyles.App_Bar_Style}>
                        <Appbar.Action
                            icon="menu"
                            onPress={() => console.log('Pressed Menu')}
                        />
                        <Searchbar
                            style ={DashBoardScreenStyles.Search_Bar_Style}
                            placeholder = {strings.Search}
                            onChangeText = {data => console.log(data)}
                        />
                        <Appbar.Action icon = { (this.state.changeLayout ) ? "view-agenda-outline" : "view-grid-outline"} onPress  ={() => {
                            if(this.state.changeLayout) {
                                this.setState({
                                changeLayout: false
                            })} else {
                                this.setState({
                                    changeLayout: true
                                })
                            }
                            console.log('Layout Changed')}}
                        />
                        <TouchableOpacity onPress = {() => console.log('Pressed Profile')}>
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