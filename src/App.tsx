
import * as React from 'react';
import './App.css';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

// Initialize Icons
initializeIcons();

class App extends React.Component {
  render() {
    return (
       // wrap application in Fabric to support focus styles and to add default styles
      <Fabric className="App">
      <br/>
      </Fabric>
    );
  }
}

export default App;
