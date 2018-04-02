import { 
  SearchBoxBase, 
  ISearchBoxStyleProps,
  ISearchBoxProps, 
  ISearchBoxStyles } from 'office-ui-fabric-react/lib/SearchBox';
import { styled } from 'office-ui-fabric-react/lib/Utilities';

// Use styled function to create variants of existing controls with unique styles and default props
export const MySearchBox = styled<ISearchBoxProps, ISearchBoxStyleProps, ISearchBoxStyles>(
    SearchBoxBase,
    (stylesProps) => ({}),
    (props) => {
      return (
        {
          className: 'ms-MySearchBox',
          placeholder: 'Search Something'
        }
      );
    }
  );