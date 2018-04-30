pragma solidity ^0.4.16;

contract MyCoin {
  string internal name;
  address public owner;
  uint256 private bls;

  function MyCoin(string _name) public {
    name = _name;
    owner = msg.sender;
    bls = msg.sender.balance;
  }

  function getOwner() public view returns (address) {
    return owner;
  }

  function getBls() public view returns (uint256) {
    return bls;
  }

  function getName() public view returns (string) {
    return name;
  }

  function strConcat(string _a, string _b) internal pure returns (string) {
    bytes memory _ba = bytes(_a);
    bytes memory _bb = bytes(_b);
    string memory ab = new string(_ba.length + _bb.length);
    bytes memory ba = bytes(ab);
    uint k = 0;
    for (uint i = 0; i < _ba.length; i++) ba[k++] = _ba[i];
    for (i = 0; i < _bb.length; i++) ba[k++] = _bb[i];
    return string(ba);
  }

  function setName(string _name) public {
    name = strConcat(_name, "_x");
  }
}
