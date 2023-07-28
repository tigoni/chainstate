---

title: "Transaction Seriliasation and CBOR Encoding"
date: 2023-04-07 17:02:00 -0000

---

In blockchain data storage and transmission are vital aspects whose design determines how efficient and cost-effective the blockchain is. Transactions form a critical feature of any blockchain and how the blockchain designs and implements transactions determine how efficient and cost-effective the blockchain is in transferring value. 

In Cardano, the ledger implements a transaction consisting of:

1. A transaction body that contains: inputs, outputs fees, certificates, metadata hashes (optional)
2. A triple set of:
    - A map of payment verification keys to signatures
    - A map of scripts values with hashes as their indexes
    - Optional metadata.

To transmit a transaction over the network, Cardano serializes the transaction into a compact object using a format known as Concise Binary Object Representation (CBOR).  This provides for highly efficient transmission as well as storage in blocks.

Cardano defines specifications, called Cardano Data Definition Language (CDDL) for each of the development eras that dictate how the serialized data will be represented in the CBOR format. For instance, for the current babbage era, the CDDL additionally specifies how PlutusV2 scripts and the new cost models are represented in a transaction.

So how is this useful to you as a Plutus developer? Apart from understanding the required and optional components of a transaction, knowledge about CBOR and CDDL can be immensely helpful in debugging your dApp. 

A few weeks ago, I found myself stuck debugging a Plutus transaction that would simply not work. The situation required creating a transaction on a node backend using Cardano-serialization-library and Cardano-wallet. Considering how Plutus (the Haskell comiler to be specific) logs errors, it can be a daunting and painful experience for many Plutus developers trying to determine the cause of these errors. 

```haskell
ShelleyTxValidationError ShelleyBasedEraBabbage (ApplyTxError [UtxowFailure 
(FromAlonzoUtxowFail (WrappedShelleyEraFailure (ExtraneousScriptWitnessesUTXOW 
(fromList [ScriptHash \"7a593855aaecb7ca8311b31a363063db611f0f96d2c67b3ba396ffd3\"])))),UtxowFailure 
(FromAlonzoUtxowFail (NonOutputSupplimentaryDatums
 (fromList [SafeHash \"923918e403bf43c34b4ef6b48eb2ee04babed17320d8d1b9ff9ad086e86f44ec\"]) (fromList []))),
UtxowFailure (FromAlonzoUtxowFail 
(ExtraRedeemers [RdmrPtr Spend 0])),UtxowFailure (FromAlonzoUtxowFail (WrappedShelleyEraFailure 
(MissingVKeyWitnessesUTXOW (WitHashes 
(fromList [KeyHash \"04c5fe2f355eb590378f98193d4b71c93d9149444e979f7a6b37f4d8\"]))))),UtxowFailure 
(FromAlonzoUtxowFail (PPViewHashesDontMatch (SJust 
(SafeHash \"0f4a31edb07fb664a3c2d7a7dd2a8188a20749935e31321401af778178bf5d16\")) (SJust 
(SafeHash \"008899a4685214d63e793985bd2c6ae0d139ca69e211feff4ca9d2099f040bb6\"
))))])
```

With our knowledge of how serialization works, we can get the CBOR-encoded data of the failing transaction and view the CDDL representation that is being submitted to the network. Getting the CBOR for the transaction depends on the method we are using to create our transaction. For my case using cardano-serilization-lib, I called the `to_hex()` function on the transaction object just before submitting the transaction.

```jsx
...
const signedTransaction = Transaction.new(
    unsignedTransaction.body(),
    transactionWitnessSet,
  );

const txCbor = signedTransaction.to_hex(); 
console.log(txCbor);
```

Depending on the library you are using to create your transaction, the function(s) could be different but the idea is to get the ready-to-submit transaction in serialized format. 

Next, we get the printed hex string and copy it into [cbor.me](https://cbor.me). which is a diagnostic playground that allows us to put in our CBOR-encoded hex string and view the CDDL annotated version of the same CBOR data. This is useful since we already have the published CDDL for the current Cardano era, for instance, the babbage CDDL file can be found on the [Cardano ledger GitHub repo](https://github.com/input-output-hk/cardano-ledger/blob/master/eras/babbage/test-suite/cddl-files/babbage.cddl). We can now compare our transaction CBOR and the CDDL file and debug what is in error or missing.

To do that we compare the transaction keys specified in the Cardano CDDL file and compare them with the keys from our transaction. For example, for my specific case, I realized I had some missing witness keys in my witness set, the Plutus script was version 1 instead of PlutusV2 and the outputs were not all specified. I was able to resolve these issues in an easier manner than before.
To do that we compare the transaction keys specified in the Cardano CDDL file and compare them with the keys from our transaction. For example, for my specific case, I realized I had some missing witness keys in my witness set, the Plutus script was version 1 instead of PlutusV2 and the outputs were not all specified. I was able to resolve these issues in an easier manner than before.