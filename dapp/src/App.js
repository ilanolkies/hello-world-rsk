import React, { Component } from 'react';
import { Container, Row, Col, Spinner, InputGroup, FormControl, Button, Alert } from 'react-bootstrap';
import Web3 from 'web3';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: null,
      newMessage: '',
      setting: false,
      transactionHash: null,
      error: null,
    };

    this.getMessage = this.getMessage.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  componentDidMount() {
    this.getMessage();
  }

  getMessage() {
    this.setState({ message: null });

    const web3 = new Web3(process.env.REACT_APP_NODE_ENDPOINT);

    const helloWorld = new web3.eth.Contract([
      {
        constant: true,
        inputs: [],
        name: "getMessage",
        outputs: [
          { internalType: "string", name: "", type: "string" }
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ], process.env.REACT_APP_HELLO_WORLD_ADDRESS);

    helloWorld.methods.getMessage().call().then(message => this.setState({ message }));
  }

  handleMessageChange(event) {
    this.setState({ newMessage: event.target.value });
  }

  setMessage() {
    const { newMessage } = this.state;

    if (!newMessage) {
      this.setState({ error: 'Type a message' });
      return;
    }
    this.setState({ setting: true, txHash: null, error: null });

    window.ethereum.enable().then(accounts => {
      const web3 = new Web3(window.ethereum);

      web3.eth.net.getId()
      .then(networkId => {
        if (networkId.toString() !== process.env.REACT_APP_NET_ID) this.setState({ error: 'Wrong network. Please connect to your local network.' });
        else {
          const helloWorld = new web3.eth.Contract([
            {
              constant: false,
              inputs: [
                { internalType: "string", name: "newMessage", type: "string" }
              ],
              name: "setMessage",
              outputs: [],
              payable: false,
              stateMutability: "nonpayable",
              type: "function",
            },
          ], process.env.REACT_APP_HELLO_WORLD_ADDRESS);

          return helloWorld.methods.setMessage(newMessage).send({ from: accounts[0] })
          .on('receipt', ({ transactionHash }) => {
            this.setState({ transactionHash, setting: false });
            return this.getMessage();
          })
          .catch(error => this.setState({ error: error.message, setting: false }))
        }
      });
    }).catch(error => this.setState({ error: error.message, setting: false }))
  }

  render() {
    const { message, newMessage, setting, transactionHash, error } = this.state;

    return (
      <Container style={{ textAlign: 'center' }}>
        <Row>
          <Col>
            <h1>Hello world - RSK</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            Message: {message || <Spinner animation="border" />} <Button variant="link" onClick={this.getMessage}>reload</Button>
          </Col>
        </Row>
        {
          !window.ethereum ?
          <p>Please install <a href="https://chrome.google.com/webstore/detail/nifty-wallet/jbdaocneiiinmjbjlgalhcelgbejmnid?hl=en" targer="_blank" ref="">Nifty wallet</a> to set the message.</p> :
          <>
            <Row>
              <InputGroup>
                <FormControl type="text" value={newMessage} onChange={this.handleMessageChange} disabled={setting} />
                <Button onClick={this.setMessage} disabled={setting}>Set Message</Button>
              </InputGroup>
            </Row>
            {setting && <Row><Col><Spinner animation="border" /></Col></Row>}
            {error && <Row><Col><Alert variant="danger">{error}</Alert></Col></Row>}
            {transactionHash && <Row><Col><Alert variant="success">Success! Transaction id: {transactionHash}</Alert></Col></Row>}
          </>
        }
      </Container>
    )
  }
}

export default App;
