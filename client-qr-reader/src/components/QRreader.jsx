import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import axios from 'axios'
import TicketInfo from './TicketInfo'


export default class QRreader extends Component {
  state = {
    qrCode: null,
    ticketObj: null,
    apiURL: window.location.hostname === "localhost" ? "http://localhost:3000/api/decryptticket" : ""
  }
  
  // for testing purposes, use code on componentDidMount instead of in onScan
  // async componentDidMount() {
  //   const qrTestCode = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aWNrZXRfSUQiOiI1ZjE4OTg1MzA3NmEyNTBkNjY0N2M0NjAiLCJuYW1lX29uX3RpY2tldCI6IkJvYiBCb2JiZXJzb24iLCJ0aW1lX2dlbmVyYXRlZCI6IldlZCwgMjIgSnVsIDIwMjAgMTk6NDk6MzkgR01UIiwiaWF0IjoxNTk1NDQ3Mzc5fQ.qgDl7GBwQnAZDgd0SdLnfzMPd8anegFs7QyNdumFG6I'

  //   console.log(this.state.apiURL)

  //   // send the qr code via api to decrypt 
  //   const response = await axios.post(this.state.apiURL, {
  //     encrypted_qr_code: qrTestCode
  //   })

  //   console.log(response)

  //   this.setState({
  //     ticketObj: response.data
  //   })
  // }

  handleScan = async data => {
    // load the qr code into state 
    if (data) {
      this.setState({
        qrCode: data
      })

      // send the qr code via api to decrypt 
      const response = await axios.post(this.state.apiURL, {
        encrypted_qr_code: data
      })

      console.log(response)

      this.setState({
        ticketObj: response.data
      })
    }
  }

  handleError = err => {
    console.error(err)
  }

  render() {
    return (
      <div>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '50%' }}
        />
        <p>{this.state.qrCode ? 'QR-Code Detected' : 'No QR-Code Detected' }</p>
        
        <TicketInfo ticket={this.state.ticketObj} />
          
      </div>
    )
  }
}
