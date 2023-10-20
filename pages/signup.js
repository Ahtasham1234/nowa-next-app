import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormGroup, Row, Alert } from 'react-bootstrap';
import { auth } from "../shared/firebase/firebase"
import { useRouter } from 'next/router';
import axios from 'axios';
import Env from '@/Env';
const Signup = () => {
    useEffect(() => {
        if (document.body) {
            document.querySelector("body").classList.add("ltr", "error-page1", "bg-primary")
        }
        return () => {
            document.body.classList.remove("ltr", "error-page1", "bg-primary")
        }
    }, [])
    const [err, setError] = useState("");
    const [errNoError, setNoError] = useState("");
    const [data, setData] = React.useState({
        RUC: "",
        UserEmail: "",
        password: "",
    })
    const { UserEmail, password, RUC } = data;
    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const Signup = (e) => {
        // e.preventDefault();
        // auth.createUserWithEmailAndPassword(UserEmail, password).then(
        //     user => { console.log(user); routeChange() }).catch(err => { console.log(err); setError(err.message) })
        DBSignup();
    }
    const DBSignup = () => {
        console.log("vvvv", data);
        axios.post(`${Env.REACT_APP_BACKEND_ENV}/api/user/signup`, data)
            .then((res) => {
                console.log("Rrrrrrr", res.data);
                if (res.data.status) {
                    if (res.data.status === 11000) {
                        setError("This User is Already registered");
                    }
                } else {
                    let resp = res.data.users;
                    console.log("Rrrrrrr", resp);
                    localStorage.setItem("RUC", resp.RUC);
                    localStorage.setItem("UserEmail", resp.UserEmail);
                    if (res.data.message === "success") {
                        setNoError("CREATED Successfuly New Accout");
                        navigate.push("/");
                    }
                }
            })
            .catch((Err) => {
                console.log("Err===", Err);
            })
    }
    let navigate = useRouter();
    const routeChange = () => {
        let path = `/components/dashboards/dashboard1`;
        navigate.push(path);
    }
    return (
        <div>
            <div className="square-box"> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> </div>
            <div className="page bg-primary">
                <div className="page-single">
                    <div className="container">
                        <Row>
                            <Col
                                xl={5}
                                lg={6}
                                md={8}
                                sm={8}
                                xs={10}
                                className="card-sigin-main py-4 justify-content-center mx-auto"
                            >
                                <div className="card-sigin ">
                                    {/* <!-- Demo content--> */}
                                    <div className="main-card-signin d-md-flex">
                                        <div className="wd-100p">
                                            <div className="d-flex mb-2 justify-content-center align-items-center">
                                                <Link href="#">
                                                    <img
                                                        src={"../assets/img/brand/favicon.png"}
                                                        className="sign-favicon ht-40"
                                                        alt="logo"
                                                    />
                                                </Link>
                                            </div>
                                            <div className="">
                                                <div className="main-signup-header">
                                                    <center> <h2 className="text-dark">Empezar</h2></center>

                                                    {err && <Alert variant="danger">{err}</Alert>}
                                                    {errNoError && <Alert variant="primary">{errNoError}</Alert>}
                                                    <Form >
                                                        <FormGroup className="form-group">
                                                            <label>RUC</label>{" "}
                                                            <Form.Control
                                                                className="form-control"
                                                                placeholder="Introduzca el número de empresa"
                                                                type='text'
                                                                name='RUC'
                                                                onChange={changeHandler}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup className="form-group">
                                                            <label>Correo electrónico</label>{" "}
                                                            <Form.Control
                                                                className="form-control"
                                                                placeholder="Ingresa tu Usuario o Email"
                                                                type='text'
                                                                name="UserEmail"
                                                                onChange={changeHandler}
                                                            />
                                                        </FormGroup>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>compañía(Company)</Form.Label>{" "}
                                                            <Form.Control
                                                                className="form-control"
                                                                placeholder="Entra tu compañía"
                                                                type="text"
                                                                onChange={changeHandler}
                                                                name='company'
                                                            />
                                                        </Form.Group>
                                                        <FormGroup className="form-group">
                                                            <label>Contraseña</label>{" "}
                                                            <Form.Control
                                                                className="form-control"
                                                                placeholder="Ingresa tu contraseña"
                                                                type="password"
                                                                name="password"
                                                                onChange={changeHandler}
                                                            />
                                                        </FormGroup>
                                                        <Button
                                                            variant=""
                                                            className="btn btn-primary btn-block"
                                                            onClick={Signup}
                                                        >
                                                            Crea una cuenta
                                                        </Button>

                                                        <div className="mt-4 d-flex text-center justify-content-center">
                                                            <Link
                                                                href="https://www.facebook.com/"
                                                                target="_blank"
                                                                className="btn btn-icon btn-facebook me-3"
                                                                type="button"
                                                            >
                                                                <span className="btn-inner--icon">
                                                                    {" "}
                                                                    <i className="bx bxl-facebook tx-18 tx-prime"></i>{" "}
                                                                </span>
                                                            </Link>
                                                            <Link
                                                                href="https://www.twitter.com/"
                                                                target="_blank"
                                                                className="btn btn-icon me-3"
                                                                type="button"
                                                            >
                                                                <span className="btn-inner--icon">
                                                                    {" "}
                                                                    <i className="bx bxl-twitter tx-18 tx-prime"></i>{" "}
                                                                </span>
                                                            </Link>
                                                            <Link
                                                                href="https://www.linkedin.com/"
                                                                target="_blank"
                                                                className="btn btn-icon me-3"
                                                                type="button"
                                                            >
                                                                <span className="btn-inner--icon">
                                                                    {" "}
                                                                    <i className="bx bxl-linkedin tx-18 tx-prime"></i>{" "}
                                                                </span>
                                                            </Link>
                                                            <Link
                                                                href="https://www.instagram.com/"
                                                                target="_blank"
                                                                className="btn  btn-icon me-3"
                                                                type="button"
                                                            >
                                                                <span className="btn-inner--icon">
                                                                    {" "}
                                                                    <i className="bx bxl-instagram tx-18 tx-prime"></i>{" "}
                                                                </span>
                                                            </Link>
                                                        </div>
                                                        <div className="main-signup-footer mt-3 text-center ">
                                                            <p>¿Ya tienes una cuenta?  <Link href={`/`} >Iniciar sesión</Link></p>
                                                        </div>
                                                    </Form>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Signup