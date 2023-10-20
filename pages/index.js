import Head from "next/head";
import { Inter } from "next/font/google";
import favicon from "../public/assets/img/brand/favicon.png";
import styles from "@/styles/Home.module.scss";
import { Alert, Button, Col, Form, Row, Tab, Tabs, $ } from "react-bootstrap";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Seo from "@/shared/layout-components/seo/seo";
import { auth } from "../shared/firebase/firebase";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";
import axios from "axios";
import Env from "@/Env";

import { authActions } from "@/redux/authSlice";

export default function Home() {
  useEffect(() => {
    if (document.body) {
      document
        .querySelector("body")
        .classList.add("ltr", "error-page1", "bg-primary");
    }
    return () => {
      document.body.classList.remove("ltr", "error-page1", "bg-primary");
    };
  }, []);

  // Firebase
  const [err, setError] = useState("");
  const [norError, setNorError] = useState("");

  const [data, setData] = useState({});

  const changeHandler = (e) => {
    console.log("E....", e.target.value);
    let obj = data;
    obj[e.target.name] = e.target.value;
    setData(obj);
    setError("");
  };
  let navigate = useRouter();
  const routeChange = (company) => {
    let path = `/components/dashboards/dashboard1`;
    // navigate.push('/components/dashboards/dashboard1/jjjjjj');

    navigate.push({
      pathname: "/components/dashboards/dashboard1",
      query: { company: `${company}` },
    });
  };

  const ReactLogin = (e) => {
    if (!data.RUC) {
      setError("llenar RUC");
    } else if (!data.EmailOrUser) {
      setError("Complete el campo de correo electrónico o usuario");
    } else if (!data.password) {
      setError("Rellenar contraseña");
    } else {
      axios
        .post(`${Env.REACT_APP_BACKEND_ENV}/api/user/login`, data)
        .then((res) => {
          localStorage.setItem("UserEmail", res.data.response.UserEmail);
          localStorage.setItem("RUC", res.data.response.RUC);
          setNorError("¡Inicia sesión exitosamente! Esperar");
          let root = res.data.response.company;
          routeChange(root);
        })
        .catch((err) => {
          setError("The details did not MatchLos detalles no coincidían");
        });
    }
  };

  const [key, setKey] = useState("firebase");
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <>
      <Head>
        <title>Nowa</title>
        <meta name="description" content="Spruha" />
        <link rel="icon" href={favicon.src} />
        {/* <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap" rel="stylesheet"></link> */}
      </Head>
      <Seo title={"Login"} />
      <div className="square-box">
        {" "}
        <div></div> <div></div> <div></div> <div></div> <div></div> <div></div>{" "}
        <div></div> <div></div> <div></div> <div></div> <div></div> <div></div>{" "}
        <div></div> <div></div> <div></div>{" "}
      </div>

      <div className="page">
        <div className="page-single">
          <div className="container">
            <Row>
              <Col
                xl={5}
                lg={6}
                md={8}
                sm={8}
                xs={10}
                className="card-sigin-main mx-auto my-auto py-4 justify-content-center"
              >
                <div className="card-sigin">
                  {/* <!-- Demo content--> */}
                  <div className="main-card-signin d-md-flex">
                    <div className="wd-100p">
                      <div className="d-flex mb-2 justify-content-center align-items-center">
                        <Link href={`/components/dashboards/dashboard1/`}>
                          <img
                            src={"./assets/img/brand/favicon.png"}
                            className="sign-favicon ht-40"
                            alt="logo"
                          />
                        </Link>
                      </div>
                      <div className="">
                        <div className="main-signup-header">
                          <center>
                            <h2> HIPPOCORE</h2>{" "}
                          </center>
                          <div className="panel panel-primary">
                            <div className="tab-menu-heading mb-2 border-bottom-0">
                              <div className="tabs-menu1">
                                {err && <Alert variant="danger">{err}</Alert>}
                                {norError && (
                                  <Alert variant="primary">{norError}</Alert>
                                )}
                                <Form action="#">
                                  <Form.Group className="form-group">
                                    <Form.Label>RUC</Form.Label>{" "}
                                    <Form.Control
                                      className="form-control"
                                      placeholder="Entra tu Codigo de compañia"
                                      type="text"
                                      onChange={(e) => changeHandler(e)}
                                      name="RUC"
                                    />
                                  </Form.Group>
                                  <Form.Group className="form-group">
                                    <Form.Label>Usuario o correo</Form.Label>{" "}
                                    <Form.Control
                                      className="form-control"
                                      placeholder="Entra tu usuario o correo"
                                      type="text"
                                      onChange={(e) => changeHandler(e)}
                                      name="EmailOrUser"
                                    />
                                  </Form.Group>

                                  <Form.Group className="form-group">
                                    <Form.Label>Contraseña</Form.Label>{" "}
                                    <div
                                      className="password-input-container"
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          position: "relative",
                                          flex: 1,
                                        }}
                                      >
                                        <Form.Control
                                          className="form-control"
                                          onChange={(e) => changeHandler(e)}
                                          placeholder="Entra tu Contraseña"
                                          type={
                                            passwordVisible
                                              ? "text"
                                              : "password"
                                          }
                                          name="password"
                                        />
                                        <span
                                          style={{
                                            position: "absolute",
                                            right: "10px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            cursor: "pointer",
                                          }}
                                          className="password-visibility-toggle"
                                        >
                                          <span
                                            onClick={() =>
                                              setPasswordVisible(
                                                !passwordVisible
                                              )
                                            }
                                          >
                                            {passwordVisible ? (
                                              <RiEyeCloseFill
                                                style={{ fontSize: "16px" }}
                                              />
                                            ) : (
                                              <RiEyeFill
                                                style={{ fontSize: "16px" }}
                                              />
                                            )}
                                          </span>
                                        </span>
                                      </div>
                                    </div>
                                  </Form.Group>

                                  <Button
                                    onClick={ReactLogin}
                                    variant=""
                                    className="btn btn-primary btn-block"
                                  >
                                    Iniciar sesión
                                  </Button>
                                </Form>
                              </div>
                            </div>

                            <div className="panel-body tabs-menu-body border-0 p-3">
                              <div className="tab-content"></div>
                            </div>
                          </div>

                          <div className="main-signin-footer text-center mt-3">
                            <p>
                              <Link href="" className="mb-3">
                                ¿Olvidaste tu contraseña?
                              </Link>
                            </p>
                            <p>
                              {`¿No`} tener una cuenta?{" "}
                              <Link href="/signup">Crear cuenta</Link>
                            </p>
                          </div>
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
    </>
  );
}
