
import * as React from 'react';
import './App.css';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { MyComponent } from './NewComponent';

// Initialize Icons
initializeIcons();

class App extends React.Component {
  render() {
    return (
      <Fabric className="App">
        <MyComponent />
      </Fabric>
    );
  }
}

export default App;
