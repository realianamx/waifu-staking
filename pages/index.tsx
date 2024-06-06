import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import Nav from "../components/Nav";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Nav/>
      {/* Top Section */}
      <h1 className={styles.h1}>Welcome To Waifu Rental House</h1>
      <div className={styles.nftBoxGrid}>
        <div
          className={styles.optionSelectBox}
          role="button"
          onClick={() => router.push("https://rae-art-club.vercel.app/Waifu.html")}
        >
          {/* Mint a new NFT */}
          <Image src="/icons/drop.webp" alt="drop" width={64} height={64} />
          <h2 className={styles.selectBoxTitle}>Get Your Waifu</h2>
          <p className={styles.selectBoxDescription}>
            Go And Get Your Waifu Now To Earn $LIC.
          </p>
        </div>

        <div
          className={styles.optionSelectBox}
          role="button"
          onClick={() => router.push("/stake")}
        >
          {/* Staking an NFT */}
          <Image src="/icons/token.webp" alt="token" width={64} height={64} />
          <h2 className={styles.selectBoxTitle}>Rent Your Waifu</h2>
          <p className={styles.selectBoxDescription}>
            Rent Your Waifu With <b>Waifu</b>{" "}
            Renting App And Earn <b>$LIC</b>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
