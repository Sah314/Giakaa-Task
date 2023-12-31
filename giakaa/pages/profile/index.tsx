import {useState,useRef,useEffect} from "react";
import Web3Modal from "web3modal";
import {Contract, ethers,providers} from "ethers";
import {CONTRACT_ADDRESS,ABI} from "../../constants";

export default function Profile(){

    const web3ModalRef:any = useRef();
    const [userName,setUserName] = useState("");
    const [address,setAddress] = useState("");
    const [walletConnected, setWalletConnected] = useState(false);
    const [error,setError] = useState("");
    
    const connectWallet = async()=>{
      try {
        await getProviderOrSigner(true);
        setWalletConnected(true);
        
      } catch (error:any) {
        if (error.code === 4001) {
          // User rejected the wallet connection.
          setError('Error: Please connect your wallet');
      }
      else{
        console.error(error);
      }
      }
    }


    const getProviderOrSigner = async (prov:boolean = false) => {
        const provider = await web3ModalRef.current.connect();
        const web3Provider = new providers.Web3Provider(provider);
        const { chainId } = await web3Provider.getNetwork();
        if (chainId !== 80001) {
          window.alert("Please change network to Polygon Mumbai");
          throw new Error("Change the network to Polygon Mumbai");
        }
    
        if(prov){
          const signer = web3Provider.getSigner();
          return signer; 
          }
          else{
          return web3Provider;
          }
      };

      const getUsername = async()=>{
        const signer: any= await getProviderOrSigner(true);
        const UserNameContract = new Contract(CONTRACT_ADDRESS,ABI,signer);
        const address = await signer.getAddress();
        setAddress(address);
        const userName = await UserNameContract.getUserName(address);
        if(userName!=="Usernotfound"){
          setUserName(userName);
        }
        return userName;
      }

      useEffect(() => {
        if(!walletConnected){
          web3ModalRef.current = new Web3Modal({
            network:"mumbai",
            providerOptions:{},
            disableInjectedProvider:false,
          });
        }
        connectWallet();
        getUsername();
      }, [userName,connectWallet]);
      
   
  
        if(walletConnected){
          return(
            <section className="flex font-medium items-center justify-center h-screen">
        <section className="w-164 mx-auto bg-slate-500 bg-opacity-50 rounded-2xl px-8 py-6 shadow-lg">
          <div className="mt-6 w-fit mx-auto">
            <img src="https://s3-alpha-sig.figma.com/img/8894/b17a/54bf26393893d2401f4cec62b085db95?Expires=1691366400&Signature=q5liJPwYs6UnBsio1CgULVhuVAApPrD2mh8oNLWiJ8VOgrCTackwZz82R03GJlcZrcx1TuacG1lNy0s9wuI3ZwcKQNOplmd2ujFHnC2jQG5gAqUIwRdc2SDppWCDqrnkIT2wrJ2oR24obMIDLMfOlBDWzLR3CmQX~MrQMmzw5ypCak0PN0E9eNihaTVGoKtISxIKTxhPGWBVCtJHD0V7HmZchmNRb7OE07lLMkiYRsKamEAZGHaPU33yyHT2RnVqZhAFGD381wZpOL95LFWaiGjY-j4lcdeLPx34WbrFycMyJY8KE0BJv-fQLcr8QHOoo0E~E6lXPDeuPf9V43Vm3w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" className="rounded-full w-28 " alt="profile picture" />
          </div>

          <div className="mt-8">
            <h2 className="text-white font-bold text-2xl tracking-wide"> {userName!==""?userName:"User Not Found"}</h2>
          </div>
        
          <div className="mt-3 text-white text-sm">
            <span className="text-gray-400 font-semibold">{userName!==""?address:""}</span>
          </div>
        </section>
      </section>
          )
        }
      else{
        return (
          <div>
            {error && (
              <div>
                Please connect your Wallet
              </div>
            )}
          </div>
        );
      }
}