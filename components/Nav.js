import { Container, Flex, Heading, Link, Text } from "@chakra-ui/react";
import styles from "../styles/Navbar.module.css"; // Import your CSS file
import { useState } from "react"; // Import the useState hook
import { ConnectWallet, darkTheme, MediaRenderer} from "@thirdweb-dev/react";
import { title } from "process";

export default function Navbar() {
    const customTheme = darkTheme ({
        fontFamily: "Futura 66 Medium Italic",
        colors: {
                modalBg: "#FFF4F2",
                dropdownBg: "#FFF4F2",
                borderColor: "#AA336A",
                separatorLine: "#262830",
                danger: "#AA336A",
                success: "#AA336A",
                primaryText: "#AA336A",
                secondaryText: "#AA336A",
                accentButtonBg: "#AA336A",
                accentText: "#AA336A",
                selectedTextBg: "#AA336A",
                accentButtonText: "#FFFFFF",
                primaryButtonBg: "#FFFFFF",
                primaryButtonText: "#AA336A",
                secondaryButtonBg: "#FFFFFF",
                secondaryButtonHoverBg: "#FFFFFF",
                secondaryButtonText: "#FFFFFF",
                connectedButtonBg: "#131418",
                connectedButtonBgHover: "#FFFFFF",
                walletSelectorButtonHoverBg:
                  "#FFFFFF",
                secondaryIconColor: "#FFFFFF",
                secondaryIconHoverColor: "#FFFFFF",
                secondaryIconHoverBg: "#FFFFFF",
                skeletonBg: "#AA336A",
                selectedTextColor: "#AA336A",
              },
    });
    const [showSubLinks, setShowSubLinks] = useState(false);

    const toggleSubLinks = () => {
        setShowSubLinks(!showSubLinks);
    };

    return (
        <Container maxW={"1200px"} py={4}>
            <Flex
                direction={{ base: "column", md: "row" }}
                justifyContent="space-between" // Distribute items evenly along the main axis
                alignItems="center" // Center the content vertically
                className={styles.navbar} // Apply a class for styling
                style={{
                    position: "fixed", // Fixed positioning
                    top: 0, // Position at the top of the viewport
                    left: 0, // Position at the left of the viewport
                    width: "100%", // Full width
                    backdropFilter: "blur(10px)", // Apply blur effect
                    backgroundColor: "rgba(0, 0, 0, 0)", // Semi-transparent background color
                    zIndex: 999, // Ensure the navbar is above other content
                    padding: "1rem" // Add padding
                }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <a href="https://lamasea.com"> {/* Anchor tag with your desired link */}
                <div className={styles.logo}></div> {/* Container for the logo */}
                    </a> {/* Container for the logo */}
                <div className={styles.logo}></div> {/* Container for the logo */}              
                </div>
                <Flex>
                    <ConnectWallet
                    btnTitle="Waifu Connect"
                    theme={customTheme}

                    modalTitle="Waifu Connect"

                    welcomeScreen={{
                        title: "Welcome To Waifu Staking",
                        img: {
                            src: "/pixelcut-export.png",
                            height: "250",
                            width: "250",
                        }    
                    }}
                    />
                </Flex>
            </Flex>
        </Container>
    );
}
