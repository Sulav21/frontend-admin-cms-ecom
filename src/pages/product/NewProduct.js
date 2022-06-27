import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ProductForm } from "../../components/product-form/ProductForm";
import { ProductTable } from "../../components/product-table/ProductTable";
import { AdminLayout } from "../layouts/AdminLayout";

export const NewProduct = () => {
  return (
    <AdminLayout>
      <div className="mt-2 mb-2">
        <Link to="/products">
          <Button variant="none">
            <i class="fa-solid fa-chevron-left"></i> Back
          </Button>
        </Link>
      </div>
      <h1>Add New Product</h1>
      <hr />
      <div>
        <ProductForm/>
      </div>
    </AdminLayout>
  );
};
