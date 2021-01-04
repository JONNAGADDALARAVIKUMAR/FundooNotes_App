import React from 'react';
import {shallow} from 'enzyme';
import DrawerContent from '../src/components/Drawer/DrawerContent';
import {Drawer} from 'react-native-paper'

describe('test DrawerContent', () => {
    it('should match to snapshot', () => {
        const component = shallow(<DrawerContent />)
        expect(component).toMatchSnapshot();
    })

    it('test all icons from Drawer Navigation', () => {
        const component = shallow(<DrawerContent/>)
        expect(component.find(Drawer.Item).at(0).props().icon).toEqual('lightbulb-outline')
        expect(component.find(Drawer.Item).at(1).props().icon).toEqual('bell-outline')
        expect(component.find(Drawer.Item).at(2).props().icon).toEqual('plus')
        expect(component.find(Drawer.Item).at(3).props().icon).toEqual('archive-arrow-down-outline')
        expect(component.find(Drawer.Item).at(4).props().icon).toEqual('delete')
        expect(component.find(Drawer.Item).at(5).props().icon).toEqual('cog-outline')
        expect(component.find(Drawer.Item).at(6).props().icon).toEqual('help')      
    })

    // it('test onPress event of notes icon button it will navigate to notes screen', async () => {
    //     const navigation = { push : jest.fn() }
    //     const onPressEvent = jest.fn();
    //     const component = shallow(<DrawerContent onPress = {onPressEvent} navigation = {navigation}/>)
    //     const instance = component.instance();
    //     instance.navigateToHome();
    //     expect(onPressEvent).toHaveBeenCalled();
    //     //expect(instance.props.props.navigation.push.push).toBeCalledWith('Home', { screen: 'Notes' })
    // })

    // it('test onPress event of deleted icon button it will navigate to deleted screen', async () => {
    //     const navigation = { push : jest.fn() }
    //     const onPressEvent = jest.fn();
    //     const component = shallow(<DrawerContent onPress = {onPressEvent} navigation = {navigation}/>)
    //     const instance = component.instance();
    //     await instance.handleDeletedIconButton();
    //     expect(onPressEvent).toHaveBeenCalled();
    //     expect(instance.state.listView).toBe(false);
    //     //expect(instance.props.props.navigation.push).toBeCalledWith('Home', { screen: 'Deleted' })
    // })
})