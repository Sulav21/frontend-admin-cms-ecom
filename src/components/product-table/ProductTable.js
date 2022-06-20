import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoryAction,
  fetchCategoriesAction,
} from "../../pages/categories/CategoryAction";

export const ProductTable = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, []);

  const handleOnDelete = (_id) => {
    if (window.confirm("Are you sure you want to delete this category ?")) {
      dispatch(deleteCategoryAction(_id));
    }
  };

  

  const parentCats = categories.filter((item) => !item.parentCatId);
  const childCats = categories.filter((item) => item.parentCatId);

  return (
    <div>

      <p>{categories.length} Categories found ! </p>

      <Table striped>
        <thead>
          <tr>
            {/* <th>#</th> */}
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {parentCats.map((item, i) =>(
            <>
               <tr key={item._id}>
                  {/* <td>{i + 1}</td> */}
                  <td>
                    {item.parentCatId && "➡"}
                    {item.catName}
                  </td>
                  <td
                    className={
                      item.status === "active" ? "text-success" : "text-danger"
                    }
                  >
                    {item.status}
                  </td>

                  <td>
                    <Button
                      variant="warning"
                      
                    >
                      Edit{" "}
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleOnDelete(item._id)}
                    >
                      {" "}
                      Delete
                    </Button>
                  </td>
                </tr>
               {childCats.map((cat,index)=>{
                if(cat.parentCatId===item._id){
                 return  <tr key={cat._id}>
                 {/* <td>{i + 1}</td> */}
                 <td>
                   {cat.parentCatId && "➡"}
                   {cat.catName}
                 </td>
                 <td
                   className={
                     cat.status === "active" ? "text-success" : "text-danger"
                   }
                 >
                   {cat.status}
                 </td>

                 <td>
                   <Button
                     variant="warning"
            
                   >
                     Edit{" "}
                   </Button>{" "}
                   <Button
                     variant="danger"
                     onClick={() => handleOnDelete(item._id)}
                   >
                     {" "}
                     Delete
                   </Button>
                 </td>
               </tr>
                }
               }) }

               </>
              
         ) ) }
        </tbody>
      </Table>
    </div>
  );
};
