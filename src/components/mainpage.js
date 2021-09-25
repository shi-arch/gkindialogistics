import React, { Component, useEffect } from 'react';
import Header from './header'
import Pagination from '@material-ui/lab/Pagination';
import Footer from './footer'
import Radio from '../common/radio'
import { TextField, Icon } from '@material-ui/core';
import LoadingOverlay from 'react-loading-overlay';
import { apiResponse } from '../apiresponse/response'
import IconButton from "@material-ui/core/IconButton";
import BackgroundImage from '../assets/backgroundimage.jpg';
import { Container, Col, Form, Row, FormGroup, Label, Input, Button, Table } from 'reactstrap';
import { params } from '../constants/constants'
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import swal from 'sweetalert';

export default function MainPage() {
      const history = useHistory()
      const [type, setType] = React.useState("Enter Mobile Number");
      const [totalPages, setTotalPages] = React.useState("");
      const [error, setError] = React.useState("");
      const [loading, setLoading] = React.useState(false);
      const [info, setInfo] = React.useState("");
      const [parcelData, setParcelData] = React.useState("");
      const [open, setOpen] = React.useState(false);
      const [totalCount, setTotalCount] = React.useState("");
      const [currentPage, setCurrentPage] = React.useState(1);
      const [skip, setSkip] = React.useState(0);

      const paging = async (val) => {
            setLoading(true)
            let skipVal = 0
            if (!val.currentTarget.outerText && val.currentTarget.ariaLabel == "Go to next page") {
                  setSkip(currentPage * 5)
                  skipVal = currentPage * 5
                  setCurrentPage(currentPage + 1)
            }
            if (!val.currentTarget.outerText && val.currentTarget.ariaLabel == "Go to previous page") {
                  setSkip((currentPage - 2) * 5)
                  skipVal = (currentPage - 2) * 5
                  setCurrentPage(currentPage - 1)
            }
            if (val.currentTarget.outerText) {
                  setSkip((parseInt(val.currentTarget.outerText) - 1) * 5)
                  skipVal = (parseInt(val.currentTarget.outerText) - 1) * 5
                  setCurrentPage(parseInt(val.currentTarget.outerText))
            }            
            let obj = {}
            if (type == "Enter Mobile Number") {
                  obj.contact = info
            }
            if (type == "Enter Parcel Id") {
                  obj.parcelNumber = info
            }
            obj.type = type
            obj.skip = skipVal
            obj.limit = 5
            const response = await apiResponse(params.baseUrl + "searchparcel", obj)
            if (response.data && response.data.data && response.data.data) {
                  setParcelData(response.data.data.data)
                  setTotalCount(response.data.data.count)
                  if (response.data.data.count) {
                        let c = response.data.data.count
                        let divide = Math.floor(c / 5)
                        if (c / 5 !== 0) {
                              divide = divide + 1
                        }
                        setTotalPages(divide)
                  }

            }
            setLoading(false)
      }

      const search = async () => {
            setLoading(true)
            let obj = {}
            if (type == "Enter Mobile Number") {
                  obj.contact = info
            }
            if (type == "Enter Parcel Id") {
                  obj.parcelNumber = info
            }
            obj.type = type
            obj.skip = 0
            obj.limit = 5
            const response = await apiResponse(params.baseUrl + "searchparcel", obj)
            if (response && response.data && response.data.status) {
                  setParcelData(response.data.data.data)
                  setTotalCount(response.data.data.count)
                  if (response.data.data.count) {
                        let c = response.data.data.count
                        let divide = Math.floor(c / 5)
                        if (c / 5 !== 0) {
                              divide = divide + 1
                        }
                        setTotalPages(divide)
                  }
            } else {
                  swal("Error!", "Parcel not found", "error");
            }
            setLoading(false)
      }
      const getInfo = (e) => {
            const { value } = e.target
            setInfo(value)
      }
      const getType = (value) => {
            if (value == "trackingId") {
                  setType("Enter Mobile Number")
            } else {
                  setType("Enter Parcel Id")
            }
      }
      const clear = () => {
            setParcelData("")
      }
      const isLoginComplete = (value) => {
            setLoading(value)
      }
      return (
            <LoadingOverlay active={loading} spinner text='Loading your content...'>
                  <div style={{ backgroundImage: "url(" + BackgroundImage + ")", backgroundSize: "cover", height: "110vh", backgroundPosition: "center", marginBottom: "90px" }}>
                        <Header isLoginComplete={isLoginComplete} />
                        <div className="container" style={{ textAlign: "center", marginTop: "7%" }}>
                              <Row>
                                    <Col md={4}>
                                    </Col>
                                    <Col md={4}>
                                          <div style={{ height: "44px", background: "#f3f3f3" }}>
                                                <h5 style={{ textAlign: "center", paddingTop: "10px" }}>Track Your Order</h5>
                                          </div>
                                          <Card sx={{ minWidth: 275 }}>
                                                <CardContent>
                                                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                            <Radio getType={getType} />
                                                            {/* <TextField placeholder={type} onChange={getInfo} vlaue={""} style={{ display: "block" }}
                                                                  InputProps={{
                                                                        endAdornment: (
                                                                              <InputAdornment>
                                                                                    <Button onClick={search} className="btn btn-primary" style={{marginBottom: "5px"}}>Search</Button>
                                                                              </InputAdornment>
                                                                        )
                                                                  }}
                                                            /> */}
                                                            <Row style={{ margin: "0px 10px" }}>
                                                                  <Col md={8} sm={8} xs={8}>
                                                                        <TextField placeholder={type} onChange={getInfo} vlaue={""} style={{ display: "block" }} />
                                                                  </Col>
                                                                  <Col md={4} sm={4} xs={4}>
                                                                        <Button onClick={search} color="primary">Search</Button>
                                                                  </Col>
                                                            </Row>


                                                      </Typography>
                                                </CardContent>
                                          </Card>
                                    </Col>
                                    <Col md={4}></Col>
                              </Row>
                              {
                                    parcelData && parcelData.length ?
                                          <>
                                                <div style={{ height: "52px", background: "#f3f3f3", marginTop: "10px", borderRadius: "10px 10px 0px 0px" }}>
                                                      <Row>
                                                            <Col md={4}>
                                                                  <Pagination style={{ marginTop: "20px" }} count={totalPages} onChange={paging} />
                                                            </Col>
                                                            <Col md={4}>
                                                                  <h4 style={{ textAlign: "center", paddingTop: "10px" }}>Parcel List</h4>
                                                            </Col>
                                                            <Col md={4}>
                                                                  <Button variant="contained" onClick={clear} color="danger" style={{ float: "right" }}>
                                                                        Clear
                                                                  </Button>
                                                            </Col>
                                                      </Row>
                                                </div>
                                                <Table striped bordered hover style={{ marginBottom: "150px" }}>
                                                      <thead style={{ background: "#dc3545" }}>
                                                            <tr>
                                                                  <th>#</th>
                                                                  <th>Name</th>
                                                                  <th>Parcel No.</th>
                                                                  <th>status</th>
                                                            </tr>
                                                      </thead>
                                                      <tbody style={{ background: "rgb(243, 243, 243)" }}>
                                                            {
                                                                  parcelData && parcelData.length ?
                                                                        parcelData.map((item, index) => (
                                                                              <tr>
                                                                                    <td>{index + 1}</td>
                                                                                    <td>{item.name}</td>
                                                                                    <td>{"GK00" + item.parcelNumber + "INLOG"}</td>
                                                                                    <td>{item.status}</td>
                                                                              </tr>
                                                                        )) : <h1>No Data Found</h1>
                                                            }
                                                      </tbody>
                                                </Table>
                                          </> : ""
                              }

                        </div>
                        <Footer />
                  </div>

                  {/* <p>Some content or children or something.</p> */}


            </LoadingOverlay>
      )
}