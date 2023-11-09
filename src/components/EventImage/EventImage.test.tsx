import React from 'react';
import ReactDOM from 'react-dom';
import EventImage from './EventImage';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EventImage />, div);
  ReactDOM.unmountComponentAtNode(div);
});