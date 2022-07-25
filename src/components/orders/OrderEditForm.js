import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { Button, Form } from "react-bootstrap";

export const OrderEditForm = () => {
  const { orders } = useSelector((state) => state.orders);
  const { _id } = useParams();

  const selectedOrders = orders.filter((order) => order._id === _id);

  if (selectedOrders.length < 1) {
    return <h1>Order not found, please go back and refresh the page! </h1>;
  }

  const order = selectedOrders[0];
  const { buyer, cart, paymentInfo, status, totalAmount } = order;
  console.log(order);
  return (
    <div>
      <div className=" fw-bold py-2  d-flex justify-content-between">
        <div>Status : {status}</div>
        <div>
          <Form className='d-flex justify-content-between'>
            <Form.Group>
            <Form.Select>
              <option value="">--Select--</option>
              <option value="shipped">Shipped</option>

              <option value="cancelled">Cancelled</option>
            </Form.Select>
            </Form.Group>

            <Button variant="primary">Mark As</Button>
          </Form>
        </div>
      </div>
      <div className="shippingInfo border p-2 mb-2">
        <h4>Buyer Info</h4>
        <hr />
        Order Date: 20-10-2021 <br />
        Name: {buyer.fName} {buyer.lName} <br />
        Phone: {buyer.phone} <br />
        Email: {buyer.email} <br />
        Shipping Address: {buyer.address}
      </div>
      <div className="payment-details border p-2 mb-2">
        <h4>Payment details</h4>
        <hr />
        Status : {paymentInfo.status} <br />
        Total Paid: {paymentInfo.paidAmount} <br />
        Paid Date: {paymentInfo.paidDate} <br />
        Payment Method: {paymentInfo.method} <br />
        Transaction ID: {paymentInfo.transactionID}
      </div>
      <div className="order-details border p-2 mb-2">
        <h4>Cart Details</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Thumbanil</th>
              <th>Name </th>
              <th>Unit Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, i) => (
              <tr key={i}>
                <td>1</td>
                <td>
                  <img src={item.thumbnail} width="80px" />
                </td>
                <td>{item.productName}</td>
                <td>{item.salesPrice}</td>
                <td>{item.qty}</td>
                <td>{item.subTotal}</td>
              </tr>
            ))}
            <tr className="fw-bold">
              <td colSpan={5}>Total</td>
              <td>{totalAmount}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="note-box border p-2 mb-2">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Add Notes</Form.Label>
            <Form.Control as="textArea" placeholder="Add Notes" rows="5" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check label="Send email to the customer" />
          </Form.Group>
          <Button variant="primary">Submit</Button>
        </Form>
      </div>
      <div className="note-history border p-2 mb-2">
        <div className="h5">Comments</div>
        <div className="message">
          <div className="note-history mt-3">
            Date: 10-03-2021
            <div className="border p-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
              laboriosam dolor, dolores molestiae earum facere rerum! Labore
              vero, soluta aspernatur, possimus est debitis cumque temporibus,
              voluptates a fuga dolores nemo.
            </div>
          </div>
        </div>
        <div className="message">
          <div className="note-history mt-3">
            Date: 10-03-2021
            <div className="border p-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
              laboriosam dolor, dolores molestiae earum facere rerum! Labore
              vero, soluta aspernatur, possimus est debitis cumque temporibus,
              voluptates a fuga dolores nemo.
            </div>
          </div>
        </div>
        <div className="message">
          <div className="note-history mt-3">
            Date: 10-03-2021
            <div className="border p-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
              laboriosam dolor, dolores molestiae earum facere rerum! Labore
              vero, soluta aspernatur, possimus est debitis cumque temporibus,
              voluptates a fuga dolores nemo.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
