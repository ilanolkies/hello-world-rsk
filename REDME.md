# Hello world RSK

Hello World decentralized application in RSK network.

## Run locally

In one terminal:

```
npm i
npx truffle develop
truffle(develop)> migrate
```

In another terminal:

```
cd dapp
yarn
yarn start
```

## Run on testnet

```
cd dapp
yarn
yarn build
```

Serve it with

```
yarn global add serve
serve -s build
```

## Source

- `contracts/`: smart contracts for the dapp
- `test/` : unit tests for smart contracts
- `migrations/`: smart contract deployment scripts
- `dapp/`: react app to operate with smart contracts
