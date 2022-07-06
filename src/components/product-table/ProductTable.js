import React, { useEffect, useState } from "react";
import { Button,Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProductAction,
  fetchProductsAction,
} from "../../pages/product/productAction";

export const ProductTable = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  const [ids,setIds]=useState([])
  const handleOnDelete = (_id) => {
    if (window.confirm("Are you sure you want to delete this products ?")) {
      dispatch(deleteProductAction(ids))
      setIds([])
    }
  };


  const handleOnSelect = e =>{
   const {checked, value} = e.target
  
   if(value==='all'){
    if(checked){
      const allIds = products.map(item=>item._id)
      setIds(allIds)
    
    }else{
      setIds([])
    }
    return
   }

  //  Individual Click
 checked 
 ? setIds([...ids,value]) 
 :setIds(ids.filter((id)=>id !== value))
  }
console.log(ids)
  useEffect(() => {
    dispatch(fetchProductsAction());
  }, []);

  return (
    <div style={{ overflowX: "scroll" }}>
      <p>{products.length} Products found ! </p>

      <Table striped>
        <thead>
          <tr>
            <th>
            <Form.Check
                    name="status"
                    onChange={handleOnSelect}
                    value='all'
                    id="custom-switch"
                  />
            </th>
            <th>#</th>
            <th>Status</th>
            <th>Name</th>
            <th>QTY</th>
            <th>Price</th>
            <th>Sales Price</th>
            <th>Sales Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, i) => (
            <>
              <tr key={item._id}>
                <td>
                <Form.Check
                    name="status"
                    onChange={handleOnSelect}
                    value={item._id}
                    checked={ids.includes(item._id)}
                    id="custom-switch"
                  />
                </td>
              
                <td>
                  {i + 1}{" "}
                </td>
                <td
                  className={
                    item.status === "active" ? "text-success" : "text-danger"
                  }
                >
                  {item.status}
                </td>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>${item.price.toLocaleString()}</td>
                <td>{item.salesPrice || "-"}</td>
                <td>
                  {item.salesStartDate
                    ? new Date(item.salesStartDate).toLocaleDateString() +
                      "-" +
                      new Date(item.salesEndDate).toLocaleDateString()
                    : "-"}
                </td>

                <td>
                 <Link to={`/product/edit/${item._id}`}><Button variant="warning">Edit </Button>{" "}</Link> 
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>
      <div>
        {ids.length>0 &&(
        <Button
        variant="danger"
        onClick={()=>handleOnDelete(ids)}
      >
        {" "}
        Delete
      </Button>
       ) }
      
      </div>

    </div>
  );
};
