
import * as React from 'react';
import { createRef,  BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton, IButton } from 'office-ui-fabric-react/lib/Button';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { 
  SearchBox, 
  ISearchBoxStyleProps, 
  ISearchBoxStyles, 
  ISearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { MySearchBox } from './MySearch';

// Put consts in file scope
const GAPSPACE = 20;
const BEAKWIDTH = 20;

// Extend BaseComponent to get access to events, async, disposables helpers and better error reporting 
export class MyComponent extends BaseComponent {

  // Use supplied createRef to create references
  private _root = createRef<IButton>();
  private _search = createRef<ISearchBox>();

  render() {
 
    return (
      <React.Fragment>

        <DefaultButton
          // Apply ref to componentRef instead of ref
          componentRef={this._root}

          // Several components still use the "styles" prop, which takes a flat object of styles.
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
          // onClick={}
          onMenuClick={this._onMenuClick}

          // Child elements often have their entire prop object passed through 
          // rather than duplicating their props in root component
          menuProps={ {
            beakWidth: BEAKWIDTH,
            isBeakVisible: true,
            gapSpace: GAPSPACE,
            shouldFocusOnMount: false,
            onMenuOpened: () => console.log(this._search.value) && this._search.value && this._search.value.focus(),
            items: [
              {
                key: 'mySearch',
                onRender: (props) => (
                  <SearchBox 
                    key={props.key}
                    componentRef={this._search}
                    getStyles={this._getSearchStyles}
                    placeholder="Search Something"
                  />
                )
              },
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
      </React.Fragment>
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

  // This is for the SearchBox getStyles function. This is the modern theming approach.
  // Props are passed in (including state, theme etc) and SearchBox styles are returned
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
  
}
