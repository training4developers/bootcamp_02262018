import * as React from 'react';
import * as PropTypes from 'prop-types';

export const ToolHeader = props => <header>
  <h1>{props.headerText}</h1>
</header>;

ToolHeader.propTypes = {
  headerText: PropTypes.string,
};

ToolHeader.defaultProps = {
  headerText: 'Tool Header',
};

// export class ToolHeader extends React.Component {

//   static propTypes = {
//     headerText: PropTypes.string,
//   };

//   static defaultProps = {
//     headerText: 'Tool Header',
//   };

//   render() {
//     return <header>
//       <h1>{this.props.headerText}</h1>
//     </header>;
//   }

// }