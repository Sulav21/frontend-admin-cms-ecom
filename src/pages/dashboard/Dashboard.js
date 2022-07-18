import React from "react";
import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CustomCard } from "../../components/custom-card/CustomCard";
import { CustomTable } from "../../components/table/CustomTable";
import { AdminLayout } from "../layouts/AdminLayout";
import { fetchProductsAction } from "../product/productAction";

export const Dashboard = () => {
  const {products} = useSelector((state)=>state.product)
  const activeProduct = products.filter((product)=>product.status==='active')
  const inActiveProduct = products.filter((product)=>product.status==='inactive')

  const dispatch = useDispatch()
  useEffect(()=>{
    !products.length && dispatch(fetchProductsAction())
  },[])
  // Order Info
  const tableHeader = ["Status", "Name", "Order Date", "Order Total"];
  const tableData = [
    {
      status: "Payment Pending",
      fName: "Jay Shree",
      orderDate: "23-11-2022",
      orderTotal: 500,
    },
    {
      status: "Paid",
      fName: "Rocky",
      orderDate: "23-11-2022",
      orderTotal: 500,
    },
    {
      status: "Processing",
      fName: "Jan",
      orderDate: "23-11-2022",
      orderTotal: 500,
    },
    {
      status: "Shipped",
      fName: "Krishna",
      orderDate: "23-11-2022",
      orderTotal: 500,
    },
  ];

  // Client Info
  const clientHeader = ["First Name", "Last Name", "Joined Date"];
  const clientInfo = [
    {
      fName: "John",
      lName: "Cena",
      joinedDate: "24-03-2021",
    },
    {
      fName: "John",
      lName: "Cena",
      joinedDate: "24-03-2021",
    },
    {
      fName: "John",
      lName: "Cena",
      joinedDate: "24-03-2021",
    },
    {
      fName: "John",
      lName: "Cena",
      joinedDate: "24-03-2021",
    },
  ];

  return (
    <AdminLayout>
      <h4 className="py-3">Dashboard</h4>
      <div className="products">
        <h5>Product Summary</h5>
        <hr/>
        <Row className='g-3'>
          <Col md="4">
            <CustomCard title="Total Products" count={products.length} />
          </Col>
          <Col md="4">
            <CustomCard title="Active Products" count={activeProduct.length} />
          </Col>
          <Col md="4">
            <CustomCard title="Inactive Products" count={inActiveProduct.length} />
          </Col>
        </Row>
      </div>
      {/* <div className="product-info py-4 d-flex">
      </div> */}
      <div className="user-info mt-5 m b-5">
        <h5>Client Summary</h5>
        <hr />
        <CustomTable tableHeader={clientHeader} tableData={clientInfo} />
      </div>
      <div className="last-orders">
        <h5>Last 5 orders</h5>
        <hr />
        <CustomTable tableHeader={tableHeader} tableData={tableData} />
      </div>
      <div className="tops-selling"></div>
    </AdminLayout>
  );
};
