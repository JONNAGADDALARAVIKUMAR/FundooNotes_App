import React, { Component } from 'react';
import ApplicationStack from './src/route/ApplicationStack';
import DeletedNotesScreen from './src/components/DashboardComponents/DeletedNotesScreen';

class App extends Component{
render(){
  return (
    <ApplicationStack/>
    //<DeletedNotesScreen/>
  )};
}
export default App;
