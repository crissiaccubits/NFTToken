"use strict";

module.exports = Object.freeze({
  BIRegistry: [{
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "internalType": "address",
      "name": "admin",
      "type": "address"
    }],
    "name": "AddAdmin",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "internalType": "address",
      "name": "platformWallet",
      "type": "address"
    }],
    "name": "AddPlatformWallet",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "internalType": "bytes",
      "name": "vcHash",
      "type": "bytes"
    }],
    "name": "ExpireVC",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "internalType": "uint8",
      "name": "version",
      "type": "uint8"
    }],
    "name": "Initialized",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "internalType": "bytes",
      "name": "vcHash",
      "type": "bytes"
    }],
    "name": "IssueVC",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "internalType": "address",
      "name": "did",
      "type": "address"
    }],
    "name": "RegisterDID",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "internalType": "address",
      "name": "admin",
      "type": "address"
    }],
    "name": "RemoveAdmin",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "internalType": "address",
      "name": "platformWallet",
      "type": "address"
    }],
    "name": "RemovePlatformWallet",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "internalType": "address",
      "name": "did",
      "type": "address"
    }],
    "name": "SuspendDID",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "internalType": "bytes",
      "name": "vcHash",
      "type": "bytes"
    }],
    "name": "SuspendVC",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "internalType": "address",
      "name": "did",
      "type": "address"
    }],
    "name": "TerminateDID",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "internalType": "bytes",
      "name": "vcHash",
      "type": "bytes"
    }],
    "name": "TerminateVC",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "internalType": "address",
      "name": "did",
      "type": "address"
    }],
    "name": "UnSuspendDID",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "internalType": "bytes",
      "name": "vcHash",
      "type": "bytes"
    }],
    "name": "UnSuspendVC",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "internalType": "bytes",
      "name": "vcHash",
      "type": "bytes"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "totalUsage",
      "type": "uint256"
    }],
    "name": "UpdateUsageVC",
    "type": "event"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "_admin",
      "type": "address"
    }],
    "name": "addAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "_platformWallet",
      "type": "address"
    }],
    "name": "addPlatformWallet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "bytes",
      "name": "_vcHash",
      "type": "bytes"
    }],
    "name": "expireVC",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "_did",
      "type": "address"
    }],
    "name": "getDIDStatus",
    "outputs": [{
      "internalType": "enum BIRegistry.didStatus",
      "name": "",
      "type": "uint8"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "bytes",
      "name": "_vcHash",
      "type": "bytes"
    }],
    "name": "getVCStatus",
    "outputs": [{
      "components": [{
        "components": [{
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }],
        "internalType": "struct CountersUpgradeable.Counter",
        "name": "usageCount",
        "type": "tuple"
      }, {
        "internalType": "enum BIRegistry.vcStatus",
        "name": "status",
        "type": "uint8"
      }],
      "internalType": "struct BIRegistry.VC",
      "name": "",
      "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "_admin",
      "type": "address"
    }],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "bytes",
      "name": "_vcHash",
      "type": "bytes"
    }],
    "name": "issueVC",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "_did",
      "type": "address"
    }],
    "name": "registerDID",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "_admin",
      "type": "address"
    }],
    "name": "removeAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "_platformWallet",
      "type": "address"
    }],
    "name": "removePlatformWallet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "_did",
      "type": "address"
    }],
    "name": "suspendDID",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "bytes",
      "name": "_vcHash",
      "type": "bytes"
    }],
    "name": "suspendVC",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "_did",
      "type": "address"
    }],
    "name": "terminateDID",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "bytes",
      "name": "_vcHash",
      "type": "bytes"
    }],
    "name": "terminateVC",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "_did",
      "type": "address"
    }],
    "name": "unSuspendDID",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "bytes",
      "name": "_vcHash",
      "type": "bytes"
    }],
    "name": "unSuspendVC",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "bytes",
      "name": "_vcHash",
      "type": "bytes"
    }],
    "name": "updateUsageVC",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }]
});