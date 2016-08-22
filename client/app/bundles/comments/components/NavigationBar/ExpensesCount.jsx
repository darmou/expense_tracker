import React, {PropTypes} from 'react';

const href = 'https://github.com/shakacode/react_on_rails/blob/master/README.md#multiple-react-' +
  'components-on-a-page-with-one-store';
const ExpensesCount = (props) => (
  <li>
    <a id='js-comment-count' href={href}>
      Expenses: {props.expensesCount}
    </a>
  </li>
);

ExpensesCount.propTypes = {
  expensesCount: PropTypes.number.isRequired,
};

export default ExpensesCount;
