import React, { Component } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Web3 from 'web3';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: null,
    };

    this.getMessage = this.getMessage.bind(this);
  }

  componentDidMount() {
    this.getMessage();
  }

  getMessage() {
    this.setState({ message: null });

    const web3 = new Web3('http://localhost:9545');

    const helloWorld =new web3.eth.Contract([
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
    ], '0x138a4c489A657BA9419f21C2E0c4d9B265a67341');

    helloWorld.methods.getMessage().call().then(message => this.setState({ message }));
  }

  render() {
    const { message } = this.state;

    return (
      <Container style={{ textAlign: 'center' }}>
        <Row>
          <Col>
            <h1>Hello world - RSK</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            Message: {message || <Spinner animation="border" />}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App;
