import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import DeleteIcon from "@mui/icons-material/Delete";

import Seo from "@/shared/layout-components/seo/seo";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import { Breadcrumb, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { DataGrid } from "@mui/x-data-grid";

import { Modal, Box, TextField, Grid } from "@mui/material";
import axios from "axios";
import Env from "@/Env";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useDispatch, useSelector } from "react-redux";

import { fetchAllClients } from "@/redux/clientActions";

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

const Clientes = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isOn, setIsOn] = useState(false);
  const [insertNewUserFormShown, setInsertNewUserFormShown] = useState(false);
  const [rows, setRows] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState([]);

  const clients = useSelector((state) => state.clients?.allClients) || [];
  const dispatch = useDispatch();
  console.log("allClients", clients);

  const columns = [
    { field: "code", headerName: "Código", width: 90 },
    { field: "SocialName", headerName: "Nombre o Rozon Social", width: 175 },
    { field: "DocType", headerName: "Tipo de documento", width: 150 },
    { field: "DocNum", headerName: "N de documento", width: 125 },
    { field: "Address", headerName: "Direccion", width: 118 },
    { field: "UpdateDate", headerName: "Fecha de actualizacion", width: 170 },
    { field: "estado", headerName: "Estado", width: 100 },
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
    dispatch(fetchAllClients());
  }, [dispatch]);

  //   useEffect(() => {
  //     axios
  //       .get(`${Env.REACT_APP_BACKEND_ENV}/api/client/getAllClient`)
  //       .then((res) => {
  //         console.log("GetAllData===>>>", res.data.findClientAll);
  //         // setGetDataAllClient(res.data.findClientAll);
  //         // setRows(res.data.findClientAll);
  //         dispatch(
  //           clientsActions.getAllClients({
  //             allClients: res.data.findClientAll || [],
  //           })
  //         );
  //       })
  //       .catch((err) => console.log("Erroreee===>>", err));
  //   }, [dispatch]);

  const handleSwitchChange = () => {
    setIsOn(!isOn);
    console.log(`Switch is turned ${isOn ? "off" : "on"}`);
    setFormData({
      ...formData,
      estado: isOn,
    });
  };

  const handleOpen = () => {
    setInsertNewUserFormShown(true);
  };
  const closeInsertionForm = () => {
    setInsertNewUserFormShown(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const boxStyleTrue = {
    width: "1050px",
    height: "auto",
    border: "2px solid lightGrey",
    borderRadius: "10px",
    padding: "20px",
    display: "flex",
    alignItems: "center", // Vertically center the content
    justifyContent: "space-between", // Create space between child elements
  };
  const boxStyle = {
    width: "1050px",
    height: "auto",
    border: "2px solid lightGrey",
    borderRadius: "10px",
    padding: "20px",
    alignItems: "center",
    justifyContent: "space-between",
  };
  const inputStyle = {
    marginLeft: "auto",
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

  const handleformData = (e) => {
    let obj = formData;
    obj[e.target.name] = e.target.value;
    setFormData(obj);
  };
  const submitForm = () => {
    console.log("abc===>>>", formData);
    axios
      .post(`${Env.REACT_APP_BACKEND_ENV}/api/client/AddNewClient`, formData)
      .then((res) => {
        console.log("it is the From One====>>>>", res.data);
        closeInsertionForm();
        dispatch(fetchAllClients());
      })
      .catch((err) => {
        console.log("erro===>>>", err);
      });
  };

  const handleOpenModal = (data) => {
    console.log("Deleting row", data.row);
    setDeleteData(data.row);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const ConfirmDelete = () => {
    console.log("jjjjj", deleteData._id);
    let dataId = deleteData._id;
    axios
      .delete(
        `${Env.REACT_APP_BACKEND_ENV}/api/client/clientesDeleteData/${dataId}`
      )
      .then((res) => {
        if (res.data.message === "success") {
          handleCloseModal();
          dispatch(fetchAllClients());
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
              Clientes
            </span>
          </div>
          <div className="justify-content-center mt-2">
            <Breadcrumb>
              <Breadcrumb.Item
                className="tx-15"
                href="/components/MasterData/MeasurementUnits"
              >
                Clientes
              </Breadcrumb.Item>
              <Breadcrumb.Item active aria-current="page">
                Datos Maestros
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        {/* <!-- /breadcrumb --> */}
        {insertNewUserFormShown ? (
          <>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-12">
                  <div
                    style={{ height: 460, width: "100%", maxWidth: "1050px" }}
                  >
                    <h4 className="ABC ml-5">&nbsp;&nbsp;CLIENTES</h4>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          label="código(code)"
                          fullWidth
                          variant="outlined"
                          size="small"
                          name="code"
                          onChange={(e) => handleformData(e)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Nombre o Rozon Social(nameSocial)"
                          fullWidth
                          variant="outlined"
                          onChange={(e) => handleformData(e)}
                          size="small"
                          name="SocialName"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="N de documento(Doc Num)"
                          fullWidth
                          variant="outlined"
                          onChange={(e) => handleformData(e)}
                          size="small"
                          name="DocNum"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Tipo de documento(Doc Type)"
                          fullWidth
                          onChange={(e) => handleformData(e)}
                          variant="outlined"
                          name="DocType"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Direccion(Adres)"
                          onChange={(e) => handleformData(e)}
                          fullWidth
                          variant="outlined"
                          size="small"
                          name="Address"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Fecha de actualizacion(Update date)"
                          onChange={(e) => handleformData(e)}
                          fullWidth
                          variant="outlined"
                          size="small"
                          name="UpdateDate"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Nota(Description)"
                          fullWidth
                          multiline
                          onChange={(e) => handleformData(e)}
                          rows={4}
                          name="Description"
                          variant="outlined"
                          size="medium"
                        />
                      </Grid>
                      <Grid item xs={12}>
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
                      </Grid>
                      <Box display="flex" justifyContent="space-between" p={2}>
                        <center>
                          <Button onClick={submitForm}>Create</Button>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <Button
                            onClick={closeInsertionForm}
                            style={{ backgroundColor: "red" }}
                          >
                            Cancel
                          </Button>
                        </center>
                      </Box>
                    </Grid>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div style={boxStyleTrue}>
                  <i
                    onClick={handleOpen}
                    className="bi bi-plus-square-fill"
                    style={iconStyle01}
                  ></i>

                  <h4 className="ABC ml-5">&nbsp;&nbsp;Clientes</h4>
                  <input type="text" style={inputStyle} placeholder="Search" />
                </div>
                <div style={{ height: 400, width: "100%", maxWidth: "1050px" }}>
                  <DataGrid
                    rows={clients}
                    columns={columns}
                    getRowId={getRowId}
                    checkboxSelection
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    </>
  );
};

Clientes.layout = "Contentlayout";

export default Clientes;
