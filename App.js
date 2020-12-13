import React, { Component } from 'react';
import SignUpScreen from './src/components/SignUpScreen';
import LogInScreen from './src/components/LogInScreen';

class App extends Component{
render(){
  return (
    // <SignUpScreen
    //   AppName = {'Fundo Notes'}
    //   ScreenType = {'Create Account'}/>
    <LogInScreen AppName = {'Fundo Notes'}/>
  )};
}
export default App;
