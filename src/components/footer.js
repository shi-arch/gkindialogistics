import React, { useState } from 'react';
import Copyright from '../assets/logo.jpg';
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';
import '../App.css';

const Footer = (props) => {
      return (
            <React.Fragment>
                  <div className="footer">
                        <div style={{ padding: "10px 30px 0px 30px"}}>
                              <Row>
                                    <Col md={6} xs={6} sm={6} style={{textAlign: "left"}}>
                                          <img style={{ width: "80px" }} src={Copyright} />
                                          <p>Pratap Vihar , Ghaziabad , Uttar Pradesh - 201001</p>
                                    </Col>
                                    <Col md={6} xs={6} sm={6} style={{textAlign: "right", marginTop: "35px"}}>
                                          <p><a href="">Terms & Conditions</a></p>
                                          <p>© 2021 www.gkindialogistics.com. All rights reserved.</p>
                                    </Col>
                              </Row>
                        </div>
                  </div>
            </React.Fragment>

      );
}

export default Footer;