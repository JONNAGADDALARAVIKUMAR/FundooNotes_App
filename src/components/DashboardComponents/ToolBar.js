import React, { Component } from 'react';
import {View, TouchableOpacity} from 'react-native';
import {strings} from '../../Languages/strings';
import {Appbar, Avatar, Searchbar} from 'react-native-paper';
import DashBoardScreenStyles from '../../styles/DashBoardScreenStyles';
import UserServices from '../../../services/UserServices'

export default class ToolBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listView: true,
            showProfile: false,
            photoURL: ''
        }
    }

    componentDidMount = async () => {
        await UserServices.getProfileUrl()
        .then(url => {
            this.setState({
                photoURL: url
            })
        })
        .catch(error => {
            if(error.code == 'storage/object-not-found') {
                this.setState({
                    photoURL : ''
                })
            }
            console.log(error);
        })
    }

    changeLayout = () => {
        const {onPress} = this.props
        if(this.state.changeLayout) {
            this.setState({
                listView: false
            })
        } else {
            this.setState({
                listView: true
            })
        }
        //onPress()
    }

    openDrawer = () => {
        const {onPress} = this.props
        this.props.navigation.openDrawer()
        //onPress();
    }

    render() {
        return(
            <View>
                <Appbar style = {DashBoardScreenStyles.App_Bar_Style}>
                    <Appbar.Action
                        icon = "menu"
                        onPress = {this.openDrawer}
                    />
                    <Searchbar
                        style ={DashBoardScreenStyles.Search_Bar_Style}
                        placeholder = {strings.Search}
                        //onChangeText = {data => console.log(data)}
                    />
                    <Appbar.Action 
                        icon = {(this.props.listView) ? 'view-grid-outline' : 'view-agenda-outline'}
                        onPress={this.props.onPress}
                    />
                    <TouchableOpacity 
                        onPress = {this.props.handleProfile}
                        >
                        <Avatar.Image
                            size = {35}
                            source = {(this.state.photoURL != '') ? {uri: this.state.photoURL}: require('../../assets/defaultProfileImage.jpg')}
                            style = {DashBoardScreenStyles.Profile_Style}
                        />
                    </TouchableOpacity>
                </Appbar>
            </View>
        )
    }
}