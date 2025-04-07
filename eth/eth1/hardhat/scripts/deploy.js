const hre = require("hardhat");

async function main() {
    const [deployer, payee] = await hre.ethers.getSigners();

    console.log("Deploying contract with account:", deployer.address);

    const Escrow = await hre.ethers.getContractFactory("Escrow");
    const escrow = await Escrow.deploy(payee.address, { value: hre.ethers.parseEther("1") });

    await escrow.waitForDeployment();

    console.log("Escrow deployed to:", await escrow.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
