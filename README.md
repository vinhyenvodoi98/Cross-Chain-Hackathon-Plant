<h1  align="center">Bonsai Exchange 👋</h1>

![alt](https://github.com/vinhyenvodoi98/Cross-Chain-Hackathon-Plant/blob/master/images/app.png)

# Bonsai Exchange Dapp
This demonstrates the three important parts of
a dapp and how they should be connected:
1. the browser UI (the frontend)
2. the API server (the backend)
3. the on-chain contract

This dapp starts a local blockchain on your computer, and deploys a contract about exchange bonsai to that blockchain .  It does not currently deploy or connect to the Agoric testnet.

This particular dapp UI is written in Reactjs + Redux

## Functionality

Bonsai Exchange :

1. Buy plants from stock
2. Planting trees in the collection.

Future :

1. The contract has the ability to update properties such as the life of a plant, which will display other forms of the plant such as sprouting, flowering, and fruiting.

![alt](https://github.com/vinhyenvodoi98/Cross-Chain-Hackathon-Plant/blob/master/images/growing.png)

2. It is possible to resell the trees you have planted

## How to run

### Prerequisites :

* Node : > v12.16
* Agoric : >v0.6.1

How to install Agoric : https://agoric.com/documentation/getting-started/


### Run the demo

```
git clone https://github.com/vinhyenvodoi98/Cross-Chain-Hackathon-Plant

cd Cross-Chain-Hackathon-Plant
```
Install JavaScript dependencies, which may take a while.

```
agoric install
```
Start the Agoric VM.
```
agoric start --reset
```
( leave this shell up with the process running )

**Open another shell**, go to your `Cross-Chain-Hackathon-Plant` directory

Deploy the Dapp on an Agoric VM
```
agoric deploy ./contract/deploy.js ./api/deploy.js ./ui/deploy.js
```

Move into the `ui` directory

Install NPM dependencies
```
yarn install
```
Launches the React development server
```
yarn start
```

Go to a browser and open http://localhost:3000 to see the Dapp

Go to another tab or browser and open http://localhost:8000/ to see and interact with a basic wallet and a REPL

## Here's the interface:

**User's garden**

![alt](https://github.com/vinhyenvodoi98/Cross-Chain-Hackathon-Plant/blob/master/images/garden.png)

**Buy plants from the plant shop**

![alt](https://github.com/vinhyenvodoi98/Cross-Chain-Hackathon-Plant/blob/master/images/plantshop.png)


**Then sign wallet to use moola to buy plant**

![alt](https://github.com/vinhyenvodoi98/Cross-Chain-Hackathon-Plant/blob/master/images/sign.png)


**The plant will be moved to the collection so you can plant it in the garden**

![alt](https://github.com/vinhyenvodoi98/Cross-Chain-Hackathon-Plant/blob/master/images/collection.png)

**After planting**

![alt](https://github.com/vinhyenvodoi98/Cross-Chain-Hackathon-Plant/blob/master/images/planted.png)