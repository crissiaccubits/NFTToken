// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.24;

//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721, ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


/**
@title NFT Token Contract
 */
contract NFTTestToken is ERC721, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    uint256 immutable MAX_COUNT= 999;  //Variable to define the maximum supply

    uint256 immutable TOKEN_PRICE= 1000000000000000; //Variable to define the maximum token price

    /**
    @dev Constructor to initialize the NFT Contract
     */
    constructor() public ERC721("NFTToken","NTT") Ownable() {}


    /**
    @dev To mint tokens and verify the preconditions 
    *  i) totalSupply should be fixed ii) Only 9 tokens can be minted at a time
    *  ii) Confirm the user has paying the enough price for tokens
    @param to token receiver address
    @param tokenCount no of tokens required for minting
    */
    function safeMint(address to, uint256 tokenCount) payable
        external 
    {
        //Preconditions check
        require (totalSupply() <= MAX_COUNT,"Supply limit is reached");
        require(tokenCount <= 9,"Only 9 tokens can be minted");
        uint256 totalTokenPrice = tokenCount * TOKEN_PRICE;
        require(msg.value >= totalTokenPrice, "Insuffient Amount");
        //Transfer Excess amount
        if (msg.value > totalTokenPrice){
            uint256 refundAmount = msg.value - totalTokenPrice;
            payable(to).transfer(refundAmount);
        }
        //minting tokens
        uint256 _newId = totalSupply();
        for(uint i = 0; i<=tokenCount; i++){
            _safeMint(to, (_newId + i));
        }
    }
    /**
    @dev To get the contract balance
     */
    function getBalance() public view returns(uint) {
        return address(this).balance;
    }
    /**
    @dev To withdraw the contract balance by owner
    */
    function withdrawFunds() external onlyOwner(){
        require(msg.sender == owner(), "require owner permission");
        payable(owner()).transfer(getBalance());
    }
    /**
    @dev overriding the function from base contract
     */
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
      return super.supportsInterface(interfaceId);
    }
}