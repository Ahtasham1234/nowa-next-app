
import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import Seo from "@/shared/layout-components/seo/seo";
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })
import { Breadcrumb, Col, Row, Card, Button, ProgressBar, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { FaMinusSquare } from 'react-icons/fa';
import { Modal, Box, Typography, TextField, AppBar, Toolbar, Grid } from '@mui/material';
import axios from "axios";
import { GiBanknote } from 'react-icons/gi';
import Env from "@/Env";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Dangerous } from "@mui/icons-material";
import { ImCross } from 'react-icons/im';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = {
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        padding: 3,
        borderRadius: "15px"
    },
};


const Venta = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [isOn, setIsOn] = useState(false);
    const [insertNewUserFormShown, setInsertNewUserFormShown] = useState(false);
    const [rows, setRows] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [deleteData, setDeleteData] = useState([]);

    const columns = [
        { field: "ID", headerName: "Id", width: 10 },
        { field: "SerialNumber", headerName: "Serie Numero", width: 105 },
        { field: "DocType", headerName: "Tipo.Doc", width: 80 },
        { field: "Reason", headerName: "Motivo", width: 60 },
        { field: "Issue date", headerName: "Facha de emisión", width: 134 },
        { field: "Customer", headerName: "Cliente", width: 70 },
        { field: "Address", headerName: "Dirección", width: 80 },
        { field: "estado", headerName: "Estado", width: 60 },
        { field: "Reference Doc", headerName: "Doc.Referencio", width: 116 },
        { field: "Total", headerName: "Total", width: 55 },
        { field: 'estado', headerName: 'Estado', width: 100 },
        {
            field: 'delete', // Custom field for the delete icon
            headerName: '', // Empty header to accommodate the icon
            sortable: false,
            width: 50, // Adjust the width as needed
            renderCell: (params) => (
                <DeleteIcon
                    style={{ cursor: 'pointer', color: "red" }}
                    onClick={(event) => handleOpenModal(params)}
                />
            ),
        },
    ];


    const getRowId = (row) => row._id;

    useEffect(() => {
        axios.get(`${Env.REACT_APP_BACKEND_ENV}/api/venta/getAllVenta`)
            .then((res) => {
                console.log("GetAllData===>>>", res.data.findClientAll)
                // setGetDataAllClient(res.data.findClientAll);
                if (res.data.findClientAll.length !== 0) {
                    setRows(res.data.findClientAll);
                }
            })
            .catch(err => console.log("Erroreee===>>", err));
    }, [])


    const handleSwitchChange = () => {
        setIsOn(!isOn);
        console.log(`Switch is turned ${isOn ? 'off' : 'on'}`);
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
    }
    const handleClose = () => {
        setOpen(false);
    };
    const boxStyleTrue = {
        width: '1050px',
        height: 'auto',
        border: '2px solid lightGrey',
        borderRadius: '10px',
        padding: '20px',
        display: 'flex',
        alignItems: 'center', // Vertically center the content
        justifyContent: 'space-between', // Create space between child elements
    };
    const boxStyle = {
        width: '1050px',
        height: 'auto',
        border: '2px solid lightGrey',
        borderRadius: '10px',
        padding: '20px',
        alignItems: 'center',
        justifyContent: 'space-between',
    };
    const inputStyle = {
        marginLeft: 'auto',
    };
    const iconStyle01 = {
        fontSize: '32px',
        color: 'darkred',
        marginTop: "-7px",
    };

    const iconStyle02 = {
        fontSize: '36px',
        color: 'green',
        marginLeft: "5px",
        marginBottom: "5px"
    };

    const handleformData = (e) => {
        let obj = formData;
        obj[e.target.name] = e.target.value;
        setFormData(obj);
    }
    const submitForm = () => {
        console.log("abc===>>>", formData);
        axios.post(`${Env.REACT_APP_BACKEND_ENV}/api/venta/ventaPost`, formData)
            .then((res) => {
                console.log("it is the From One====>>>>", res.data);
                closeInsertionForm();
            })
            .catch((err) => {
                console.log("erro===>>>", err);
            })
    }



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
        axios.delete(`${Env.REACT_APP_BACKEND_ENV}/api/venta/deletevanta/${dataId}`)
            .then((res) => {
                if (res.data.message === "success") {
                    handleCloseModal();
                } else {
                    alert("Not Deleted Successfuly");
                }
            })
            .catch((err) => {
                console.log("Err===>>>", err);
            })
    }

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
                        </Button> &nbsp;&nbsp;&nbsp;
                        <Button onClick={handleCloseModal}>
                            Cancel
                        </Button>
                    </center>
                </Box>
            </Modal>
            <Seo title={"Dashboard1"} />
            <React.Fragment>
                <div className="breadcrumb-header justify-content-between">
                    {/* <div className="left-content">
                        <span className="main-content-title mg-b-0 mg-b-lg-1">Venta</span>
                    </div> */}
                    <div className="justify-content-center mt-2">
                        <Breadcrumb>
                            <Breadcrumb.Item className="tx-15" href="/components/Ventas/Venta">
                                Venta
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active aria-current="page">
                                Ventas
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                {/* <!-- /breadcrumb --> */}
                {insertNewUserFormShown ? (
                    <>

                        <div style={{ border: "2px solid black", borderRadius: "20px", padding: "25px" }}>
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-md-12">
                                        <div style={{ height: "540px", width: '100%', maxWidth: "1050px" }}>
                                            {/* <h4 className="ABC ml-5">Ventas</h4> */}
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        label="Cliente - Cliente frecuente"
                                                        fullWidth
                                                        variant="outlined"
                                                        size="small"
                                                        name="Cliente"
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        label="Sucursal"
                                                        fullWidth
                                                        variant="outlined"
                                                        size="small"
                                                        name="Sucursal"
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        label="Escribe el producto o su código"
                                                        fullWidth
                                                        variant="outlined"
                                                        size="small"
                                                        name="Cliente"
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        label="Almacén"
                                                        fullWidth
                                                        variant="outlined"
                                                        size="small"
                                                        name="Cliente"
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <div style={{ border: "1px solid grey", borderRadius: "20px", padding: "23px" }}>
                                                        <TextField
                                                            label="Fetcha"
                                                            fullWidth
                                                            variant="outlined"
                                                            size="small"
                                                            name="Fetcha"
                                                            style={{ marginBottom: "10px" }}
                                                        />
                                                        <TextField
                                                            label="Vendedor"
                                                            fullWidth
                                                            variant="outlined"
                                                            size="small"
                                                            name="Vendedor"
                                                            style={{ marginBottom: "10px" }}
                                                        />
                                                        <TextField
                                                            label="Moneda"
                                                            fullWidth
                                                            variant="outlined"
                                                            size="small"
                                                            name="Cliente"
                                                            style={{ marginBottom: "10px" }}
                                                        />
                                                        <TextField
                                                            label="Tipo de Cambio"
                                                            fullWidth
                                                            variant="outlined"
                                                            size="small"
                                                            name="TipoDeCambio"
                                                            style={{ marginBottom: "10px" }}
                                                        />
                                                        <TextField
                                                            label="Impuesto de ventas"
                                                            fullWidth
                                                            variant="outlined"
                                                            size="small"
                                                            name="ImpuestoDeVentas"
                                                            style={{ marginBottom: "10px" }}
                                                        />
                                                        <TextField
                                                            label="Impuesto de boisas"
                                                            fullWidth
                                                            variant="outlined"
                                                            size="small"
                                                            name="ImpuestoDeBoisas"
                                                            style={{ marginBottom: "10px" }}
                                                        />
                                                        <TextField
                                                            label="Contado"
                                                            fullWidth
                                                            variant="outlined"
                                                            size="small"
                                                            name="Contado"
                                                            style={{ marginBottom: "10px" }}
                                                        />
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <Grid item xs={12} sm={6}>
                                <Box display="flex" justifyContent="space-between" p={2}>
                                    <center>
                                        <Button onClick={closeInsertionForm} style={{ backgroundColor: "red" }}>
                                            Cancel
                                        </Button>
                                    </center>
                                </Box>
                            </Grid> */}
                        </div>
                        <div>

                            <div>
                                &nbsp;&nbsp;&nbsp;<GiBanknote size={70} onClick={closeInsertionForm} style={{ marginTop: "10px", cursor: "pointer" }} />
                                <br /><div style={{ marginTop: "-10px" }}>FACTURAR(F7)</div>
                            </div>
                            <div style={{ marginLeft: "120px", marginTop: "-65px" }}>
                                &nbsp;&nbsp;&nbsp;<ImCross size={35} style={{ marginTop: "5px" }} />
                                <br /><span>CANCELAR</span>
                            </div>

                            <div style={{ marginLeft: "700px", marginTop: "-68px" }}>
                                &nbsp;&nbsp;&nbsp;<span style={{ fontWeight: "bold" }}>Descuento</span> <Button style={{ backgroundColor: "pink", border: "1px solid transparent" }}>
                                    10.00
                                </Button>
                            </div>
                            <div style={{ marginLeft: "900px", marginTop: "-38px", paddingBottom: "70px" }}>
                                &nbsp;&nbsp;&nbsp;<span style={{ fontWeight: "bold" }}>Total</span> <Button style={{ backgroundColor: "#F9EF15", border: "1px solid transparent" }} >
                                    1000.00
                                </Button>
                            </div>

                        </div>
                    </>
                ) : (
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <div style={boxStyleTrue}>
                                    <i onClick={handleOpen} className="bi bi-plus-square-fill" style={iconStyle01}></i>

                                    <h4 className="ABC ml-5">Clientes</h4>
                                    <input type="text" style={inputStyle} placeholder="Search" />
                                </div>
                                <div style={{ height: 400, width: '100%', maxWidth: "1050px" }}>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        getRowId={getRowId}
                                        checkboxSelection
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment >
        </>
    );
}

Venta.layout = "Contentlayout"

export default Venta