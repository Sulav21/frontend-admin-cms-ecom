import Table from 'react-bootstrap/Table';
import React, {useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { AdminLayout } from "../layouts/AdminLayout";
import { getCustomersAction } from "./customerAction";
import {Form} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import { PaginationComp } from '../../components/pagination/Pagination';
export const Customers = () => {
  const productPerPage = 3
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state.customers);
  const [getCustomers, setGetCustomers] = useState([])
  const [active, setActive] = useState(1)
  useEffect(() => {
    !getCustomers.length && dispatch(getCustomersAction());
    setGetCustomers(customers)
  }, [customers]);

  // pagination
const handleOnPagination=(page)=>{
  setActive(page)
}
  const pages = Math.ceil(customers.length/productPerPage)
  const productStartAt= (active-1)*productPerPage
  const productEndAt = productStartAt+3

  const handleOnSearch = (e)=>{
    const {value} = e.target
    
    setGetCustomers(customers.filter(item=>item.name.toLowerCase().includes(value.toLowerCase())))
  }

  return (
    <AdminLayout>
      <h4 className="py-3">Customer Management</h4>
      <Form.Control name='search' placeholder='Search ...' className='m-3' onChange={handleOnSearch}/>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {getCustomers.map((item, i) => i>=productStartAt && i<productEndAt &&(
            <tr key={i}>
              <td>{i+1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>
                <Button variant='link'>Info</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PaginationComp pages={pages} active={active} handleOnPagination={handleOnPagination}/>
    </AdminLayout>
  );
};
