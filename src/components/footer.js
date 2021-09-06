import React, { useState } from 'react';
import Copyright from '../assets/copyright.png';
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';  
import '../App.css';

const Footer = (props) => {
      return (
            <React.Fragment>
                  <div style={{ background: "black" }} className="footer">
                        <div style={{ padding: "10px 0px", margin: "0px 10px" }}>
                              <div className="row">
                                    <div className="col-md-4"><img style={{ width: "60px", float: "left", marginTop: "8px" }} src={Copyright} /></div>
                                    <div className="col-md-4">
                                          <h1 style={{ color: "white" }}>DELHIVERY</h1>
                                    </div>
                                    <div className="col-md-4" style={{marginTop: "10px"}}>                                          
                                          <Button variant="contained" className="btn btn-danger" style={{float: "right"}}>
                                                Contact Us
                                          </Button>
                                    </div>
                              </div>
                        </div>
                  </div>
            </React.Fragment>

      );
}

export default Footer;