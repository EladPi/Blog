//Represent a full list of posts/subjects/forums

import React from 'react';
import ListElement from './ListElement'; // Ensure that this component is created
import '../../styles/FullList.css';

function FullList({ items, type }) {
  // 'items' is the array of posts/subjects/forums to be displayed
  // 'type' helps us conditionally render UI or logic specific to posts/subjects/forums if needed

  return (
    <div className="full-list">
      <h2 className="list-title">{type}</h2>
      <ul className="list">
        {items.map(item => (
          <ListElement key={item.id} item={item} type={type} />
        ))}
      </ul>
    </div>
  );
}

export default FullList;
