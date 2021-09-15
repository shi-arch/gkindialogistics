import React, { useState } from 'react';
import Parcel from '../assets/parcel.png';
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';  

const Header = (props) => {
      return (
            <React.Fragment>
                  <div style={{ background: "rgb(226 229 232)", marginBottom: "25px" }}>
                        <div className="container" style={{ padding: "10px 0px"}}>
                              <div className="row">
                                    <div className="col-md-4"><img style={{ width: "60px" }} src={Parcel} /></div>
                                    <div className="col-md-4">
                                          <h1 style={{ color: "blue" }}>DELHIVERY TEST</h1>
                                    </div>
                                    <div className="col-md-4" style={{marginTop: "10px"}}>
                                          <Button variant="contained" color="primary" style={{marginRight: "10px"}}>
                                                Vendor Login
                                          </Button>
                                          <Button variant="contained" color="primary" style={{marginRight: "10px"}}>
                                                Admin Login
                                          </Button>
                                          <Button variant="contained" color="secondary">
                                                Contact Us
                                          </Button>
                                    </div>
                              </div>
                        </div>
                  </div>
            </React.Fragment>

      );
}

export default Header;