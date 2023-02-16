import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Just One", function () {

  async function deployContracts() {
    
    const [deployer] = await ethers.getSigners()

    const uri = "ipfs://bafkreih2ac5yabo2daerkw5w5wcwdc7rveqejf4l645hx2px26r5fxfnpe"
    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(uri);

    return { nft, deployer }
  }

  describe("Mint", function () {
    it("Should mint 1 NFT", async function () {
      const { nft, deployer } = await loadFixture(deployContracts);
      expect (await nft.ownerOf(1)).to.be.equal(deployer.address)
    })
  })
})
