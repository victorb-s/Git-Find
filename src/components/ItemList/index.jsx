import React from 'react';
import './styles.css';

const ItemList = ({href, title, description}) => {
  return (
    <div className="item-list">
      <a href={href} rel="noreferrer" target="_blank"><strong>{title}</strong></a>
      <p>{description}</p>
      <hr />
    </div>
  )
}

export { ItemList };