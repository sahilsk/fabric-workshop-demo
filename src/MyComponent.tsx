
import * as React from 'react';
import { createRef,  BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton, IButton } from 'office-ui-fabric-react/lib/Button';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { 
  SearchBox, 
  ISearchBoxStyleProps, 
  ISearchBoxStyles } from 'office-ui-fabric-react/lib/SearchBox';
import { MySearchBox } from './MySearch';

// Put consts in file scope
const GAPSPACE = 20;

// Extend BaseComponent to get access to events, async, disposables helpers and better error reporting 
export class MyComponent extends BaseComponent {

  // Use supplied createRef to create references
  private _root = createRef<IButton>();

  render() {
 
    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-around', marginBottom: 50}}>

          <DefaultButton
            // Apply ref to componentRef instead of ref
            componentRef={this._root}
            styles={{
              rootHovered: {
                boxShadow: '4px 4px 4px black'
              }
            }}
            text="Click Me"
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

          <SearchBox 
            getStyles={this._getSearchStyles}
            placeholder="Search Something"
          />

          <MySearchBox />
        </div>
        
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

  private _onMenuClick = (ev: React.MouseEvent<HTMLElement>) => {
    if (ev && ev.shiftKey) {
      // prevent default behavior from occuring (opening and closing of menu)
      ev.preventDefault();
    }
  }

  private _onToggleChanged = (checked: boolean) => {
    // Access the referenced button and all of its public methods
    const button = this._root.value!;
    checked ? button.openMenu() : button.dismissMenu();
  }
  
}
