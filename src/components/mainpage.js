import React, { Component } from 'react';
import Header from './header'
import Footer from './footer'
import Radio from '../common/radio'
import { TextField, Icon } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

export default function MainPage() {
      return (
            <>
                  <Header />
                  <div className="container" style={{ textAlign: "center" }}>
                        <div style={{ height: "52px", background: "#f3f3f3", borderRadius: "10px 10px 0px 0px" }}>
                              <h4 style={{ textAlign: "center", paddingTop: "10px" }}>Track Your Order</h4>
                        </div>
                        <Radio />
                        <TextField style={{display: "block"}}  
                              InputProps={{
                                    endAdornment: (
                                          <InputAdornment>
                                                <IconButton>
                                                      <Icon>search</Icon>
                                                </IconButton>
                                          </InputAdornment>
                                    )
                              }}
                        />
                  </div>
                  <Footer />
            </>
      )
}