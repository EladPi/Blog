import ListElement from './ListElement';
import '../../styles/FullList.css';

function FullList({ items, type }) {
  // 'items' is the array of posts/subjects/forums to be displayed
  // 'type' helps conditionally render UI or logic specific to subjects/forums.

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
