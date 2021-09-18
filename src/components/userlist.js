import React, { Component, useEffect } from 'react';
import Header from './header'
import Footer from './footer'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Pagination from '@material-ui/lab/Pagination';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { params } from '../constants/constants'
import InputLabel from '@material-ui/core/InputLabel';
import { Container, Col, Form, Row, FormGroup, Label, Input, Button, Table } from 'reactstrap';
import swal from 'sweetalert';
import { apiResponse } from '../apiresponse/response'
import { useHistory } from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}));


export default function UserList() {
  const history = useHistory()
  const classes = useStyles();
  const [error, setError] = React.useState("");
  const [errType, setErrType] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [name, setName] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [pinCode, setPinCode] = React.useState("");
  const [city, setCity] = React.useState("");
  const [address1, setAddress1] = React.useState("");
  const [address2, setAddress2] = React.useState("");
  const [parcelData, setParcelData] = React.useState("");
  const [totalCount, setTotalCount] = React.useState("");
  const [totalPages, setTotalPages] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [skip, setSkip] = React.useState(0);
  const [age, setAge] = React.useState("");
  const [limit, setLimit] = React.useState(10);
  const [update, setUpdate] = React.useState(false);

  useEffect(async () => {
    let userData = localStorage.getItem("userName");
    if (!userData) {
      history.push("/")
    }
    const response = await apiResponse(params.baseUrl + "getallparcel", { skip: skip, limit: 10 })
    if (response.data && response.data.data && response.data.data) {
      setParcelData(response.data.data.data)
      setTotalCount(response.data.data.count)
      if (response.data.data.count) {
        let c = response.data.data.count
        let divide = Math.floor(c / 10)
        if (c / 10 !== 0) {
          divide = divide + 1
        }
        setTotalPages(divide)
      }

    }
  }, [update]);

  const generateCode = async () => {
    if (isValid()) {
      setError("")
      setErrType("")
      const obj = {
        name: name, pinCode: pinCode, address2: address2, address1: address1, country: country, region: region, city: city, contact: contact, status: "Recieved"
      }
      const response = await apiResponse(params.baseUrl + "generateparcel", obj)
      console.log(response, 'rr')
      if (response && response.data && response.data.status) {
        setUpdate(!update)
        swal("Good job!", "A new parcel is generated!", "success");
      } else {
        swal("Error!", "Something went wrong", "error");
      }
    }
  }
  const selectCountry = (val) => {
    setCountry(val)
  }

  const selectRegion = (val) => {
    setRegion(val)
  }
  const getData = (e) => {
    const { value } = e.target
    const { name } = e.target
    switch (name) {
      case "name":
        setName(value)
        break;
      case "contact":
        setContact(value)
        break;
      case "city":
        setCity(value)
        break;
      case "pinCode":
        setPinCode(value)
        break;
      case "address1":
        setAddress1(value)
        break;
      case "address2":
        setAddress2(value)
    }
  }

  const isValid = () => {
    var pinPat = /^\d{6}$/;
    const phoneno = /^\d{10}$/;
    let valid = true
    if (!name) {
      setError("Please enter the name")
      setErrType("name")
      return valid = false
    }
    if (!contact) {
      setError("Please enter the contact")
      setErrType("contact")
      return valid = false
    }
    if (contact && !contact.match(phoneno)) {
      setErrType("contact")
      setError("Contact number is invalid")
      return valid = false
    }
    if (!address1 && !address2) {
      setErrType("address")
      setError("Please fill atleast one column of the Address")
      return valid = false
    }
    if (!country || !region) {
      setErrType("cntryRgn")
      setError("Country or Region is missing")
      return valid = false
    }
    if (!pinCode) {
      setErrType("pinCode")
      setError("Please enter the Pincode")
      return valid = false
    }
    if (pinCode && !pinCode.match(pinPat)) {
      setErrType("pinCode")
      setError("Pin number is invalid")
      return valid = false
    }
    if (!city) {
      setErrType("city")
      setError("Please enter the City")
      return valid = false
    }
    return valid
  }
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const paging = (val) => {
    if (!val.currentTarget.outerText && val.currentTarget.ariaLabel == "Go to next page") {
      setSkip(currentPage * 10)
      setCurrentPage(currentPage + 1)
    }
    if (!val.currentTarget.outerText && val.currentTarget.ariaLabel == "Go to previous page") {
      setSkip((currentPage - 2) * 10)
      setCurrentPage(currentPage - 1)
    }
    if (val.currentTarget.outerText) {
      setSkip((parseInt(val.currentTarget.outerText) - 1) * 10)
      setCurrentPage(parseInt(val.currentTarget.outerText))
    }
    setUpdate(!update)
  }

  const changeStatus = async (val) => {
    const response = await apiResponse(params.baseUrl + "updateparcel", {parcelNumber: val, status: age})
    if (response && response.data && response.data.status) {
      swal("Good job!", "Parcel Updated Successfully", "success");
    } else {
      swal("Error!", "Something went wrong", "error");
    }
  }

  return (
    <>
      <Header />
      <div style={{ textAlign: "center", padding: "0px 15px" }}>
        <div className="row">
          <div className="col-md-6">
            <div style={{ height: "60px", background: "#f3f3f3", borderRadius: "10px 10px 0px 0px" }}>
              <div className="row">
                <div className="col-md-4">
                </div>
                <div className="col-md-4">
                  <h4 style={{ textAlign: "center", paddingTop: "14px" }}>Parcel List</h4>
                </div>
                <div className="col-md-4">
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Change Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      onChange={handleChange}
                    >
                      <MenuItem value={"Recieved"}>Recieved</MenuItem>
                      <MenuItem value={"Dispatch"}>Dispatch</MenuItem>
                      <MenuItem value={"Dilivered"}>Dilivered</MenuItem>
                      <MenuItem value={"Returned"}>Returned</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>


            </div>
            <Table striped bordered hover style={{ marginBottom: "100px" }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Contact</th>
                  <th>Parcel No.</th>
                  <th>Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  parcelData && parcelData.length ?
                    parcelData.map((item, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.contact}</td>
                        <td>{"GK00" + item.parcelNumber + "INLOG"}
                        </td>
                        <td>
                          <Button style={{ marginTop: "10px" }} onClick={() => changeStatus(item.parcelNumber)} color="primary">Status Update</Button>
                        </td>
                      </tr>
                    )) : <h1>No Data Found</h1>
                }
              </tbody>
            </Table>
          </div>
          <div className="col-md-6">
            <div style={{ height: "60px", background: "#f3f3f3", borderRadius: "10px 10px 0px 0px" }}>
              <h4 style={{ textAlign: "center", paddingTop: "14px" }}>Parcel Entry</h4>
            </div>
            <form className={classes.root} noValidate autoComplete="off" style={{ maxWidth: "none" }}>
              <div className="row">
                <div className="col-md-6">
                  <TextField style={{ width: "100%" }} id="standard-basic" value={name} onChange={getData} name="name" label="Name" />
                  <span style={{ color: "red", float: "left" }}>{errType == "name" ? error : ""}</span>
                </div>
                <div className="col-md-6">
                  <TextField style={{ width: "100%" }} id="standard-basic" value={contact} onChange={getData} name="contact" label="Contact" />
                  <span style={{ color: "red", float: "left" }}>{errType == "contact" ? error : ""}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <TextField style={{ width: "100%" }} id="standard-basic" value={address1} onChange={getData} name="address1" label="Address-1" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <TextField style={{ width: "100%" }} id="standard-basic" value={address2} onChange={getData} name="address2" label="Address-2" />
                  <span style={{ color: "red", float: "left" }}>{errType == "address" ? error : ""}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6" style={{ marginTop: "20px" }}>
                  <CountryDropdown
                    style={{ padding: "5px", width: "100%" }}
                    value={country}
                    onChange={(val) => selectCountry(val)} />
                  <RegionDropdown
                    style={{ padding: "5px", width: "100%" }}
                    country={country}
                    value={region}
                    onChange={(val) => selectRegion(val)} />
                </div>
                <span style={{ color: "red", textAlign: "left" }}>{errType == "cntryRgn" ? error : ""}</span>
                <div className="col-md-6">
                  <TextField style={{ width: "100%" }} id="standard-basic" value={pinCode} onChange={getData} name="pinCode" label="Pin-code" />
                  <span style={{ color: "red", float: "left" }}>{errType == "pinCode" ? error : ""}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <TextField style={{ width: "100%" }} id="standard-basic" value={city} onChange={getData} name="city" label="City" />
                  <span style={{ color: "red", float: "left" }}>{errType == "city" ? error : ""}</span>
                </div>
                <div className="col-md-6">
                  <Button style={{ marginTop: "10px", width: "100%" }} onClick={generateCode} color="primary">Submit</Button>
                </div>
              </div>
              <Pagination style={{ marginTop: "20px" }} count={totalPages} onChange={paging} />
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}