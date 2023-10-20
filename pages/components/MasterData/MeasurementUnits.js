"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Seo from "@/shared/layout-components/seo/seo";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import {
  Breadcrumb,
  Col,
  Row,
  Card,
  Button,
  ProgressBar,
  Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { FaMinusSquare } from "react-icons/fa";
import {
  Modal,
  Box,
  Typography,
  TextField,
  AppBar,
  Toolbar,
} from "@mui/material";
import axios from "axios";
import Env from "@/Env";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch, useSelector } from "react-redux";
import { unitsActions } from "@/redux/measurementSlice";
import { fetchMeasurementUnits } from "@/redux/measurementAction";

const useStyles = {
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    padding: 3,
    borderRadius: "15px",
  },
};

const MeasurementUnits = () => {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [isOn, setIsOn] = useState(false);
  const [rows, setRows] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState([]);
  const dispatch = useDispatch();
  const measurementUnits = useSelector((state) => state.units.measurementUnits);
  console.log(measurementUnits);
  const columns = [
    { field: "code", headerName: "Código", width: 130 },
    { field: "description", headerName: "Descripción", width: 170 },
    { field: "codeForSunat", headerName: "código para sunat", width: 170 },
    {
      field: "presentationName",
      headerName: "nombre de presentación",
      width: 170,
    },
    { field: "estado", headerName: "Estado", width: 170 },
    {
      field: "delete", // Custom field for the delete icon
      headerName: "", // Empty header to accommodate the icon
      sortable: false,
      width: 50, // Adjust the width as needed
      renderCell: (params) => (
        <DeleteIcon
          style={{ cursor: "pointer", color: "red" }}
          onClick={(event) => handleOpenModal(params)}
        />
      ),
    },
  ];

  const getRowId = (row) => row._id;

  useEffect(() => {
    dispatch(fetchMeasurementUnits());
  }, [dispatch]);

  // useEffect(() => {
  //   axios
  //     .get(`${Env.REACT_APP_BACKEND_ENV}/api/unidades/GetAllDataFormOne`)
  //     .then((res) => {
  //       console.log("GetAllData===>>>", res.data.findFormOne);
  //       // setRows(res.data.findFormOne);
  //       dispatch(
  //         unitsActions.getAllMeasurementsUnits({ data: res.data.findFormOne })
  //       );
  //     })
  //     .catch((err) => console.log("Error===>>", err));
  // }, [dispatch]);

  const handleSwitchChange = () => {
    setIsOn(!isOn);
    console.log(`Switch is turned ${isOn ? "off" : "on"}`);
    setModalData({
      ...modalData,
      estado: isOn,
    });
  };
  function handleModal(abc) {
    console.log("Deleting row", abc.row);
  }
  const handleOpenModal = (data) => {
    console.log("Deleting row", data.row);
    setDeleteData(data.row);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const boxStyle = {
    width: "1050px",
    height: "auto",
    border: "2px solid lightGrey",
    borderRadius: "10px",
    padding: "20px",
    display: "flex",
    alignItems: "center", // Vertically center the content
    justifyContent: "space-between", // Create space between child elements
  };
  const inputStyle = {
    marginLeft: "auto", // Push the input to the right
  };
  const iconStyle01 = {
    fontSize: "32px",
    color: "darkred",
    marginTop: "-7px",
  };

  const iconStyle02 = {
    fontSize: "36px",
    color: "green",
    marginLeft: "5px",
    marginBottom: "5px",
  };

  const handleModalData = (e) => {
    let obj = modalData;
    obj[e.target.name] = e.target.value;
    setModalData(obj);
  };
  const submitModal = () => {
    console.log("abc===>>>", { modalData, isOn });
    axios
      .post(`${Env.REACT_APP_BACKEND_ENV}/api/unidades/FormOne`, {
        modalData,
        isOn,
      })
      .then((res) => {
        console.log("it is the From One====>>>>", res.data);
        handleClose();
        dispatch(fetchMeasurementUnits());
      })
      .catch((err) => {
        console.log("erro===>>>", err);
      });
  };
  const ConfirmDelete = () => {
    console.log("jjjjj", deleteData._id);
    let dataId = deleteData._id;
    axios
      .delete(
        `${Env.REACT_APP_BACKEND_ENV}/api/unidades/FormOneDeleteData/${dataId}`
      )
      .then((res) => {
        if (res.data.message === "success") {
          handleCloseModal();
          dispatch(fetchMeasurementUnits());
        } else {
          alert("Not Deleted Successfuly");
        }
      })
      .catch((err) => {
        console.log("Err===>>>", err);
      });
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={useStyles.modal}
      >
        <Box sx={useStyles.paper}>
          <h2 id="modal-title">Do you want to delete it?</h2>
          <center>
            <Button style={{ backgroundColor: "red" }} onClick={ConfirmDelete}>
              Confirm
            </Button>{" "}
            &nbsp;&nbsp;&nbsp;
            <Button onClick={handleCloseModal}>Cancel</Button>
          </center>
        </Box>
      </Modal>

      <Seo title={"Dashboard1"} />
      <React.Fragment>
        <div className="breadcrumb-header justify-content-between">
          <div className="left-content">
            <span className="main-content-title mg-b-0 mg-b-lg-1">
              Unidades de medida
            </span>
          </div>
          <div className="justify-content-center mt-2">
            <Breadcrumb>
              <Breadcrumb.Item
                className="tx-15"
                href="/components/MasterData/MeasurementUnits"
              >
                Unidades de medida
              </Breadcrumb.Item>
              <Breadcrumb.Item active aria-current="page">
                Measurement Units
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        {/* <!-- /breadcrumb --> */}

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div style={boxStyle}>
                <i
                  onClick={handleOpen}
                  className="bi bi-plus-square-fill"
                  style={iconStyle01}
                ></i>
                <FaMinusSquare style={iconStyle02} />
                <h4 className="ABC ml-5">&nbsp;UNIDADES</h4>
                <input type="text" style={inputStyle} placeholder="Search..." />
              </div>
              <div style={{ height: 450, width: "100%", maxWidth: "1050px" }}>
                <DataGrid
                  rows={measurementUnits}
                  columns={columns}
                  getRowId={getRowId}
                  checkboxSelection
                />
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 0,
              }}
            >
              <AppBar
                position="static"
                style={{ backgroundColor: "lightGrey", boxShadow: "0px" }}
              >
                <Toolbar>
                  <Typography variant="h6" style={{ color: "black" }}>
                    UNIDADES - nuevo
                  </Typography>
                </Toolbar>
              </AppBar>
              <div style={{ padding: "16px" }}>
                <form>
                  <TextField
                    label="Código"
                    variant="outlined"
                    fullWidth
                    name="code"
                    margin="normal"
                    onChange={handleModalData}
                  />
                  <TextField
                    name="description"
                    label="Descripción"
                    variant="outlined"
                    fullWidth
                    onChange={handleModalData}
                    margin="normal"
                  />
                  <TextField
                    label="código para sunat"
                    onChange={handleModalData}
                    variant="outlined"
                    fullWidth
                    name="codeForSunat"
                    margin="normal"
                  />
                  <TextField
                    label="nombre de presentación"
                    variant="outlined"
                    onChange={handleModalData}
                    fullWidth
                    name="presentationName"
                    margin="normal"
                  />
                  <center>
                    <div>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={isOn}
                            onChange={handleSwitchChange}
                            color="primary"
                            inputProps={{ "aria-label": "toggle switch" }}
                          />
                        }
                        label="Estado"
                      />
                    </div>
                  </center>
                  <Button onClick={handleClose} color="danger">
                    Close
                  </Button>{" "}
                  {"    "}
                  <Button onClick={submitModal} color="primary">
                    Submit
                  </Button>
                </form>
              </div>
            </Box>
          </Modal>
        </div>
      </React.Fragment>
    </>
  );
};

MeasurementUnits.layout = "Contentlayout";

export default MeasurementUnits;
