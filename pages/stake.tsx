import {
  ConnectWallet,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
  useTokenBalance,
  Web3Button,
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import NFTCard from "../components/NFTCard";
import {
  nftDropContractAddress,
  stakingContractAddress,
  tokenContractAddress,
} from "../consts/contractAddresses";
import styles from "../styles/Home.module.css";
import Nav from "../components/Nav";

const Stake: NextPage = () => {
  const address = useAddress();
  const { contract: nftDropContract } = useContract(
    nftDropContractAddress,
    "nft-drop"
  );
  const { contract: tokenContract } = useContract(
    tokenContractAddress,
    "token"
  );
  const { contract, isLoading } = useContract(stakingContractAddress);
  const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);
  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();
  const { data: stakedTokens } = useContractRead(contract, "getStakeInfo", [
    address,
  ]);
  const [selectedNftsToStake, setSelectedNftsToStake] = useState<string[]>([]);
  const [selectedNftsToWithdraw, setSelectedNftsToWithdraw] = useState<string[]>([]);

  useEffect(() => {
    if (!contract || !address) return;

    async function loadClaimableRewards() {
      const stakeInfo = await contract?.call("getStakeInfo", [address]);
      setClaimableRewards(stakeInfo[1]);
    }

    loadClaimableRewards();
  }, [address, contract]);


  async function stakeNfts(ids: string[]) {
    if (!address) return;

    const isApproved = await nftDropContract?.isApproved(
      address,
      stakingContractAddress
    );
    if (!isApproved) {
      await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
    }
    await contract?.call("stake", [ids]);
    setSelectedNftsToStake([]);
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  async function withdrawNfts(ids: string[]) {
    if (!address) return;
    await contract?.call("withdraw", [ids]);
    setSelectedNftsToWithdraw([]);
  }
  

  return (
    <div className={`${styles.smogOverlay} ${styles.container}`}>
      <Nav/>
      <h1 className={styles.h1}>Rent Your Waifus</h1>
      <hr className={`${styles.divider} ${styles.spacerTop}`} />

      {!address ? (
        <h1>Connect Wallet Via Waifu Connect</h1>
      ) : (
        <>
          <h2>Your Tokens</h2>
          <div className={styles.tokenGrid}>
            <div className={styles.tokenItem}>
              <h3 className={styles.tokenLabel}>Claimable Rent</h3>
              <p className={styles.tokenValue}>
                <b>
                  {!claimableRewards
                    ? "Loading..."
                    : ethers.utils.formatUnits(claimableRewards, 18)}
                </b>{" "}
                {tokenBalance?.symbol}
              </p>
            </div>
            <div className={styles.tokenItem}>
              <h3 className={styles.tokenLabel}>Current Balance</h3>
              <p className={styles.tokenValue}>
                <b>{tokenBalance?.displayValue}</b> {tokenBalance?.symbol}
              </p>
            </div>
          </div>
          
          <Web3Button
            action={(contract) => contract.call("claimRewards")}
            contractAddress={stakingContractAddress}
            style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Set background color with transparency
            backdropFilter: 'blur(10px)', // Apply blur effect
            border: 'none',
            color: 'white',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'hand',
            transition: 'all 0.3s ease',
                  }}
          >
            Claim Rent
          </Web3Button>

          <hr className={`${styles.divider} ${styles.spacerTop}`} />
          <h2>Your Rented Waifus</h2>
          <div className={styles.nftBoxGrid}>
            {stakedTokens &&
              stakedTokens[0]?.map((stakedToken: BigNumber) => (
                <div
                  className={`${styles.nftBox} ${
                    selectedNftsToWithdraw.includes(stakedToken.toString())
                      ? styles.selected
                      : ""
                  }`}
                  key={stakedToken.toString()}
                  onClick={() => {
                    setSelectedNftsToWithdraw((prevSelectedNfts) => {
                      const tokenId = stakedToken.toString();
                      if (prevSelectedNfts.includes(tokenId)) {
                        return prevSelectedNfts.filter((id) => id !== tokenId);
                      } else {
                        return [...prevSelectedNfts, tokenId];
                      }
                    });
                  }}
                >
                  <NFTCard tokenId={stakedToken.toNumber()} />
                </div>
              ))}
          </div>

      <Web3Button
        contractAddress={stakingContractAddress}
        action={() => withdrawNfts(selectedNftsToWithdraw)}
        isDisabled={selectedNftsToWithdraw.length === 0}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)', // Set background color with transparency
          backdropFilter: 'blur(10px)', // Apply blur effect
          border: 'none',
          color: 'white',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'hand',
          transition: 'all 0.3s ease',
                }}
      >
        Withdraw Selected Waifu
      </Web3Button>


          <hr className={`${styles.divider} ${styles.spacerTop}`} />

          <h2>Waifus In Your Wallet</h2>
          
          <div className={styles.nftBoxGrid}>
            {ownedNfts?.map((nft) => (
              <div
                className={`${styles.nftBox} ${
                  selectedNftsToStake.includes(nft.metadata.id) ? styles.selected : ""
                }`}
                key={nft.metadata.id.toString()}
                onClick={() => {
                  setSelectedNftsToStake((prevSelectedNfts) => {
                    if (prevSelectedNfts.includes(nft.metadata.id)) {
                      return prevSelectedNfts.filter(
                        (id) => id !== nft.metadata.id
                      );
                    } else {
                      return [...prevSelectedNfts, nft.metadata.id];
                    }
                  });
                }}
              >
                <ThirdwebNftMedia
                  metadata={nft.metadata}
                  className={styles.nftMedia}
                />
                <h3>{nft.metadata.name}</h3>
              </div>
            ))}
          </div>

          <Web3Button
            contractAddress={stakingContractAddress}
            action={() => stakeNfts(selectedNftsToStake)}
            isDisabled={selectedNftsToStake.length === 0}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)', // Set background color with transparency
              backdropFilter: 'blur(10px)', // Apply blur effect
              border: 'none',
              color: 'white',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'hand',
              transition: 'all 0.3s ease',
                    }}
            >
            Rent Selected Waifu
          </Web3Button>
        </>
      )}
    </div>
  );
};

export default Stake;
