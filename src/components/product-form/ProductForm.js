import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../../pages/categories/CategoryAction";
import { postProductAction } from "../../pages/product/productAction";
import { CustomInput } from "../custom-input/CustomInput";

export const ProductForm = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, []);


  const initialState = {
    CatId: "",
    description: "asd  dsfsaf fsdsda f fasfasdf",
    name: "SS Players Edition",
    price: 10000,
    qty: 100,
    salesEndDate: null,
    salesPrice: 0,
    salesStartDate: null,
    sku: "ss-14",
    status: "inactive",
  };

  const [form, setForm] = useState(initialState);
  const [images, setImages] = useState([])

  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;

    if (name === "status") value = checked ? "active" : "inactive";
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnImage=e=>{
    const {files} = e.target
    console.log(files)
    setImages(files)
  }
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    const formData = new FormData()
  for(const key in form){
    formData.append(key,form[key])
  }

  images.length &&  [...images].map(img=>formData.append("images", img))
    dispatch(postProductAction(formData))
  };

  const inputFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Product Name",
      required: true
    },
    {
      name: "sku",
      label: "SKU",
      type: "text",
      placeholder: "Product unique text",
      required: true,
    },
    {
      name: "qty",
      label: "Qty",
      type: "number",
      placeholder: "Product Quantity",
      required: true,
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      placeholder: "100",
      required: true,
    },
    {
      name: "salesPrice",
      label: "Sales Price",
      type: "number",
      placeholder: "80",
    },
    {
      name: "salesStartDate",
      label: "Sales Start Date",
      type: "date",
    },
    {
      name: "salesEndDate",
      label: "Sales End Date",
      type: "date",
    },
    {
      name: "description",
      as: "textarea",
      placeholder: "Decribe the product specifications in detail",
      rows: 10,
      required: true,
    },
    {
      name: "images",
      type:'file',
      multiple: true,
      accept: 'image/*',
      required:true,
    },
  ];
  return (
    <Form onSubmit={handleOnSubmit} className="mb-4">
      <Form.Group className="mb-3">
        <Form.Check
          name="status"
          type="switch"
          onChange={handleOnChange}
          id="custom-switch"
          label="Status"
        />
      </Form.Group>
      <Form.Group controlId="formGridState">
        <Form.Select
          name="CatId"
          defaultValue="Choose..."
          onChange={handleOnChange}
          required
        >
          <option value="">..Select Parent Category..</option>
          {categories.map(
            (item) =>
              !item.parentCatId && (
                <option key={item._id} value={item._id}>
                  {item.catName}{" "}
                </option>
              )
          )}
        </Form.Select>
      </Form.Group>

      {inputFields.map((item, i) => {
        return <CustomInput key={i} {...item} onChange={item.name==='images'? handleOnImage:handleOnChange}/>;
      })}

      <Button variant="primary" type="submit">
        Add Product
      </Button>
    </Form>
  );
};
