import React, { Component, useEffect } from 'react';
import Header from './header'
import Footer from './footer'
import Radio from '../common/radio'
import { TextField, Icon } from '@material-ui/core';
import { apiResponse } from '../apiresponse/response'
import IconButton from "@material-ui/core/IconButton";
import { Container, Col, Form, Row, FormGroup, Label, Input, Button, Table } from 'reactstrap';
import { params } from '../constants/constants'
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import InputAdornment from "@material-ui/core/InputAdornment";

export default function MainPage() {
      const history = useHistory()
      const [type, setType] = React.useState("Enter Mobile Number");
      const [error, setError] = React.useState("");
      const [info, setInfo] = React.useState("");
      const [parcelData, setParcelData] = React.useState("");
      const [open, setOpen] = React.useState(false);     
      const search = async () => {
            let obj = {}
            if (type == "Enter Mobile Number") {
                  obj.contact = info
            }
            if (type == "Enter Parcel Id") {
                  obj.parcelNumber = info
            }
            obj.type = type
            const response = await apiResponse(params.baseUrl + "searchparcel", obj)
            if (response && response.data && response.data.status) {
                  setParcelData(response.data.data)
            } else {
                  swal("Error!", "Parcel not found", "error");
            }
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
      return (
            <>
                  <Header notShowBack={true} />
                  <div className="container" style={{ textAlign: "center" }}>
                        <div style={{ height: "52px", background: "#f3f3f3", borderRadius: "10px 10px 0px 0px" }}>
                              <h4 style={{ textAlign: "center", paddingTop: "10px" }}>Track Your Order</h4>
                        </div>
                        <Radio getType={getType} />
                        <TextField placeholder={type} onChange={getInfo} vlaue={""} style={{ display: "block" }}
                              InputProps={{
                                    endAdornment: (
                                          <InputAdornment>
                                                <IconButton>
                                                      <Icon onClick={search}>search</Icon>
                                                </IconButton>
                                          </InputAdornment>
                                    )
                              }}
                        />
                        {
                              parcelData && parcelData.length ?
                                    <>
                                          <div style={{ height: "52px", background: "#f3f3f3", marginTop: "10px", borderRadius: "10px 10px 0px 0px" }}>
                                                <div className="row">
                                                      <div className="col-md-4">

                                                      </div>
                                                      <div className="col-md-4">
                                                            <h4 style={{ textAlign: "center", paddingTop: "10px" }}>Parcel List</h4>
                                                      </div>
                                                      <div className="col-md-4">
                                                            <Button variant="contained" onClick={clear} color="danger" style={{ float: "right" }}>
                                                                  Clear
                                                            </Button>
                                                      </div>
                                                </div>

                                          </div>
                                          <Table striped bordered hover style={{ marginBottom: "100px" }}>
                                                <thead>
                                                      <tr>
                                                            <th>#</th>
                                                            <th>Name</th>
                                                            <th>Parcel No.</th>
                                                            <th>status</th>
                                                      </tr>
                                                </thead>
                                                <tbody>
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
            </>
      )
}