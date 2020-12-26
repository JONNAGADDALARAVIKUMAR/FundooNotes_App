import React from 'react';
import { View, Text } from 'react-native';
import { Drawer } from 'react-native-paper'
import { DrawerContentScrollView } from '@react-navigation/drawer';
import DrawContentStyles from '../../styles/DrawContentStyle';
import {strings} from '../../Languages/strings'

function DrawerContent({props}) {
    return(
        <View style = {{flex: 1}}>
            <Text style = {DrawContentStyles.AppName_Style}>{strings.AppName}</Text>
            <DrawerContentScrollView>
                <Drawer.Section>
                    <Drawer.Item icon = 'lightbulb-outline' label = {strings.Notes} onPress = {() => props.navigation.navigate('Home', { screen: 'Notes' })}/>
                    <Drawer.Item icon = 'bell-outline' label = {strings.Reminders}/>
                </Drawer.Section>
                <Drawer.Section>
                    <Drawer.Item icon = 'plus' label = {strings.Createnewlabel}/>
                </Drawer.Section>
                <Drawer.Section>
                    <Drawer.Item icon = 'archive-arrow-down-outline' label = {strings.Archive}/>
                    <Drawer.Item icon = 'delete' label = {strings.Deleted}/>
                </Drawer.Section>
                <Drawer.Section>
                    <Drawer.Item icon = 'cog-outline' label = {strings.Settings}/>
                    <Drawer.Item icon = 'help' label = {strings.HelpfeedBack}/>
                </Drawer.Section>
            </DrawerContentScrollView>
        </View>
    )
}

export default DrawerContent;