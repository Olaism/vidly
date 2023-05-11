import React, { useState } from "react";

const ListGroup = ({ items, currentItem, onItemChange }) => {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item._id}
          className={
            currentItem === item.name
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onItemChange(item.name)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
