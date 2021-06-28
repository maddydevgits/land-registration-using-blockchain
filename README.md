# Land Registration using Blockchain



#### Dependencies                                                                                                                 
- ##### [Node Packet Manager(NPM)](http://nodejs.org/en/)                                                                                                                                                     
- ##### [Ganache](https://truffleframework.com/ganache)
  Ganache provides a local in-memory ethereum blockchain, with dummy accounts.

- ##### [Metamask Extension for Google Chrome](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)
  We use Metamask extension to connect to local blockchain and interact with the smart contract.

#### Run the Project
- ##### Step 1. Clone the project
```
git clone https://github.com/madblocksgit/land-registration-using-blockchain.git
```

- ##### Step 2. Install dependencies
```
$ cd property-registration
$ npm install
```

- ##### Step 3. Start Ganache
  Open the Ganache GUI client that you downloaded and installed. This will start local blockchain instance.

- ##### Step 4. Compile & Deploy Smart Contract
```
$ truffle migrate --reset 
```
   You must migrate the smart contract each time your restart ganache.

- ##### Step 5. Configure Metamask
  - Unlock Metamask
  - Connect metamask to your local Etherum blockchain provided by Ganache.
  - Import an account provided by ganache by copying the private key from ganache and pasting it in meta mask extension.

- ##### Step 6. Run the Front End Application
```
$ npm run dev
```
   Visit this URL in your browser: http://localhost:3000
