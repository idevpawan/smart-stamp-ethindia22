// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "hardhat/console.sol";

contract Stamps is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string svgPartOne = '<svg xmlns="http://www.w3.org/2000/svg" width="450" height="600" fill="none" style="background-color:whitesmoke"><path fill="url(#B)" d="M0 0h270v270H0z"/><defs><filter id="A" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="600" width="450"><feDropShadow dx="0" dy="1" stdDeviation="2" flood-opacity=".225" width="200%" height="200%"/></filter></defs><defs/><text x="10" y="20" font-size="6" fill="#000" filter="url(#A)" font-family="sans-serif">UID: ';
    string svgPartTwo = '</text><text x="150" y="60" font-size="24" fill="#000" filter="url(#A)" font-family="sans-serif" font-weight="bold">Smart Stamp</text><rect y="75" x="25" width="400" height="1" style="fill:rgb(0,0,0);stroke-width:0;stroke:rgb(0,0,0)"/><foreignObject x="20" y="90" width="400" height="900"><p style="font-size: 10px; color: rgb(135, 144, 162); text-align: left; word-break: break-all;" xmlns="http://www.w3.org/1999/xhtml">';
    string svgPartThree = '</p></foreignObject></svg>';

    mapping(string => address) public stamps;
    mapping(string => string) public records;

    constructor() payable ERC721("Smart Stamp Service", "SSS") {
    }

    function createStamp(string calldata stampData) public payable {

        uint256 newRecordId = _tokenIds.current();
        string memory finalSvg = string(abi.encodePacked(svgPartOne, Strings.toString(newRecordId), svgPartTwo, stampData, svgPartThree));

        string memory json = Base64.encode(
            abi.encodePacked(
                '{"image": "data:image/svg+xml;base64,',
                Base64.encode(bytes(finalSvg)),
                '"}'
            )
        );

        string memory finalTokenUri = string( abi.encodePacked("data:application/json;base64,", json));
        console.log("URI", finalTokenUri);
        _safeMint(msg.sender, newRecordId);
        _setTokenURI(newRecordId, finalTokenUri);
        stamps[stampData] =  msg.sender;
        _tokenIds.increment();
    }

  function getTotalStamps() public view returns(uint) {
      console.log(_tokenIds.current());
      return _tokenIds.current();
  }

}