import React, { useState } from "react";

const ListGroup = ({ items, selectedItem, onItemSelect }) => {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item._id}
          className={
            selectedItem === item.name
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onItemSelect(item.name)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
