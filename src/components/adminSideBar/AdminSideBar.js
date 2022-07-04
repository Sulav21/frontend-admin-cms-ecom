import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../system-state/systemSlice";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export const AdminSideBar = () => {
  const dispatch = useDispatch();
  const { showAdminSidebar } = useSelector((state) => state.system);
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
      <i class="fa-solid fa-bars"></i>
      </Button> */}

      <Offcanvas
        show={showAdminSidebar}
        onHide={() => dispatch(toggleSidebar())}
        // onClick={() => dispatch(toggleSidebar())}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Admin Side Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <hr />
          <ListGroup variant="flush">
            <ListGroup.Item onClick={() => dispatch(toggleSidebar())}>
              <Link className="nav-link" to="/dashboard">
                {" "}
                <i class="fa-solid fa-house-chimney"></i> Home
              </Link>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => dispatch(toggleSidebar())}>
              {" "}
              <Link className="nav-link" to="/dashboard">
                <i class="fa-solid fa-chart-line"></i> Dashboard
              </Link>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => dispatch(toggleSidebar())}>
              <Link className="nav-link" to="/products">
                <i class="fa-solid fa-shop"></i> Products
              </Link>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => dispatch(toggleSidebar())}>
              <Link className="nav-link" to="/customers">
                <i class="fa-solid fa-people-carry-box"></i> Customers
              </Link>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => dispatch(toggleSidebar())}>
              <Link className="nav-link" to="/orders">
                <i class="fa-solid fa-basket-shopping"></i> Orders
              </Link>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => dispatch(toggleSidebar())}>
              <Link className="nav-link" to="/categories">
                <i class="fa-solid fa-sitemap"></i> Categories
              </Link>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => dispatch(toggleSidebar())}>
              <Link className="nav-link" to="/payments">
                <i class="fa-solid fa-money-check-dollar"></i> Payments
              </Link>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => dispatch(toggleSidebar())}>
              <Link className="nav-link" to="/admin-profile">
                <i class="fa-solid fa-pen-to-square"></i> Admin Profile
              </Link>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => dispatch(toggleSidebar())}>
              <Link className="nav-link" to="/settings">
                <i class="fa-solid fa-gears"></i> Settings
              </Link>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => dispatch(toggleSidebar())}>
              <Link className="nav-link" to="/settings">
                <i class="fa-solid fa-right-from-bracket"></i> Logout
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

// render(<Example />);
