import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashBoard from '../DashboardComponents/DashBoardScreen';
import DrawerContent from './DrawerContent';
import DeletedNotesScreen from '../DashboardComponents/DeletedNotesScreen';
import ArchivedNotesScreen from '../DashboardComponents/ArchivedNotesScreen';
import LabelScreen from '../DashboardComponents/LabelScreen';
import RemainderScreen from '../DashboardComponents/RemainderScreen'

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return(
        <Drawer.Navigator drawerContent = {props => <DrawerContent props = {props} />}>
            <Drawer.Screen name = "Notes" component = {DashBoard}/>
            <Drawer.Screen name = "Deleted" component = {DeletedNotesScreen}/>
            <Drawer.Screen name = "Archived" component = {ArchivedNotesScreen}/>
            <Drawer.Screen name = "Label" component = {LabelScreen}/>
            <Drawer.Screen name = "Remainder" component = {RemainderScreen}/>
        </Drawer.Navigator>
    )
}

export default DrawerNavigator; 