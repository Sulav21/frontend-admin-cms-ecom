import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../../pages/categories/CategoryAction";
import { updateProductAction } from "../../pages/product/productAction";
import { CustomInput } from "../custom-input/CustomInput";

export const EditProductForm = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { selectedProduct } = useSelector((state) => state.product);

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
    thumbnail: "",
  };

  const [form, setForm] = useState(initialState);
  const [newImages, setImages] = useState([]);
  const [imgToDelete, setImgToDelete] = useState([]);
  useEffect(() => {
    dispatch(fetchCategoriesAction());
    setForm(selectedProduct);
  }, [selectedProduct]);

  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;

    if (name === "status") value = checked ? "active" : "inactive";
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnImage = (e) => {
    const { files } = e.target;
    console.log(files);
    setImages(files);
  };

  const handleOnDeleteImg = (e) => {
    const { checked, value, name } = e.target;
    if (checked) {
      setImgToDelete([...imgToDelete, value]);
    } else {
      setImgToDelete(imgToDelete.filter((imgPath) => imgPath !== value));
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    if (!window.confirm("Are you sure you want to update the product ?"))
      return;
    const { __v, updatedAt, slug, sku, ratings, createdAt, ...rest } = form;
    rest.salesPrice = Number(rest.salesPrice) ? +rest.salesPrice : 0;
    rest.salesStartDate = rest.salesStartDate ? rest.salesStartDate : null;
    rest.salesEndDate = rest.salesEndDate ? rest.salesEndDate : null;
    // bundle in formData
    const formData = new FormData();
    for (const key in rest) {
      formData.append(key, rest[key]);
    }

    newImages.length &&
      [...newImages].map((img) => formData.append("newImages", img));

    formData.append("imgToDelete", imgToDelete);

    dispatch(updateProductAction(formData));
  };

  const inputFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Product Name",
      required: true,
      value: form.name,
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      placeholder: "Product Name",
      required: true,
      value: form.slug,
      disabled: true,
    },
    {
      name: "sku",
      label: "SKU",
      type: "text",
      placeholder: "Product unique text",
      required: true,
      value: form.sku,
      disabled: true,
    },
    {
      name: "qty",
      label: "Qty",
      type: "number",
      placeholder: "Product Quantity",
      required: true,
      value: form.qty,
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      placeholder: "100",
      required: true,
      value: form.price,
    },
    {
      name: "salesPrice",
      label: "Sales Price",
      type: "number",
      placeholder: "80",
      value: form.salesPrice,
    },
    {
      name: "salesStartDate",
      label: "Sales Start Date",
      type: "date",
      value: form.salesStartDate ? form.salesStartDate.split("T")[0] : null,
    },
    {
      name: "salesEndDate",
      label: "Sales End Date",
      type: "date",
      value: form.salesEndDate ? form.salesEndDate.split("T")[0] : null,
    },
    {
      name: "description",
      as: "textarea",
      placeholder: "Decribe the product specifications in detail",
      rows: 10,
      required: true,
      value: form.description,
    },
    {
      name: "images",
      type: "file",
      multiple: true,
      accept: "image/*",
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
          checked={form.status === "active"}
        />
      </Form.Group>
      <Form.Group controlId="formGridState">
        <Form.Select
          name="catId"
          defaultValue="Choose..."
          onChange={handleOnChange}
          required
        >
          <option value="">..Select Parent Category..</option>
          {categories.map((item) => (
            <option
              key={item._id}
              value={item._id}
              selected={item._id === selectedProduct.catId}
            >
              {item.catName}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {inputFields.map((item, i) => {
        return (
          <CustomInput
            key={i}
            {...item}
            onChange={item.name === "images" ? handleOnImage : handleOnChange}
          />
        );
      })}

      <div className="d-flex my-2">
        {selectedProduct.images &&
          selectedProduct.images.length > 0 &&
          selectedProduct.images.map((imgLink) => (
            <div className="img p-1">
              <Form.Check
                label="Use as thumbnail"
                type="radio"
                name="thumbnail"
                onChange={handleOnChange}
                value={imgLink}
                checked = {imgLink===form.thumbnail}
              ></Form.Check>

              <img
                className="img-thumbnail rounded"
                crossorigin="anonymous"
                key={imgLink}
                src={process.env.REACT_APP_IMAGE_SERVER_URL + imgLink.substr(6)}
                alt="Product Image"
                width="150px"
              />
              <Form.Check
                label="Delete"
                value={imgLink}
                onChange={handleOnDeleteImg}
              ></Form.Check>
            </div>
          ))}
      </div>
      <Button variant="warning" type="submit">
        Update Product
      </Button>
    </Form>
  );
};
