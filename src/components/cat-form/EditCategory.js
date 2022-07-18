import React, { useState, useEffect} from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { updateCategoryAction } from "../../pages/categories/CategoryAction";
import { MyVerticallyCenteredModal } from "../modal/Modal";

export const EditCategory = ({selectedCat}) => {
    console.log(selectedCat)
  const dispatch= useDispatch()
  const [form, setForm] = useState(selectedCat);
  const {categories} =useSelector(state=>state.category)
  const handleOnChange = (e) => {
    let { name, value,checked } = e.target;
    if(name==='status'){
      value = checked ? 'active' : 'inactive';
    }
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    setForm(selectedCat)
  }, [selectedCat])
  
  const handleOnSubmit = (e) => {
    e.preventDefault();     
    const {parentCatId,catName,status,_id} = form
    // dispatch action to update the category
    // console.log(form);
    dispatch(updateCategoryAction({_id,parentCatId,catName,status}))

   console.log(form)
  };
 
  return (
    <MyVerticallyCenteredModal  title="Edit Category" >
    <Form className="py-5" onSubmit={handleOnSubmit}>
      <Row className="g-3">
        <Col md='2'>
       
      <Form.Check 
      name="status"
        type="switch"
        onChange={handleOnChange}
        id="custom-switch"
        label="Status"
        checked = {form.status === 'active'}

      />
        </Col>
        <Col md="4">
          <Form.Group controlId="formGridState">
            <Form.Select
              name="parentCatId"
              defaultValue="Choose..."
            onChange={handleOnChange}
            >
              <option value="">..Select Parent Category..</option>
              

              {categories.map((item)=>
              !item.parentCatId && (<option key={item._id} value={item._id}>{item.catName}</option>
              ))}
             
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Control
            name="catName"
            onChange={handleOnChange}
            placeholder="Category name"
            required
            value={form.catName}
          />
        </Col>
        <Col md="3">
          <Button type="submit">Update Category</Button>
        </Col>
      </Row>
    </Form>
    </MyVerticallyCenteredModal>
  );
};
