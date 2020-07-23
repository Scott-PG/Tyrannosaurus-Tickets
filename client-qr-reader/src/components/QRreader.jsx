import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import axios from 'axios'
import TicketInfo from './TicketInfo'


export default class QRreader extends Component {
  state = {
    ticketObj: null,
    canRead: true,
    apiURL: window.location.hostname === "localhost" ? "http://localhost:3000/api/decryptticket" : "https://tyrannosaurus-tickets.herokuapp.com/api/decryptticket"
  }
  
  delayNextRead = () => {
    this.setState({
      canRead: false
    })

    setTimeout(() => {
      this.setState({
        canRead: true 
      })
    },2000)
  }

  handleScan = async data => {
    // load the qr code into state 
    if (data && this.state.canRead) {
      this.delayNextRead()

      console.log(data)

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
          style={{ width: '50%' , minWidth: '400px' }}
        />
        <h3 style={{color: this.state.canRead ? "green" : "red"}}>QR Reader: {this.state.canRead ? 'Reading' : 'Paused'}</h3>
        
        <TicketInfo ticket={this.state.ticketObj} />
          
      </div>
    )
  }
}
