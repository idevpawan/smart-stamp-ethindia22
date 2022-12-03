import { useEffect, useState } from 'react';

const getEthereumObject = () => window?.ethereum;

const getMetamask = async() =>{
  try {
    const ethereum = getEthereumObject();

  if(!ethereum){
    alert("Get Metamask");
    return;
  }
  const accounts = await ethereum.request({method: 'eth_accounts'});
  const account = accounts[0];
  if(accounts.length !== 0){
    console.log("Found an authorized accounts ", account);
    return account;
  }else{
    console.log("No authorized account found");
    return;
  }
    
  } catch (error) {
    console.log("Error: ",error);
  }
}
const Home = () => {

    const [currentAccount, setCurrentAccount] = useState("");

    const connectWallet = async() =>{
      try {
        const ethereum = getEthereumObject();
      if(!ethereum){
        return
      }
      const accounts = await ethereum.request({method: 'eth_requestAccounts'});
      setCurrentAccount(accounts[0]);
      return;
        
      } catch (error) {
        console.log("Error", error)
      }
    }
  
    useEffect(()=>{
      const account = getMetamask();
      if(account !== null){
        setCurrentAccount(account);
      }
    },[])
  
    return (
        <div className="flex flex-row space-between items-center mb-40">
          <div className="flex mf:flex-row flex-row items-start justify-between lg:p-20 py-12 px-4 gap-80">
            <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
              <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                Smart Stamp <br /> across the world
              </h1>
              <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                Explore the crypto world. Buy and sell smart stamp with a click easily.
              </p>
              
        </div>
        <div className="items-end ">
            <button
              type="button"
              onClick={connectWallet}
              className="mr-0 my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              {/* <AiFillPlayCircle className="text-white mr-2" /> */}
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
            </div>
        </div>

        </div>
      );
}

export default Home;