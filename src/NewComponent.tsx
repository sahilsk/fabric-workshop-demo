
import * as React from 'react';
import { createRef,  BaseComponent, IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton, IButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Toggle, IToggleProps } from 'office-ui-fabric-react/lib/Toggle';
import { 
  SearchBox,
  ISearchBoxProps
} from 'office-ui-fabric-react/lib/SearchBox';
import { items } from './items';
import { NewSearchBox } from './NewSearch';

// Put consts in file scope
const GAPSPACE = 20;
const BEAKWIDTH = 20;

// Extend BaseComponent to get access to events, async, disposables helpers and better error reporting 
export class NewComponent extends BaseComponent {

  // Use supplied createRef to create references
  private _root = createRef<IButton>();

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

          // Child elements often have their entire prop object passed through 
          // rather than duplicating their props in root component
          menuProps={ {
            beakWidth: BEAKWIDTH,
            isBeakVisible: true,
            gapSpace: GAPSPACE, 
            items: items
          }
          }
          
          // onRender functions allow overriding or append/prepending or default renderer 
          onRenderMenuIcon={this._onRenderMenuIcon}

          // all callback functions start with 'on'. Include subject if it is not the root element
          // onClick={}
          onMenuClick={this._onMenuClick}
        />
        
        <Toggle onChanged={this._onToggleChanged} />

        <SearchBox 
          getStyles={this._getSearchStyles}
          placeholder="Search Something"
        />

        <NewSearchBox />

      </React.Fragment>
    );
  }

  // We can reference the specific props interface via IComponentProps['prop']
  private _onRenderMenuIcon: IButtonProps['onRenderText'] = (props, defaultRender) => {
    return (
      <span>{defaultRender!()} {props!['data-foo']}</span>
    );
  }
  
  private _onMenuClick: IButtonProps['onMenuClick'] = (ev) => {
    if (ev && ev.shiftKey) {
      // prevent default behavior from occuring (opening and closing of menu)
      ev.preventDefault();
    }
  }

  private _onToggleChanged: IToggleProps['onChanged'] = (checked) => {
    // Access the referenced button and all of its public methods
    const button = this._root.value!;
    checked ? button.openMenu() : button.dismissMenu();
  }

  // This is for the SearchBox getStyles function. This is the modern theming approach.
  // Props are passed in (including state, theme etc) and SearchBox styles are returned
  private _getSearchStyles: ISearchBoxProps['getStyles'] = (props) => {
    const {underlined, hasFocus, theme: { palette }} = props;
    return(
      {
        icon: 'custom-icon-class',
        clearButton: {
          background: 'white'
        },
        root: [
          'custom-root-class',
          !underlined && hasFocus && {
            background: 'pink'
          }
        ]
      }
    );
  }
  
}
