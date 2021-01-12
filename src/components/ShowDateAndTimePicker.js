import React, { Component } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {View, Text, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default class ShowDateAndTimePicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            today: null,
            tommorow: null,
            monday: null,
            date: null,
            showCalender: false,
            mode: null,
            showWatch: false,
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            showDateLabel: 'Today',
            showTimeLabel: 'Morning        8:00 AM',
            errorMessage: ''
        }
    }

    componentDidMount = () => {
        const today = new Date()
        const tommorow = new Date()
        tommorow.setDate(tommorow.getDate() + 1)
        var monday = new Date();
        if(monday.getDay() == 1) {
            monday.setDate(monday.getDate() + ((1 + 7 - monday.getDay()) % 7) + 7) 
        } else {
            monday.setDate(monday.getDate() + (1 + 7 - monday.getDay()) % 7);
        }

        this.setState({
            today: today,
            tommorow: tommorow,
            monday: monday,
            date: today
        })
    }

    inputDateHandler = async (inputValue) => {
        if(inputValue == 100) 
        {
            this.setState({
                showCalender: true
            })
        } else {
            this.state.date.setDate(inputValue.getDate())
            let showDateLabel = this.state.months[this.state.date.getMonth()] + '   ' + this.state.date.getDate()
            this.setState({
                showDateLabel: showDateLabel
            })
        }
    }

    inputTimeHandler = async (inputValue) => {
        if(inputValue == 200) 
        {
            this.setState({
                showWatch: true
            })
        } else {
            await this.state.date.setHours(inputValue)
            await this.state.date.setMinutes(0)
            await this.state.date.setSeconds(0)
            
            let showTimeLabel = String(this.state.date.getHours()) +':'+ String(this.state.date.getMinutes() + '0')
            this.setState({
                showTimeLabel: showTimeLabel
            })
        }
    }

    onSelectingDate = async (event, selectedDate) => {
        if(event.type != 'dismissed') {
            const currentDate = selectedDate;
            this.setState({
                date: currentDate,
                showCalender: false,
            }, async () => {
                await this.setState({
                    showDateLabel: this.state.months[this.state.date.getMonth()] + '   ' + this.state.date.getDate()
                })
            })
        } else {
            this.setState({
                showCalender: false
            })
        }
    }

    dismissCalender = () => {
        this.setState({
            showCalender: false
        })
    }

    onSelectingTime = async (event, selectedTime) => {
        if(event.type != 'dismissed') {
            const currentTime = selectedTime;
            await this.state.date.setHours(currentTime.getHours())
            await this.state.date.setMinutes(currentTime.getMinutes())
            await this.state.date.setSeconds(currentTime.getSeconds())
            let showTimeLabel = String(this.state.date.getHours()) +':'+ String((this.state.date.getMinutes() < 9) ? '0' + this.state.date.getMinutes() : this.state.date.getMinutes())
            this.setState({
                showWatch: false,
                showTimeLabel: showTimeLabel
            })
        } else {
            this.setState({
                showWatch: false
            })
        }
    }

    dismissWatch = () => {
        this.setState({
            showWatch: false
        })
    }

    render() {
        return (
            <View>
                <Text style = {{marginBottom: 20}}>
                    Add Remainder
                </Text>
                <Text style = {{textAlign: 'center'}}>
                    Time
                </Text>
                <Picker

                    selectedValue = {this.state.showDateLabel}
                    onValueChange = {(selectedUnit) => this.inputDateHandler(selectedUnit)}
                    mode = "dropdown">                            
                        <Picker.Item label = {this.state.showDateLabel} value = {this.state.today} key = {1}/>
                        <Picker.Item label = {'Tomorrow'} value = {this.state.tommorow} key = {2}/>
                        <Picker.Item label = {'next Monday'} value = {this.state.monday} key = {3}/>
                        <Picker.Item label = {'select a Date..'} value = {100} key = {4}/> 
                </Picker>
                <Picker
                    selectedValue = {this.state.showTimeLabel}
                    onValueChange = {(selectedUnit) => this.inputTimeHandler(selectedUnit)}
                    mode = "dropdown">                            
                        <Picker.Item label = {this.state.showTimeLabel} value = {8} key = {1}/>
                        <Picker.Item label = {'AfterNoon    1:00 PM'} value = {13} key = {2}/>
                        <Picker.Item label = {'Evening        6:00 PM'} value = {18} key = {3}/>
                        <Picker.Item label = {'Night            8:00 PM'} value = {20} key = {4}/>
                        <Picker.Item label = {'Select a Time..'} value = {200} key = {5}/> 
                </Picker>
                {(this.state.errorMessage != '') ?
                (<Text>
                    Selected Time Passed
                </Text>)
                : null }
                <View style = {{flexDirection: 'row', justifyContent: 'space-around', marginLeft: '30%', marginTop: '5%'}}>
                    <TouchableOpacity
                        >
                        <Text style = {{width: 80, height: 30, textAlign: 'center', textAlignVertical: 'center'}}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress = {() => this.props.setTime(this.state.date)}>
                        <Text style = {{backgroundColor: '#f58cd0', width: 80, height: 30, textAlign: 'center', textAlignVertical: 'center', borderRadius: 5}}>
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>
                {this.state.showCalender ? (
                <DateTimePicker
                    value = {new Date()}
                    mode = {'date'}
                    onTouchCancel = {this.dismissCalender}
                    onChange = {this.onSelectingDate}
                />)
                : null}

                {this.state.showWatch ? (
                <DateTimePicker
                    value = {new Date()}
                    mode = {'time'}
                    onTouchCancel = {this.dismissWatch}
                    onChange = {this.onSelectingTime}
                />)
                : null}
            </View>
        )
    }
}