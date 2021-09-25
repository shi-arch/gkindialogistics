import React, { useEffect } from 'react';
import Parcel from '../assets/logo.jpg';
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Link } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { apiResponse } from '../apiresponse/response'
import { params } from '../constants/constants'
import { useHistory } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
      root: {
            '& .MuiTextField-root': {
                  margin: theme.spacing(1),
                  width: '25ch',
            },
      },
}));


const Header = (props) => {
      const classes = useStyles();
      const history = useHistory()
      const [open, setOpen] = React.useState(false);
      const [email, setEmail] = React.useState("");
      const [adminLabel, setAdminLabel] = React.useState("");
      const [error, setError] = React.useState("");
      const [password, setPassword] = React.useState("");
      const handleClickOpen = () => {
            if (localStorage.getItem("userName")) {
                  localStorage.setItem("userName", "")
                  window.location.replace('/');
            } else {
                  setOpen(true);
            }
      };
      const goBack = () => {
            history.push("/")
      }
      useEffect(async () => {
            if (localStorage.getItem("userName")) {
                  setAdminLabel("Admin Logout")
            } else {
                  setAdminLabel("Admin Login")
            }
      }, [])
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const getFormData = (e) => {
            const { value } = e.target
            const { name } = e.target
            if (name == "email") {
                  setEmail(value)
            } else {
                  setPassword(value)
            }
      }
      const handleClose = async () => {
            setOpen(false);
      };
      const login = async () => {
            props.isLoginComplete(true)
            setOpen(false);
            if (email.match(mailformat)) {
                  const loginResponse = await apiResponse(params.baseUrl + "adminlogin", { email: email, password: password, admin: true })
                  if (loginResponse && loginResponse.status) {
                        localStorage.setItem("userName", loginResponse.data.data.email);
                        history.push("/userlist")
                  } else {
                        setError("Login fails")
                  }
            } else {
                  setError("Incorrect email formate")
            }
            props.isLoginComplete(false)
      };
      return (
            <React.Fragment>
                  <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                  >
                        <DialogTitle id="alert-dialog-slide-title">{"Admin Login"}</DialogTitle>
                        <DialogContent>
                              <DialogContentText id="alert-dialog-slide-description">
                                    <form className={classes.root} noValidate autoComplete="off">
                                          <TextField id="standard-basic" value={email} name="email" onChange={getFormData} label="Email" />
                                    </form>
                                    <span style={{ color: "red", marginLeft: "7px" }}>{error}</span>
                                    <form className={classes.root} noValidate autoComplete="off">
                                          <TextField id="standard-basic" type="password" name="password" onChange={getFormData} label="Password" />
                                    </form>
                              </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                              <Button onClick={login} color="primary">
                                    Login
                              </Button>
                              <Button onClick={handleClose} color="primary">
                                    Cancel
                              </Button>
                        </DialogActions>
                  </Dialog>
                  <div style={{ margin: "0px", padding: "10px 10px", textAlign: "center" }}>
                        <Row>
                              <Col md={1} sm={6} xs={6}>
                                    <Button variant="contained" color="primary" onClick={goBack} style={{ marginRight: "10px", marginTop: "15px" }}>
                                          <KeyboardBackspaceIcon />
                                    </Button>
                              </Col>
                              <Col md={2} sm={6} xs={6}>
                                    <img style={{ width: "100px" }} src={Parcel} />
                              </Col>
                              <Col md={5}>
                                    <h1 style={{ color: "blue", textAlign: "end" }}>GKINDIALOGISTICS</h1>
                              </Col>
                              <Col md={4}>
                                    <Button variant="contained" onClick={goBack} style={{ marginRight: "10px" }} color="primary">
                                          Home
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={handleClickOpen} style={{ marginRight: "10px" }}>
                                          {adminLabel}
                                    </Button>
                                    <Button variant="contained" color="secondary">
                                          Contact Us
                                    </Button>
                              </Col>
                        </Row>
                  </div>
            </React.Fragment>

      );
}

export default Header;