import React, { Component } from 'react';
import ApplicationStack from './src/route/ApplicationStack';
import {Provider} from 'react-redux'
import store from './src/components/redux/store'

class App extends Component{
render(){
  return (
    <Provider store = {store}>
      <ApplicationStack/>
    </Provider>
  )};
}
export default App;
