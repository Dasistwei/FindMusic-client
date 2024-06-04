import React from 'react'
import { Link } from 'react-router-dom';
export const List = ({ list }) => {
  return (
    <ul>
      {list.map((item) => {
        return (
          <li key={item.id}>
            <Link to={item.id}>
              <Link to={`/album/${item.id}`}>{item.id}</Link>
            </Link>
          </li>
        );
      })}
    </ul>
  )
}
