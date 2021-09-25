import React, { useState } from 'react';
import Copyright from '../assets/copyright.jpeg';
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';
import '../App.css';

const Footer = (props) => {
      return (
            <React.Fragment>
                  <div className="footer">
                        <div style={{ padding: "10px 10px", background: "black"}}>
                              <Row>
                                    <Col md={4} xs={4} sm={4}>
                                          <img style={{ width: "60px", float: "left" }} src={Copyright} />
                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                          <span style={{ color: "#dc3545" }}>Company</span>
                                          <a href="/">
                                                <span style={{ color: "#fff", display: "block" }}>About us</span>
                                          </a>
                                          <a href="/">
                                                <span style={{ color: "#fff", display: "block" }}>Services</span>
                                          </a>
                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                          <Button variant="contained" className="btn btn-danger" style={{ float: "right", marginTop: "5px" }}>
                                                Contact Us
                                          </Button>
                                    </Col>
                              </Row>
                        </div>
                  </div>
            </React.Fragment>

      );
}

export default Footer;