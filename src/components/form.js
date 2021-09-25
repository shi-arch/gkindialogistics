import React, { Component, useEffect } from 'react';
import Header from './header'
import Footer from './footer'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { params } from '../constants/constants'
import LoadingOverlay from 'react-loading-overlay';
import { Container, Col, Form, Row, FormGroup, Label, Input, Button, Table } from 'reactstrap';
import swal from 'sweetalert';
import Checkbox from '@mui/material/Checkbox';
import { apiResponse } from '../apiresponse/response'
import { useHistory } from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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
    const [loading, setLoading] = React.useState(false);
    const [errType, setErrType] = React.useState("");
    const [region, setRegion] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [name, setName] = React.useState("");
    const [contact, setContact] = React.useState("");
    const [pinCode, setPinCode] = React.useState("");
    const [city, setCity] = React.useState("");
    const [address1, setAddress1] = React.useState("");
    const [address2, setAddress2] = React.useState("");
    const [update, setUpdate] = React.useState(false);

    useEffect(() => {
        let userData = localStorage.getItem("userName");
        if (!userData) {
            history.push("/")
        }
    }, []);

    const generateCode = async () => {
        setLoading(true)
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
        setLoading(false)
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

    return (
        <>
        <LoadingOverlay active={loading} spinner text='Loading your content...'>
        <Header />
            <Row>
                <Col md={3}>
                </Col>
                <Col md={6}>
                    <div style={{ height: "60px", background: "#f3f3f3", borderRadius: "10px 10px 0px 0px" }}>
                        <h4 style={{ textAlign: "center", paddingTop: "14px" }}>Parcel Entry</h4>
                    </div>
                    <form className={classes.root} noValidate autoComplete="off" style={{ maxWidth: "none" }}>
                        <Row>
                            <Col md={6}>                           
                                <TextField style={{ width: "100%" }} id="standard-basic" value={name} onChange={getData} name="name" label="Name" />
                                <span style={{ color: "red", float: "left" }}>{errType == "name" ? error : ""}</span>
                                </Col>
                                <Col md={6}>  
                                <TextField style={{ width: "100%" }} id="standard-basic" value={contact} onChange={getData} name="contact" label="Contact" />
                                <span style={{ color: "red", float: "left" }}>{errType == "contact" ? error : ""}</span>
                                </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <TextField style={{ width: "100%" }} id="standard-basic" value={address1} onChange={getData} name="address1" label="Address-1" />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                            <TextField style={{ width: "100%" }} id="standard-basic" value={address2} onChange={getData} name="address2" label="Address-2" />
                            <span style={{ color: "red", float: "left" }}>{errType == "address" ? error : ""}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} style={{ marginTop: "20px" }}>
                                <CountryDropdown
                                    style={{ padding: "5px", width: "100%" }}
                                    value={country}
                                    onChange={(val) => selectCountry(val)} />
                                <RegionDropdown
                                    style={{ padding: "5px", width: "100%" }}
                                    country={country}
                                    value={region}
                                    onChange={(val) => selectRegion(val)} />
                            </Col>
                            <span style={{ color: "red", textAlign: "left" }}>{errType == "cntryRgn" ? error : ""}</span>
                            <Col md={6}></Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <TextField style={{ width: "100%" }} id="standard-basic" value={city} onChange={getData} name="city" label="City" />
                                <span style={{ color: "red", float: "left" }}>{errType == "city" ? error : ""}</span>
                            </Col>
                            <Col md={6}>
                            <TextField style={{ width: "100%" }} id="standard-basic" value={pinCode} onChange={getData} name="pinCode" label="Pin-code" />
                                <span style={{ color: "red", float: "left" }}>{errType == "pinCode" ? error : ""}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                            <Button style={{ marginTop: "10px", width: "100%" }} onClick={generateCode} color="primary">Submit</Button>
                            </Col>
                        </Row>
                    </form>
                </Col>
                <Col md={3}>
                </Col>
            </Row>
            <Footer />
        </LoadingOverlay>
            
        </>
    )
}