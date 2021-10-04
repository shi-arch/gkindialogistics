import React, { Component, useEffect } from 'react';
import Header from './header'
import Pagination from '@material-ui/lab/Pagination';
import Footer from './footer'
import SearchBar from 'material-ui-search-bar'
import Radio from '../common/radio'
import { TextField, Icon } from '@material-ui/core';
import LoadingOverlay from 'react-loading-overlay';
import HighlightOff from '@mui/icons-material/HighlightOff';
import { apiResponse } from '../apiresponse/response'
import { Container, Col, Form, Row, Button, Table } from 'reactstrap';
import { params } from '../constants/constants'
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
      "@media (max-width: 533px)": {
            botSpace: {
                  marginTop: "-13%!important"
            },
      }
}));

export default function MainPage() {
      const classes = useStyles();
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
      const clean = () => {
            setInfo("")
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
            debugger
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
            setInfo(e)
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
            <LoadingOverlay active={loading} styles={{
                  wrapper: {
                    width: '100%',
                    position: "absolute",
                    height: '100%',
                    overflow: loading ? 'hidden' : 'scroll'
                  }
                }} spinner text='Loading your content...'>
                  <div>
                        <Header isLoginComplete={isLoginComplete} />
                        <div  style={{ textAlign: "center", marginTop: "7%", margin: "0px 5px" }}>
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
                                                                  <Col md={12} sm={12} xs={12}>
                                                                        {/* <TextField placeholder={type} onChange={getInfo} vlaue={""} style={{ display: "block" }} /> */}
                                                                        <SearchBar
                                                                              value={info}
                                                                              onChange={getInfo}
                                                                              onRequestSearch={search}
                                                                              onCancelSearch={clean}
                                                                              style={{
                                                                                    margin: '0 auto',
                                                                                    maxWidth: 800
                                                                              }}
                                                                        />
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
                                          <div style={{marginLeft: "20px", marginRight: "20px"}}>
                                                <div style={{ height: "52px", background: "#f3f3f3", marginTop: "10px", borderRadius: "10px 10px 0px 0px" }}>
                                                      <Row>
                                                            <Col md={4} xs={5} sm={5}>
                                                                  <Pagination style={{ marginTop: "20px" }} count={totalPages} onChange={paging} />
                                                            </Col>
                                                            <Col md={4} xs={4} sm={4}>
                                                                  <h4 style={{ textAlign: "center", paddingTop: "10px" }}>Parcel List</h4>
                                                            </Col>
                                                            <Col md={4} xs={3} sm={3} style={{textAlign: "right", cursor: "pointer"}}>
                                                                  < HighlightOff onClick={clear} />
                                                                  {/* <Button variant="contained" onClick={clear} style={{ float: "right" }}>
                                                                        Clear
                                                                  </Button> */}
                                                            </Col>
                                                      </Row>
                                                </div>
                                                <Table striped bordered hover style={{ marginBottom: "150px" }}>
                                                      <thead style={{ background: "rgb(15, 153, 211)" }}>
                                                            <tr>
                                                                  <th>#</th>
                                                                  <th>Date</th>
                                                                  <th>Time</th>
                                                                  <th>Branch Name</th>
                                                                  <th>status</th>
                                                            </tr>
                                                      </thead>
                                                      <tbody style={{ background: "rgb(243, 243, 243)" }}>
                                                            {
                                                                  parcelData && parcelData.length ?
                                                                        parcelData.map((item, index) => (
                                                                              <tr>
                                                                                    <td>{index + 1}</td>
                                                                                    <td>
                                                                                          {
                                                                                                new Date(item.bookingDate).getDate()+'/'+(new Date(item.bookingDate).getMonth()+1)+'/'+new Date(item.bookingDate).getFullYear()
                                                                                          }
                                                                                    </td>
                                                                                    <td>
                                                                                          {
                                                                                                new Date(item.bookingDate).getHours() + ":" + new Date(item.bookingDate).getMinutes() + ":" + new Date(item.bookingDate).getSeconds()
                                                                                          }
                                                                                    </td>
                                                                                    <td>{item.branch}</td>
                                                                                    <td>{item.status}</td>
                                                                              </tr>
                                                                        )) : <h1>No Data Found</h1>
                                                            }
                                                      </tbody>
                                                </Table>
                                          </div> : ""
                              }

                        </div>
                        <Footer />
                  </div>

                  {/* <p>Some content or children or something.</p> */}


            </LoadingOverlay>
      )
}