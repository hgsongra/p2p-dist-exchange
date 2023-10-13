# The BFX challenge
**Auther:** Hitesh Songra
**Email:** hgsongra@ymail.com
**Linkedin:** https://www.linkedin.com/in/hgsongra/

Task is to create a simplified P2P distributed exchange

* Each client will have its own instance of the orderbook.
* Clients submit orders to their own instance of orderbook. The order is distributed to other instances, too.
* If a client's order matches with another order, any remainer is added to the orderbook, too.

Requirement:
* Code in Javascript
* Use Grenache for communication between nodes
* Simple order matching engine
* You don't need to create a UI or HTTP API

### Setup

```
npm i -g grenache-grape
```

```
# boot two grape servers

grape --dp 20001 --aph 30001 --bn '127.0.0.1:20002'
grape --dp 20002 --aph 40001 --bn '127.0.0.1:20001'
```

### Setting up server
Move to server directory and install dependencies and execute index.js file
```
cd server
npm i
node index.js
```

### Setting up client
Move to client directory and install dependencies and execute index.js file
```
cd client
npm i
node index.js
```

Above all steps needs to be performed on separate terminal tabs.

Refer server and client terminal tabs for outcomes.

Thanks for the opportunity.