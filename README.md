# Just One

Mint just one NFT. 

## Install

```sh
npm i
```

## Test

```sh
npx hardhat test
```

## Deploy

Create a `.env` on the model of `.env.example`:

```sh
cp .env.example .env
```

Add your own keys in your `.env` file.

You can replace the image in the `storage` directory, and also the metadata variable in `deploy.ts`. 

Then deploy to Goerli:

```sh
npx hardhat run scripts/deploy.ts --network goerli
```

## Example

- Etherscan: [https://goerli.etherscan.io/address/0xa587d82efe62aa121fbaa8035e9fa5365fb0e031#code](https://goerli.etherscan.io/address/0xa587d82efe62aa121fbaa8035e9fa5365fb0e031#code)
- OpenSea: [https://testnets.opensea.io/assets/goerli/0xa587d82efe62aa121fbaa8035e9fa5365fb0e031/1](https://testnets.opensea.io/assets/goerli/0xa587d82efe62aa121fbaa8035e9fa5365fb0e031/1)

## Versions

- Node [v18.12.1](https://nodejs.org/uk/blog/release/v18.12.1/)
- NPM [v8.19.2](https://github.com/npm/cli/releases/tag/v8.19.2)
- OpenZeppelin Contracts [v4.8.0](https://github.com/OpenZeppelin/openzeppelin-contracts/releases/tag/v4.8.0)

## Support

You can contact me via [Element](https://matrix.to/#/@julienbrg:matrix.org), [Telegram](https://t.me/julienbrg), [Twitter](https://twitter.com/julienbrg), [Discord](https://discord.gg/bHKJV3NWUQ), or [LinkedIn](https://www.linkedin.com/in/julienberanger/).