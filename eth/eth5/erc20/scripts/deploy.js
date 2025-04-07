const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with the account:", deployer.address);

  const Token = await ethers.getContractFactory("MyToken");
  const token = await Token.deploy(ethers.parseEther("1000000")); // 👈 for newer ethers versions

  await token.deployed();
  console.log("Token deployed to:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
