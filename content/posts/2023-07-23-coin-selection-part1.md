---

title: "Coin Selection - Part 1"
date: 2023-07-23 14:58:00 -0000

---
### Coin Selection - Part 1
#### Bank vs Cash Transactions?
One of the significant differences among the different blockchains is how they model the exchange of coins among users. From a design perspective, Ethereum uses an account-based model in which the transfer of coins in a transaction is similar to a bank account transaction.  
When a user wants to transfer some Ether to another user’s wallet, he enters the exact transaction amount that is to be deducted from his wallet. The amount is deducted in addition to transaction fees. This is similar to what happens in a bank account transaction. 

On the other hand, UTxO (Unspent Transaction Outputs)-based blockchains such as Bitcoin and Cardano, transactions (the transfer of assets from one user to another) are modeled on how cash transactions work. 
In a typical cash transaction, for example paying for a drink, the buyer will usually check their wallet and produce a cash amount sufficient for that purchase.  In most cases, one does not have the exact amount and this requires them to combine different smaller amounts of available money in their wallet that adds up to the required amount. In other cases, they have a single large note which they hand to the seller and expect change back.
This is how an UTxO blockchain works in the transfer of assets.

That explains why they are called UTxO blockchains. The assets present in a wallet are a collection of unspent transactions which can be used as inputs to another transaction. We can think of the wallet's contents the same way we think of having a collection of notes and coins in our pockets which are the result of received amounts in whole and in change. 

### The Problems
Now that we have an idea of how UTxO works, how exactly does a wallet decide which outputs to spend in a transaction? 
It may seem like a trivial task especially when we think of how we handle daily cash transactions. But, there are some serious concerns that come up:
* If the wallet selects the outputs with the value closest to cover the transaction value and fees, it works but,  over time we end up with a collection of small un-spendable change outputs in the wallet. These outputs are known as dust and can be the cause of the next problem.
* If a wallet selects too many small outputs, the transaction may fail if the protocol defined transaction size limit is exceeded.  Where the limit is not reached, the cost of that transaction is higher since the fees are determined by the transaction size. 
* Similar to how a shop may want to reduce the change they give out so that they do not run out of change, a wallet may minimise the change outputs it generates in an effort to save on the outputs it spends.  However, this has problems because over time, the wallet will have fewer and fewer outputs that it can spend. As a result, the lack of many available  outputs reduces the number of transactions the wallet can do in parallel.

From the above issues we see that that an efficient process of selecting outputs to be spent is a complex problem that needs careful consideration and design. In part two of this post, we look at the goals of coin selection and the main algorithms used by Cardano for this process.