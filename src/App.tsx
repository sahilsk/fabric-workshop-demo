
import * as React from 'react';
import './App.css';
import { DefaultButton, IButton } from 'office-ui-fabric-react/lib/Button';
import { SearchBox, SearchBoxBase, ISearchBoxStyleProps, ISearchBoxStyles } from 'office-ui-fabric-react/lib/SearchBox';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { createRef, styled, BaseComponent } from 'office-ui-fabric-react/lib/Utilities';

// Initialize Icons
initializeIcons();

// Put consts in file scope
const GAPSPACE = 20;

// Extend BaseComponent to get access to events, async, disposables helpers and better error reporting 
class MyComponent extends BaseComponent {

  // Use supplied createRef to create references
  private _root = createRef<IButton>();

  render() {

    // Use styled function to create variants of existing controls with unique styles and default props
    const MySearchBox = styled(
      SearchBoxBase,
      this._getSearchStyles,
      (props) => {
        return (
          {
            className: 'ms-MySearchBox',
            placeholder: 'Search Something'
          }
        );
      }
    );

    return (
      // wrap application in Fabric to support focus styles and to add default styles
      <Fabric className="App">
        <div className="divider" style={{display: 'flex'}}>

          <DefaultButton
            // Apply ref to componentRef instead of ref
            componentRef={this._root}
            className="myClassName"
            // Any valid id/className/data-*/aria-* value will be passed on to component
            data-foo="hello"
            // onRender functions allow overriding or append/prepending or default renderer 
            onRenderMenuIcon={(props, defaultRender) => {
              return (
                <span>{props!['data-foo']} {defaultRender!()} </span>
              );
            }}
            // all callback functions start with 'on'. Include subject if it is not the root element
            onMenuClick={this._onMenuClick}
            // Child elements often have their entire prop object passed through 
            // rather than duplicating their props in root component
            menuProps={ {
              gapSpace: GAPSPACE,
              items: [
                {
                  key: 'emailMessage',
                  name: 'Email message',
                  icon: 'Mail'
                },
                {
                  key: 'calendarEvent',
                  name: 'Calendar event',
                  icon: 'Calendar'
                }
              ]
            }
            } 
          >
            Click me 
          </DefaultButton>
          
          <Toggle 
            onChanged={this._onToggleChanged}
          />

        </div>
        <div className="divider">
          <SearchBox 
            getStyles={this._getSearchStyles}
          />
        </div>
        
        <MySearchBox />

      </Fabric>
    );
  }

  private _getSearchStyles = (props: ISearchBoxStyleProps): ISearchBoxStyles => {
    const {underlined, theme: { palette }} = props;
    return(
      {
        root: {
          background: !underlined ? palette.neutralTertiary : undefined,
        }
      }
    );
  }

  private _onMenuClick = (ev) => {
    if (ev && ev.shiftKey) {
      // prevent default behavior from occuring (opening and closing of menu)
      ev.preventDefault();
    }
  }

  private _onToggleChanged = (checked) => {
    // Access the referenced button and all of its public methods
    const button = this._root.value!;
    checked ? button.openMenu() : button.dismissMenu();
  }
  
}

export default MyComponent;
