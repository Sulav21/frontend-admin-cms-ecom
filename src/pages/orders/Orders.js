import Table from "react-bootstrap/Table";
import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminLayout } from "../layouts/AdminLayout";
// import { Button } from "react-bootstrap";
import { getOrdersAction } from "./orderAction";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { PaginationComp } from "../../components/pagination/Pagination";
export const Orders = () => {
  const productPerPage = 10;
  const dispatch = useDispatch();
  const [displayOrders, setDisplayOrders] = useState([]);
  const { orders } = useSelector((state) => state.orders);
  const [active, setActive] = useState(1)
  useEffect(() => {
    if (!orders.length) {
      dispatch(getOrdersAction());
    }
    setDisplayOrders(orders);
  }, [orders]);

  const handleOnChange=e=>{
    const {value} = e.target
    setActive(1)
    if(!value){
      return setDisplayOrders(orders)
    }
    const filteredArg = orders.filter(item => item.status === value)
    setDisplayOrders(filteredArg)

  }
// pagination
const handleOnPagination=(page)=>{
  setActive(page)
}
  const pages = Math.ceil(displayOrders.length/productPerPage)
  const productStartAt= (active-1)*productPerPage
  const productEndAt = productStartAt+10
  
  return (
    <AdminLayout>
      <h4 className="py-3">Order Management</h4>
      <div className="d-flex justify-content-between">
        <div>{displayOrders.length} Orders found !</div>
        <div>
          <Form className="d-flex mb-2">
            <Form.Group>
              <Form.Select onChange={handleOnChange}>
                <option value="">--Select--</option>
                <option value="shipped">Shipped</option>

                <option value="cancelled">Cancelled</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Buyer Name</th>
            <th>Order Total</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {displayOrders.map((item, i) => i>=productStartAt && i<productEndAt && (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.status}</td>
              <td>{item.buyer.fName}</td>
              <td>{item.totalAmount}</td>
              <td>{item.paymentInfo.status}</td>

              <td>
                <Link to={`/orders/${item._id}`}>Info</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PaginationComp pages={pages} active={active} handleOnPagination={handleOnPagination}/>
    </AdminLayout>
  );
};
