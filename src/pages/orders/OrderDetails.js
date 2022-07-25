import Table from 'react-bootstrap/Table';
import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { AdminLayout } from "../layouts/AdminLayout";
import {Button} from 'react-bootstrap'
import { getOrdersAction } from './orderAction';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { OrderEditForm } from '../../components/orders/OrderEditForm';
export const OrderDetails = () => {
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(getOrdersAction());
  }, []);

  return (
    <AdminLayout>

      <div className="mt-3">
      <Link to='/orders' className='text-decoration-none text-secondary'>&lt; Back</Link>
      </div>
      <h4 className="py-3">Order Details</h4>

      <OrderEditForm/>
     
    </AdminLayout>
  );
};
