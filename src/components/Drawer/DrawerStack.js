import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashBoard from '../DashboardComponents/DashBoardScreen';
import DrawerContent from './DrawerContent';
import DeletedNotesScreen from '../DashboardComponents/DeletedNotesScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return(
        <Drawer.Navigator drawerContent = {props => <DrawerContent props = {props} />}>
            <Drawer.Screen name = "Notes" component = {DashBoard}/>
            <Drawer.Screen name = "Deleted" component = {DeletedNotesScreen}/>
        </Drawer.Navigator>
    )
}

export default DrawerNavigator; 