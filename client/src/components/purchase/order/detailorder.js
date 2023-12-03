import React, { useEffect, useState } from "react";
import { GetOrder } from "../../../actions/purchaseAction";
import { useDispatch, useSelector } from "react-redux";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";
import Button from "react-bootstrap/Button";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from "mdb-react-ui-kit";

const DetailOrder = () => {
  const { getOrderResult, getOrderLoading, getOrderError } = useSelector(
    (state) => state.PurchaseReducer
  );
  console.log(getOrderResult, "order");
  const dispatch = useDispatch();
  $(document).ready(function () {
    setTimeout(function () {
      $("#example").DataTable();
    }, 1000);
  });
  const { id } = useParams();
  useEffect(() => {
    console.log("1. use effect home");
    dispatch(GetOrder(id));
  }, [dispatch]);

  const deletehandler = async (idT) => {
    console.log(id);
    try {
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios({
            method: "DELETE",
            url: `http://localhost:4001/deleteorderdetail/${idT}`,
          });

          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          dispatch(GetOrder(id));
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  const [stock, setStock] = useState("");
  const [order_qty, setQty] = useState("");
  const [receive, setReceive] = useState("");
  const [rejected, setRejected] = useState("");
  const [idBy, setId] = useState("");

  const [edit, setEdit] = useState(false);
  const handleEditC = () => setEdit(false);
  const editDetail = async (e) => {
    console.log(idBy);
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios({
          method: "POST",
          url: `http://localhost:4001/updatepurchasedetail/${idBy}`,
          timeout: 12000,
          data: {
            pode_stock_id: stock,
            pode_order_qty: order_qty,
            pode_received_qty: receive,
            pode_rejected_qty: rejected,
          },
        }).then((response) => {
          if (response.data.data !== 400) {
            Swal.fire({
              icon: "success",
              text: "Update Succes",
            });
            setEdit(false);
          } else {
            Swal.fire({
              icon: "warning",
              text: response.data.code,
            });
          }
          setEdit(false);
        });
      }
    });
  };
  //modal edit

  const updatedetail = async (id) => {
    setEdit(true);

    console.log(id, "23dd");
    const response = await axios.get(
      `http://localhost:4001/listorderdetailbyId/${id}`
    );
    const data = await response.data.data;
    data.map((detail) => {
      console.log(data);
      setStock(detail.stock_name);
      setQty(detail.pode_order_qty);
      setReceive(detail.pode_received_qty);
      setRejected(detail.pode_rejected_qty);
      setId(detail.pode_id);
    });
  };
  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href="/">Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="/purchaseorder">Purchase Order</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>
                Purchase Order Detail
              </MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>
        <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
          <div className="w-100">
            <table className="table">
              <thead>
                <tr>
                  <th>Stock Name</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Receive Qty</th>
                  <th>Reject Qty</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {getOrderResult ? (
                  getOrderResult.map((vendor, index) => (
                    <tr key={index}>
                      <td>{vendor.stock_name}</td>
                      <td>{vendor.stock_quantity}</td>
                      <td>{vendor.pode_price}</td>
                      <td>{vendor.pode_received_qty}</td>
                      <td>{vendor.pode_rejected_qty}</td>
                      <td>{vendor.pode_line_total}</td>
                      <td>
                        <button
                          onClick={() => deletehandler(vendor.pode_id)}
                          className="btn btn-sm btn-warning"
                        >
                          <MdDeleteOutline className="me-1" />
                          Delete
                        </button>
                        {/* <Link to={`/editItem/${id}`}> */}
                        <button
                          className="btn btn-sm btn-dark"
                          onClick={() => updatedetail(vendor.pode_id)}
                        >
                          <MdOutlineModeEdit className="me-1" />
                          Update
                        </button>
                        {/* </Link> */}
                      </td>
                    </tr>
                  ))
                ) : getOrderLoading ? (
                  <p> Loading . . .</p>
                ) : (
                  <p> {getOrderError ? getOrderError : "Data Kosong"}</p>
                )}
              </tbody>
            </table>
            <Modal show={edit} onHide={handleEditC}>
              <Modal.Header closeButton>
                <Modal.Title>Add/Edit Vendor Product</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form id="create-course-form">
                  <Form.Group
                    className="mb-12"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                      type="email"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicSelect">
                    <Form.Label>Order Qty</Form.Label>
                    <Form.Control
                      value={order_qty}
                      onChange={(e) => {
                        console.log("e.target.value", e.target.value);
                        setQty(e.target.value);
                      }}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Receive </Form.Label>
                    <Form.Control
                      value={receive}
                      onChange={(e) => {
                        console.log("e.target.value", e.target.value);
                        setReceive(e.target.value);
                      }}
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group controlId="duedate">
                    <Form.Label>Rejected</Form.Label>
                    <Form.Control
                      value={rejected}
                      onChange={(e) => {
                        console.log("e.target.value", e.target.value);
                        setRejected(e.target.value);
                      }}
                      autoFocus
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleEditC}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={editDetail}>
                  Simpan
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </MDBBreadcrumb>
      </MDBContainer>
    </section>
  );
};

export default DetailOrder;
