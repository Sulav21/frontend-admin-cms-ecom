import React, { useEffect,useState } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaymentMethods,deleteFetchPaymentMethod,editFetchPaymentMethod} from "../../pages/payment-method/PaymentMethodAction";
import { EditPaymentMethodForm } from "../payment-method-fomr/EditPaymentMethodForm";
import {PaymentMethodForm} from '../payment-method-fomr/PaymentMethodForm'

export const PaymentMethodTable = ({showForm,setShowForm}) => {
  // const [showForm, setShowForm] = useState(false)

  const handleOnEdit=(_id)=>{
    setShowForm(false) 
    dispatch(editFetchPaymentMethod(_id))
  }
  const dispatch = useDispatch();
  const { paymentMethods } = useSelector((state) => state.paymentMethod);
  useEffect(() => {
    dispatch(fetchPaymentMethods());
  }, []);

  return (
    <div className="">
      {showForm ? <PaymentMethodForm /> : <EditPaymentMethodForm />}
      <div className="mb-2">{paymentMethods.length} Payment Methods Found !</div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paymentMethods.length>0 && 
          paymentMethods.map((item, i) => (
            <tr key={item._id}>
              <td>{i+1}</td>
              <td>{item.status}</td>
              <td>{item.name} <i class="fa-solid fa-circle-info text-primary" title={item.description} ></i></td>
              <td>
                <Button variant="info" title='Edit' onClick={()=>handleOnEdit(item._id)}><i class="fa-solid fa-pen-to-square"></i></Button>{" "}
                <Button variant="danger" title='Delete' onClick={()=> window.confirm("Are you sure you want to delete the payment method ?") && dispatch(deleteFetchPaymentMethod(item._id))}><i class="fa-solid fa-trash-can"></i></Button>
                {""}
              </td>s
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
