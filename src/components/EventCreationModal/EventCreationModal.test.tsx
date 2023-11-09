import React from 'react';
import ReactDOM from 'react-dom';
import EventCreationModal from './EventCreationModal';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EventCreationModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});