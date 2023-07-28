---

title: "Native Tokens in Cardano"
date: 2023-06-27 23:48:00 -0000

---
Currently workling on a proejct that involves minting NFTs and I thought it would be a good idea to revisit the topic of tokens in Cardano.

Unlike most other blockchains, Cardano has native support for tokens. So what does mean and how useful is it exactly?

To answer that, we first need to establish what a token is and then get to the differences on how tokens are created in different blockchains and then compare that to Cardano.
A token is a unit of value, ownership, rights or access that is build on a blockchain network to serve a number of functions such as offer decentralised financial services, participation in governance, access to platform services, playing games etc. Typically, a blockchain will have a native asset called a cryptocurrency which is used as the main unit of value and medium of exchange in the blockchain. As a result, tokens tend to be viewed as value units specialised for different services on the blockchain. For instance, Ethereum has ETH and the native cryptocurrency but has a lot of tokens such as AAVE, COMP, USDT, UNI, MKR, and many others that provide specialised services for users. Also noteworthy is that tokens mainly exist in one of two forms; as fungible tokens, where a token has equal value as any other token of its kind and non-fungible tokens (NFTs) where each token has unique value. 

How are tokens created on Ethereum and how does it compare to Cardano? In Ethereum, a token is created by using a smart contract. This standardised (ERC20) smart contract determines the properties of the token and as such, the token lives on that smart contract and are not known, or tracked, by the main blockchain. Supporting the assets on the main chain requires the use of Layer-2 solutions  

In Cardano tokens are created and live on the same blockchain as the native cryptocurrency (ADA).This makes Cardano a multo asset blockchain since there is no need for a special setup to transfer additional assets. This kind of support for additional tokens on the main chain is what is called native support. Tokens created on the Cardano blockchain bahave in the same way as far as transactions are concerned; they do not need special fees or a smart contract to be transferred, they exist alongside other UTXOs and can be minted by other smart contracts without need for special support.

One of the main advantages of the Cardano approach is the simplicity of issuing new tokens since one does not need to create a smart contract for that purpose. Even better, these tokens can be transferred alongside ADA tokens in a typical transaction. Another benefit accrues in security. Since minted tokens on Cardano do not require a smart contract to transfer, the potential attack surface for a malicious attack is eliminated. Hackers do not have a smart contract that can be exploited as in the case of Ethereum.