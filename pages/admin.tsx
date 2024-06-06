import { Web3Button } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { stakingContractAddress, tokenContractAddress } from "../consts/contractAddresses";
import styles from "../styles/Home.module.css";
import Nav from "../components/Nav";

const Admin: NextPage = () => {
  const router = useRouter();

  const handleDeposit = async (contract: any) => {
    // Prompt the user for the amount to deposit in ether
    const amountEther = prompt('Enter the amount in Ether to deposit:');
  
    // Check if user canceled or input is empty
    if (!amountEther) {
      return;
    }
  
    // Convert ether to wei
    const amountWei = BigInt(Math.round(parseFloat(amountEther) * 10**18));
  
    // Call the contract function with the provided value in wei
    try {
      await contract.call("depositRewardTokens", [amountWei.toString()]);
      // Optionally, you can handle success here, like showing a success message
      alert('Your Deposit Is Successful! 😁');
      console.log('Deposit successful!');
    } catch (error) {
      // Handle error, like showing an error message to the user
      console.error('Error while depositing:', error);
    }
  };

  const handleGetRewardTokenBalance = async (contract: any) => {
    try {
      const balanceWei = await contract.call("getRewardTokenBalance");
      // Convert balance from wei to ether
      const balanceEther = parseFloat(balanceWei.toString()) / 10**18;
      alert(`Reward Token Balance: ${balanceEther}`);
      console.log("Reward Token Balance:", balanceEther, "Ether");
    } catch (error) {
      console.error("Error getting reward token balance:", error);
    }
  };
  

  return (
    <div className={styles.container}>
      <Nav />
      <h1 className={styles.h1}>Welcome To Admin Control</h1>

      <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />

      <Web3Button
        action={async (contract) => {
          // Prompt the user for the value to approve
          const valueEther = prompt("Enter the amount in Ether to approve:");
          // Check if the user canceled the prompt
          if (valueEther !== null) {
            // Convert ether to wei
            const valueWei = BigInt(Math.round(parseFloat(valueEther) * 10**18));
            // Call the 'approve' function with the provided spender (stakingContractAddress) and value
            try {
              const result = await contract?.call("approve", [stakingContractAddress, valueWei.toString()]);
              alert('Done! 😁');
              console.log("Approve Result:", result);
            } catch (error) {
              console.error("Error approving:", error);
            }
          } else {
            console.log("User canceled the prompt.");
          }
        }}
        contractAddress={tokenContractAddress}
      >
        Approve
      </Web3Button>

      {/* Adding space between buttons */}
      <div style={{ marginBottom: '20px' }}></div>

      <Web3Button
        theme="dark"
        contractAddress={stakingContractAddress}
        action={(contract) => handleDeposit(contract)}
      >
        Deposit Funds
      </Web3Button>
      
      <div style={{ marginBottom: '20px' }}></div>

      <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />
      
      <Web3Button
        contractAddress={stakingContractAddress}
        action={(contract) => handleGetRewardTokenBalance(contract)}
      >
        Get Reward Token Balance
      </Web3Button>

    </div>
  );
};

export default Admin;
