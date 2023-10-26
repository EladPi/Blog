import React from 'react';
import '../../styles/ListElement.css';
import { Link } from 'react-router-dom';
import { slugify } from '../../utils/slugify';

function ListElement({ item, type }) {
  let navigateToPath = "";

  if (type === 'Forums') {
    navigateToPath = `/${slugify(item.id)}`;
  } 
  else if (type === 'Subjects') {
    // Assuming a structure where posts are identified by subject ID
    navigateToPath = `/${slugify(item.forumId)}/${slugify(item.id)}`;
  }

  return (
    <Link to={navigateToPath} className='list-element-link'>
      <li className="list-element">
        <h3>{item.name}</h3>
        <p className='item-description'>
          {item.description}
        </p>
      </li>
    </Link>
  );
}

export default ListElement;
