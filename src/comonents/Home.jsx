import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Stamps from "../utils/Stamps.json";
import Button from "./Button/Button";
import { CONTRACT_ADDRESS } from "../utils/constants";
import WalletNotConnected from "../UI/WalletNotConnected";
import Bubble from "../layout/Bubble";

const Home = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [textData, setTextData] = useState();
  const [isError, setIsError] = useState();
  const [nftLink, setNftLink] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Please install metamask!");
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length !== 0) {
        setCurrentAccount(accounts[0]);
      }
      checkNetwork();
    } catch (error) {
      console.log("Error", error);
    }
  };

  const mintStamp = async () => {
    if (!textData) {
      return setIsError("Details cannot be empty!");
    } else if (textData.length > 1000) {
      return setIsError("Details should not exceeds more than 1000 words.");
    }
    try {
      checkNetwork();
      setIsLoading(true);
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          Stamps.abi,
          signer
        );
        let tx = await contract.createStamp(textData);
        let txNo = await contract.getTotalStamps();
        const receipt = await tx.wait();
        if (receipt.status === 1) {
          setIsLoading(false);
          setNftLink(
            `https://testnets.opensea.io/assets/mumbai/${CONTRACT_ADDRESS}/${txNo}`
          );
        } else {
          setIsLoading(false);
          alert("Transaction failed! Please try again");
        }
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    setIsError("");
  }, [textData]);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const btnTitle = isLoading ? "Creating...! Please wait" : "Create Stamp";

  const ifWalletConnected = () => {
    return (
      <div className="mt-5 w-full">
        <p className="text-4xl mb-8 tracking-wide text-gray-600">
          Create your Stamp
        </p>

        <textarea
          rows="8"
          cols="100"
          onChange={(e) => setTextData(e.target.value)}
          className="rounded-lg p-5 w-full outline-none shadow-text"
          placeholder="Enter your stamp details"
        ></textarea>
        <p className="text-sm mt-2 text-red-500">{isError}</p>
        <Button disabled={isLoading} onClick={mintStamp} title={btnTitle} />
        {!nftLink && (
          <p>
            Don't have matic?{" "}
            <a
              target={"_blank"}
              className="text-blue-500 text-sm"
              href="https://faucet.polygon.technology/"
            >
              Click here to get some
            </a>
          </p>
        )}
        {nftLink && (
          <div className="bg-green-100 rounded-lg p-5">
            <div className="text-sm -mb-5">
              Wooho!! You have created a Stamp. Click the link below to see your
              Smart Stamp
            </div>{" "}
            <br />
            <a className="text-blue-500" href={nftLink} target="_blank">
              {nftLink}
            </a>
          </div>
        )}
      </div>
    );
  };

  window.ethereum.on("accountsChanged", async () => {
    setCurrentAccount("");
  });

  const targetNetworkId = "0x13881";

  const checkNetwork = async () => {
    if (window.ethereum) {
      const currentChainId = await window.ethereum.request({
        method: "eth_chainId",
      });
      if (currentChainId == targetNetworkId) return true;
      return switchNetwork();
    }
  };
  // switches network to the one provided
  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: targetNetworkId }],
      });
    } catch {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: targetNetworkId,
            chainName: "Polygon Mumbai Testnet",
            nativeCurrency: {
              name: "Mumbai Testnet",
              symbol: "Matic",
              decimals: 18,
            },
            rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
            blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
          },
        ],
      });
    }
    // refresh
    window.location.reload();
  };

  return (
    <div>
      {!currentAccount && (
        <Bubble>
          <WalletNotConnected onClick={connectWallet} />
        </Bubble>
      )}
      {currentAccount && ifWalletConnected()}
    </div>
  );
};

export default Home;
