import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

export const PaginationComp =({pages,active,handleOnPagination})=>{
    // let active = 2;
let items = [];
for (let number = 1; number <= pages; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active} onClick={()=>handleOnPagination(number)}>
      {number}
    </Pagination.Item>,
  );
}
    return (
        <div>
          <Pagination>{items}</Pagination>
          <br />
        </div>
      );
} 

