"use strict";

var _awsSdk = require("aws-sdk");
var _asn = _interopRequireDefault(require("asn1.js"));
var _jsSha = require("js-sha3");
var _ethereumjsUtil = require("ethereumjs-util");
var _bn = _interopRequireDefault(require("bn.js"));
var _env = _interopRequireDefault(require("../config/env"));
var _contractDetails = _interopRequireDefault(require("../constants/contractDetails"));
var _logger = _interopRequireDefault(require("../middleware/logger"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const kms = new _awsSdk.KMS(_env.default.KMS.ACCOUNT_CONFIG);
const fetchSerializedTx = async (txHash, tx, key) => {
  // Get the ethereum address
  const ethAddr = await getEthereumAddress(key);

  // Calculating the Ethereum Signature - r and s
  const sig = await findEthereumSig(txHash, key);

  //  Finding the right v value
  const recoveredPubAddr = await findRightKey(txHash, sig.r, sig.s, ethAddr);
  tx.r = sig.r.toBuffer();
  tx.s = sig.s.toBuffer();
  tx.v = new _bn.default(recoveredPubAddr.v).toBuffer();
  const serializedTx = tx.serialize().toString('hex');
  // logger.info(`0x${serializedTx}`);

  return '0x' + serializedTx;
};
const fetchSignature = async key => {
  // Get the ethereum address
  const ethAddr = await getEthereumAddress(key);
  let ethAddrHash = (0, _ethereumjsUtil.keccak)(Buffer.from(ethAddr));

  // Calculating the Ethereum Signature - r and s
  let sig = await findEthereumSig(ethAddrHash, key);

  //  Finding the right v value
  let recoveredPubAddr = await findRightKey(ethAddrHash, sig.r, sig.s, ethAddr);
  // logger.info('Admin :' + recoveredPubAddr.pubKey);
  let obj = {
    r: sig.r.toBuffer(),
    s: sig.s.toBuffer(),
    v: recoveredPubAddr.v
  };
  return obj;
};
const getEthereumAddress = async key => {
  let KeyId = _env.default.KMS.ADMIN_KEY_ID;
  if (key.toLowerCase() === 'platformwallet') {
    KeyId = (void 0).PLATFORM_WALLET_KEY_ID;
  }
  const publicKey = await kms.getPublicKey({
    KeyId
  }).promise();
  const decoded = EcdsaPubKey.decode(publicKey.PublicKey, 'der');
  let pubKeyBuffer = decoded.pubKey.data;
  pubKeyBuffer = pubKeyBuffer.slice(1, pubKeyBuffer.length);
  const address = (0, _jsSha.keccak256)(pubKeyBuffer); // keccak256 hash of publicKey
  const buf2 = Buffer.from(address, 'hex');
  const EthAddr = '0x' + buf2.slice(-20).toString('hex'); // take last 20 bytes as ethereum adress
  //logger.info('Generated address: ' + EthAddr);
  return EthAddr;
};

/*
        According to EIP-2, allowing transactions with any s value (from 0 to the max number on the secp256k1n curve),
        opens a transaction malleability concern. This is why a signature with a value of s > secp256k1n / 2 (greater than half of the curve) is invalid,
        i.e. it is a valid ECDSA signature but from an Ethereum perspective the signature is on the dark side of the curve.
    */

const findEthereumSig = async (plaintext, key) => {
  let signature = await sign(plaintext, key);
  if (signature.Signature == undefined) {
    throw new Error('UNKNOWN_SIGNATURE');
  }
  let decoded = EcdsaSigAsnParse.decode(signature.Signature, 'der');
  let r = decoded.r;
  let s = decoded.s;
  let secp256k1N = new _bn.default('fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141', 16); // max value on the curve
  let secp256k1halfN = secp256k1N.div(new _bn.default(2)); // half of the curve
  // Because of EIP-2 not all elliptic curve signatures are accepted
  // the value of s needs to be SMALLER than half of the curve
  // i.e. we need to flip s if it's greater than half of the curve
  if (s.gt(secp256k1halfN)) {
    // According to EIP2 https://github.com/ethereum/EIPs/blob/master/EIPS/eip-2.md
    // if s < half the curve we need to invert it
    // s = curve.n - s
    s = secp256k1N.sub(s);
    return {
      r,
      s
    };
  }
  // if s is less than half of the curve, we're on the "good" side of the curve, we can just return
  return {
    r,
    s
  };
};
const sign = async (msgHash, key) => {
  let KeyId = _env.default.KMS.ADMIN_KEY_ID;
  if (key.toLowerCase() === 'platformwallet') {
    KeyId = (void 0).PLATFORM_WALLET_KEY_ID;
  }
  const params = {
    KeyId,
    Message: msgHash,
    SigningAlgorithm: 'ECDSA_SHA_256',
    MessageType: 'DIGEST'
  };
  const res = await kms.sign(params).promise();
  return res;
};
const findRightKey = async (msg, r, s, expectedEthAddr) => {
  // This is the wrapper function to find the right v value
  // There are two matching signatues on the elliptic curve
  // we need to find the one that matches to our public key
  // it can be v = 27 or v = 28
  let v = 27;
  let pubKey = recoverPubKeyFromSig(msg, r, s, v);
  if (pubKey != expectedEthAddr) {
    // if the pub key for v = 27 does not match
    // it has to be v = 28
    v = 28;
    pubKey = recoverPubKeyFromSig(msg, r, s, v);
  }
  return {
    pubKey,
    v
  };
};
const recoverPubKeyFromSig = (msg, r, s, v) => {
  const rBuffer = r.toBuffer();
  const sBuffer = s.toBuffer();
  const pubKey = (0, _ethereumjsUtil.ecrecover)(msg, v, rBuffer, sBuffer);
  const addrBuf = (0, _ethereumjsUtil.pubToAddress)(pubKey);
  const RecoveredEthAddr = (0, _ethereumjsUtil.bufferToHex)(addrBuf);
  return RecoveredEthAddr;
};
const EcdsaPubKey = _asn.default.define('EcdsaPubKey', function () {
  this.seq().obj(this.key('algo').seq().obj(this.key('a').objid(), this.key('b').objid()), this.key('pubKey').bitstr());
});
const EcdsaSigAsnParse = _asn.default.define('EcdsaSig', function () {
  this.seq().obj(this.key('r').int(), this.key('s').int());
});
module.exports = {
  fetchSerializedTx,
  fetchSignature,
  getEthereumAddress,
  findEthereumSig,
  sign,
  findRightKey,
  recoverPubKeyFromSig
};