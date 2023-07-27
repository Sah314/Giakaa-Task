import hre from "hardhat";

async function main() {
  // const userNameContract = await ethers.getContractFactory("user");
  // const deployedContract = await userNameContract.deploy("0xDD529D182c960C38C35e69fEF42cc71f1b93Da0f","Sahil");
  // await deployedContract.deployed();
  const userNameContract = await hre.ethers.deployContract(
    "user",["0xDD529D182c960C38C35e69fEF42cc71f1b93Da0f","Sahil"]
  );

 await userNameContract.waitForDeployment();

 console.log("Verify Contract Address:", userNameContract.target);
 console.log("Sleeping.....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(30000);
  await hre.run("verify:verify", {
    address: userNameContract.target,
    constructorArguments: ["0xDD529D182c960C38C35e69fEF42cc71f1b93Da0f","Sahil"],
  });
}
function sleep(ms:any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
.then(()=>process.exit(0))
.catch((error)=>{
  console.error(error);
  process.exit(1);
});
