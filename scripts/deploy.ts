import hre, { ethers, network, artifacts } from 'hardhat'
import fs from 'fs'
const color = require("cli-color")
var msg = color.xterm(39).bgXterm(128)
import { Web3Storage, Blob, File, getFilesFromPath } from "web3.storage"
import * as dotenv from "dotenv"

dotenv.config();
var msg = color.xterm(39).bgXterm(128)

const dir = "./storage/"
let name:string

fs.readdirSync(dir).forEach(file => {
  name = file
})

async function main() {
  
  console.log("\nUploading", name) 

  function getAccessToken() {
    return process.env.WEB3STORAGE_TOKEN
  }

  function makeStorageClient() {
      return new Web3Storage({ token: getAccessToken()! })
  }

  async function getFiles (file:any) {
      const File = await getFilesFromPath(file)
      return File
  }

  async function storeFiles(files:any) {
      const client = makeStorageClient()
      const add = await client.put(files,{ wrapWithDirectory: false })
      return add
  }

  const cid = await storeFiles(await getFiles(dir))

  console.log("\ncid:", cid)

  console.log("\nurl:", "https://" + cid + ".ipfs.w3s.link/" + name)

  const metadata = {
    "name": "Lode Runner",
    "author": "W3HC",
    "description":
      "I used to play this game and I love it.",
    "image": "ipfs://" + cid + "/" + name,
    "attributes": [
      {
        "trait_type": "Minted by",
        "value": "W3HC",
      },
      {
        "trait_type": "Website",
        "value": "https://w3hc.org/",
      }
    ],
  };

  function makeFileObjects() {
    const blob = new Blob([JSON.stringify(metadata)], {
        type: "application/json",
    });

    const files = [
      new File(["contents-of-file-1"], "plain-utf8.txt"),
      new File([blob], "metadata.json"),
    ];
    return files
  }

  async function storeMetadata(files: any) {
    const client = makeStorageClient()
    const cid = await client.put(files, { wrapWithDirectory:false })
    return "ipfs://" + cid
  }

  const uri = (await storeMetadata(makeFileObjects()))
  console.log("\nMetadata storage done. ✅", msg(uri))

  console.log("\nNFT deployment in progress...") 
  const NFT = await ethers.getContractFactory("NFT")
  const nft = await NFT.deploy(uri)
  await nft.deployed();
  console.log("\nNFT deployed at", msg(nft.address), "✅")

  fs.writeFileSync(
    'nftAbi.json', 
    JSON.stringify(
      artifacts.readArtifactSync('NFT').abi, 
      null, 
      2
    )
  )
  console.log("\nNFT ABI available in nftAbi.json ✅")  

  try {
    console.log("\nEtherscan verification in progress...")
    await nft.deployTransaction.wait(6)
    await hre.run("verify:verify", { network: network.name, address: nft.address, constructorArguments: [uri], })
    console.log("Etherscan verification done. ✅")
  } catch (error) {
    console.error(error)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
});