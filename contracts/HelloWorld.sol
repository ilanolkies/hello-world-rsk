pragma solidity >= 0.5.0 < 0.7.0;

contract HelloWorld {
  string private message;

  constructor() public {
    message = "Hello world!";
  }

  function getMessage() external view returns(string memory) {
    return message;
  }

  function setMessage(string calldata newMessage) external {
    message = newMessage;
  }
}
