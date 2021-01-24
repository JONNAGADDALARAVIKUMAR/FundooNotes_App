import React, { Component } from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Appbar, Avatar} from 'react-native-paper';
import DashBoardScreenStyles from '../../styles/DashBoardScreenStyles';
import UserServices from '../../../services/UserServices'

export default class ToolBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listView: true,
            showProfile: false,
            photoURL: this.props.photoURL
        }
    }

    componentDidMount = async () => {
        await UserServices.getDetails()
        .then(async details => {
            if(details.imageURL != undefined) {
                await this.setState({
                    photoURL : details.imageURL
                })
            } else {
                await this.setState({
                    photoURL : ''
                })
            }
        })
        .catch(async error => {
            if(error.code == 'storage/object-not-found') {
                await this.setState({
                    photoURL : ''
                })
            }
        })
    }

    componentWillUnmount() {
        this.setState = (state,callback) => {
            return;
        };
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

    navigateToSearchScreen = () => {
        this.props.navigation.push('SearchScreen')
    }

    render() {
        return(
            <View>
                <Appbar style = {DashBoardScreenStyles.App_Bar_Style}>
                    <Appbar.Action
                        icon = "menu"
                        onPress = {this.openDrawer}
                    />
                    <TouchableOpacity onPress = {this.navigateToSearchScreen}>
                        <Text style = {DashBoardScreenStyles.Search_Style}>
                            Search Your Notes
                        </Text>
                    </TouchableOpacity>
                    <Appbar.Action 
                        icon = {(this.props.listView) ? 'view-agenda-outline' : 'view-grid-outline'}
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