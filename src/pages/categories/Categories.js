import React from "react";
import { CategoryForm } from "../../components/cat-form/CategoryForm";
import { CategoryTable } from "../../components/cat-table/CategoryTable";
import { AdminLayout } from "../layouts/AdminLayout";

export const Categories = () => {
  return (
    <AdminLayout>
      <h3 className="mt-3">Category</h3>
      {/* form */}

      <CategoryForm />

      <hr />

      {/* table */}

    <CategoryTable />

    </AdminLayout>
  );
};
