import React,{useEffect}from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { EditProductForm } from "../../components/product-form/EditProductForm";
import { ProductTable } from "../../components/product-table/ProductTable";
import { AdminLayout } from "../layouts/AdminLayout";
import { fetchSingleProductAction } from "./productAction";

export const EditProduct = () => {
  const dispatch = useDispatch()
  const {_id} = useParams()
useEffect(() => {
_id && dispatch(fetchSingleProductAction(_id)
)}, [_id])

  return (
    <AdminLayout>
      <div className="mt-2 mb-2">
        <Link to="/products">
          <Button variant="none">
            <i class="fa-solid fa-chevron-left"></i> Back
          </Button>
        </Link>
      </div>
      <h1>Edit Product</h1>
      <hr />
      <div>
        <EditProductForm/>
      </div>
    </AdminLayout>
  );
};
