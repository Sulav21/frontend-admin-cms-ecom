import Table from 'react-bootstrap/Table';
import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { AdminLayout } from "../layouts/AdminLayout";
import {Button} from 'react-bootstrap'
import { fetchReviewAction } from './reviewAction';
export const Review = () => {
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.review);
  useEffect(() => {
    dispatch(fetchReviewAction());
  }, []);

  return (
    <AdminLayout>
      <h4 className="py-3">Review Management</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Rating</th>
            <th>Reviewed By</th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody>
          {reviews.map((item, i) => (
            <tr key={i}>
              <td>{i+1}</td>
              <td>{item.productId}</td>
              <td>{item.productName}</td>
              <td>{item.rating}</td>
              <td>{item.reviewedBy}</td>
              <td>
                <Button variant='warning'>Edit</Button>{" "}
                <Button variant='danger'>Delete</Button>

              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminLayout>
  );
};
