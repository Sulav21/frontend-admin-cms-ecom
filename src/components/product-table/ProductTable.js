import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProductAction,
  fetchProductsAction,
} from "../../pages/product/productAction";

export const ProductTable = () => {
  const [displayProduct, setDisplayProduct] = useState([])
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  const [ids, setIds] = useState([]);
  const handleOnDelete = (_id) => {
    if (window.confirm("Are you sure you want to delete this products ?")) {
      dispatch(deleteProductAction(ids));
      setIds([]);
    }
  };

  const handleOnSelect = (e) => {
    const { checked, value } = e.target;

    if (value === "all") {
      if (checked) {
        const allIds = products.map((item) => item._id);
        setIds(allIds);
      } else {
        setIds([]);
      }
      return;
    }

    //  Individual Click
    checked
      ? setIds([...ids, value])
      : setIds(ids.filter((id) => id !== value));
  };
  
  const handleOnFilter=e=>{
    const {value} = e.target
    if(!value){
      setDisplayProduct(products)
    }else{
     setDisplayProduct(products.filter(item=>item.status===value))
    }

  }

  const handleOnLiveSearch=e=>{
    const {value} = e.target
    
      setDisplayProduct(products.filter(item=>item.name.toLowerCase().includes(value.toLowerCase())))
    
    
  }
  useEffect(() => {
   !displayProduct.length && dispatch(fetchProductsAction());
   products.length && setDisplayProduct(products)
  
  }, [products]);
  

  return (
    <div style={{ overflowX: "scroll" }}>
      <div className="mt-3 d-flex justify-content-end">
        <Form.Control name='search' placeholder='Search ...' className='m-3' onChange={handleOnLiveSearch}/>
          <Form.Select className='m-3' onChange={handleOnFilter}>
            <option value="">---All---</option>
            <option value="active">Active</option>

            <option value="inactive">Inactive</option>
          </Form.Select>
      </div>
      <hr />
      <div className='mb-2'>{displayProduct.length} Products found !</div>

      <Table striped>
        <thead>
          <tr>
            <th>
              <Form.Check
                name="status"
                onChange={handleOnSelect}
                value="all"
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
          {displayProduct.map((item, i) => (
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

                <td>{i + 1} </td>
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
                  <Link to={`/product/edit/${item._id}`}>
                    <Button variant="warning">Edit </Button>{" "}
                  </Link>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>
      <div>
        {ids.length > 0 && (
          <Button variant="danger" onClick={() => handleOnDelete(ids)}>
            {" "}
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};
