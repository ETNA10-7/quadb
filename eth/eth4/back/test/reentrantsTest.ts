import { expect } from "chai";
import { ethers } from "hardhat";
import { formatEther, parseEther } from "ethers";
import { ReentrancyVulnerable, Attacker } from "../typechain-types";

describe("🔓 Reentrancy Attack Test", function () {
  let deployer: any;
  let victim: any;
  let attackerSigner: any;

  let vulnerable: ReentrancyVulnerable;
  let attacker: Attacker;

  beforeEach(async () => {
    [deployer, victim, attackerSigner] = await ethers.getSigners();

    const VulnerableFactory = await ethers.getContractFactory("ReentrancyVulnerable");
    vulnerable = (await VulnerableFactory.connect(deployer).deploy()) as ReentrancyVulnerable;
    await vulnerable.waitForDeployment();

    await vulnerable.connect(victim).deposit({ value: parseEther("5") });

    const vulnerableAddress = await vulnerable.getAddress();

    const AttackerFactory = await ethers.getContractFactory("Attacker");
    attacker = (await AttackerFactory.connect(attackerSigner).deploy(vulnerableAddress)) as Attacker;
    await attacker.waitForDeployment();
  });

  it("🚨 Attacker drains funds using reentrancy", async () => {
    const beforeBalance = await ethers.provider.getBalance(await vulnerable.getAddress());
    console.log("💰 Vulnerable balance before attack:", formatEther(beforeBalance));

    await attacker.connect(attackerSigner).attack({ value: parseEther("1") });

    const afterBalance = await ethers.provider.getBalance(await vulnerable.getAddress());
    const attackerBalance = await ethers.provider.getBalance(await attacker.getAddress());

    console.log("😵 Vulnerable balance after attack:", formatEther(afterBalance));
    console.log("🦹 Attacker contract balance after attack:", formatEther(attackerBalance));

    expect(afterBalance).to.be.lt(beforeBalance);
    expect(attackerBalance).to.be.gt(parseEther("1"));
  });
});
