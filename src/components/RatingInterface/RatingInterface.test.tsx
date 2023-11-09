import React from 'react';
import ReactDOM from 'react-dom';
import RatingInterface from './RatingInterface';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RatingInterface />, div);
  ReactDOM.unmountComponentAtNode(div);
});