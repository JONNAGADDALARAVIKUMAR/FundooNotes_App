import React from 'react';
import { View, Text } from 'react-native';
import { Drawer } from 'react-native-paper'
import { DrawerContentScrollView } from '@react-navigation/drawer';
import DrawContentStyles from '../../styles/DrawContentStyle'

function DrawerContent({props}) {
    return(
        <View style = {{flex: 1}}>
            <Text style = {DrawContentStyles.AppName_Style}>Fundoo Notes</Text>
            <DrawerContentScrollView>
                <Drawer.Section>
                    <Drawer.Item icon = 'lightbulb-outline' label = 'Notes' onPress = {() => props.navigation.navigate('Home', { screen: 'Notes' })}/>
                    <Drawer.Item icon = 'bell-outline' label = 'Reminders'/>
                </Drawer.Section>
                <Drawer.Section>
                    <Drawer.Item icon = 'plus' label = 'Create new label'/>
                </Drawer.Section>
                <Drawer.Section>
                    <Drawer.Item icon = 'archive-arrow-down-outline' label = 'Archive'/>
                    <Drawer.Item icon = 'delete' label = 'Deleted'/>
                </Drawer.Section>
                <Drawer.Section>
                    <Drawer.Item icon = 'cog-outline' label = 'Settings'/>
                    <Drawer.Item icon = 'help' label = {'Help & feedBack'}/>
                </Drawer.Section>
            </DrawerContentScrollView>
        </View>
    )
}

export default DrawerContent;