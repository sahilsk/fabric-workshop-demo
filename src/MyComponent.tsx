
import * as React from 'react';
import { DefaultButton, IButton } from 'office-ui-fabric-react/lib/Button';
import { 
  SearchBox, 
  ISearchBoxStyleProps, 
  ISearchBoxStyles } from 'office-ui-fabric-react/lib/SearchBox';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { createRef,  BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { MySearchBox } from './MySearch';

// Put consts in file scope
const GAPSPACE = 20;

// Extend BaseComponent to get access to events, async, disposables helpers and better error reporting 
export class MyComponent extends BaseComponent {

  // Use supplied createRef to create references
  private _root = createRef<IButton>();

  render() {
 
    return (
      // wrap application in Fabric to support focus styles and to add default styles
      <div>
        <div style={{display: 'flex', marginBottom: 50}}>

          <DefaultButton
            text="Click Me"
            // Apply ref to componentRef instead of ref
            componentRef={this._root}
            // flag props should describe the non standard state. 
            // This way we don't need to state true or false, and it works just like HTML properties
            primary
            // Any valid id/className/data-*/aria-* value will be passed on to component
            className="myClassName"          
            data-foo="*"
            // onRender functions allow overriding or append/prepending or default renderer 
            onRenderMenuIcon={(props, defaultRender) => {
              return (
                <span>{defaultRender!()} {props!['data-foo']}</span>
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
          />
          
          <Toggle onChanged={this._onToggleChanged} />

        </div>

        <SearchBox 
            getStyles={this._getSearchStyles}
            placeholder="Search Something"
        />

        <MySearchBox />
        
      </div>
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
