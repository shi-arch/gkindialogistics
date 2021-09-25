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
import Checkbox from '@mui/material/Checkbox';
import { apiResponse } from '../apiresponse/response'
import { useHistory } from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import LoadingOverlay from 'react-loading-overlay';
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
  const [parcelData, setParcelData] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [selectedParcelNumbers, setSelectedParcelNumbers] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState("");
  const [totalPages, setTotalPages] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [skip, setSkip] = React.useState(0);
  const [age, setAge] = React.useState("");
  const [limit, setLimit] = React.useState(10);
  const [update, setUpdate] = React.useState(false);

  useEffect(async () => {
    setLoading(true)
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
    setLoading(false)
  }, [update]);
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
  const getParcelId = (val, e) => {
    let arr = selectedParcelNumbers
    if (e.target.checked) {
      arr.push({ parcelNumber: val })
    } else {
      const findVal = arr.find(item => item.parcelNumber == val)
      const findIndex = arr.findIndex(element => element.parcelNumber == findVal.parcelNumber)
      arr.splice(findIndex, 1)
    }
    setSelectedParcelNumbers(arr)
  }
  const changeStatus = async (val) => {
    setLoading(true)
    const response = await apiResponse(params.baseUrl + "updateparcel", { data: [{ parcelNumber: val }], status: age })
    if (response && response.data && response.data.status) {
      swal("Good job!", "Parcel Updated Successfully", "success");
      setUpdate(!update)
    } else {
      swal("Error!", "Something went wrong", "error");
    }
    setLoading(false)
  }

  const updateMultiple = async () => {
    setLoading(true)
    if (!selectedParcelNumbers.length) {
      swal("Error!", "Please select some value", "error");
    } else {
      const response = await apiResponse(params.baseUrl + "updateparcel", { data: selectedParcelNumbers, status: age })
      if (response && response.data && response.data.status) {
        setUpdate(!update)
        swal("Good job!", "Parcel Updated Successfully", "success");
      } else {
        swal("Error!", "Something went wrong", "error");
      }
    }
    setLoading(false)
  }
  const goToForm = () => {
    history.push("/form")
  }

  return (
    <>
      <LoadingOverlay active={loading} spinner text='Loading your content...'>
        <Header />
        <div style={{ textAlign: "center", padding: "0px 15px" }}>
          <Row>
            <Col md={12}>
              <div style={{ height: "60px", background: "#f3f3f3", borderRadius: "10px 10px 0px 0px" }}>
                <Row>
                  <Col md={3}>
                    <Button onClick={updateMultiple} style={{ marginTop: "12px" }} color="primary">
                      Multiple Status Update
                    </Button>
                  </Col>
                  <Col md={3}>
                    <Button onClick={goToForm} style={{ marginTop: "12px" }} color="primary">
                      Add Parcel
                    </Button>
                  </Col>
                  <Col md={3}>
                    <h4 style={{ textAlign: "center", paddingTop: "14px" }}>Parcel List</h4>
                  </Col>
                  <Col md={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">Status</InputLabel>
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
                  </Col>
                </Row>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>City</th>
                    <th>Pin Code</th>
                    <th>Parcel No.</th>
                    <th>Status</th>
                    <th>Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    parcelData && parcelData.length ?
                      parcelData.map((item, index) => (
                        <tr>
                          <td>{index + 1}<Checkbox onChange={(e) => getParcelId(item.parcelNumber, e)} {...label} /></td>
                          <td>{item.name}</td>
                          <td>{item.contact}</td>
                          <td>{item.city}</td>
                          <td>{item.pinCode}</td>
                          <td>{"GK00" + item.parcelNumber + "INLOG"}
                          </td>
                          <td>{item.status}</td>
                          <td>
                            <Button style={{ marginTop: "10px" }} onClick={() => changeStatus(item.parcelNumber)} color="primary">Status Update</Button>
                          </td>
                        </tr>
                      )) : <h1>No Data Found</h1>
                  }
                </tbody>
              </Table>
            </Col>
          </Row>
          <Pagination style={{ marginBottom: "101px" }} count={totalPages} onChange={paging} />
        </div>

        <Footer />
      </LoadingOverlay>

    </>
  )
}