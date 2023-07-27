
import {useState,useRef,useEffect} from "react";
import Web3Modal from "web3modal";
import {ethers,providers} from "ethers";
import Link from "next/link";

export default function Page() {
    
    const [walletConnected,setWalletConnected] = useState(false);
const [address,setAddress]=useState("");
// Inside the Page component, add this state variable
const [isDropdownOpen, setIsDropdownOpen] = useState(false);

const web3ModalRef:any = useRef() ;

const toggleDropdown = () => {
  setIsDropdownOpen((prevState) => !prevState);
};

const getProviderOrSigner = async(prov:boolean=false)=>{
 const provider = await web3ModalRef.current.connect();
 const web3Provider = new providers.Web3Provider(provider);
 const {chainId} = await web3Provider.getNetwork();
 if(chainId!==80001){
window.alert("Please change network to Polygon Mumbai");
throw new Error("Change the network to Polygon Mumbai");}

if(prov){
const signer = web3Provider.getSigner();
const address = await signer.getAddress();
setAddress(address);
console.log(address);
return signer; 
}
else{
return web3Provider;
}
}
const connectWallet = async()=>{
try {
  await getProviderOrSigner(true);
  setWalletConnected(true);
  
} catch (error) {
  console.error(error);
}
}

const disconnectWallet = async () => {
  try {
   
    await web3ModalRef.current.clearCachedProvider();
    
    setWalletConnected(false);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  if(!walletConnected){
    web3ModalRef.current = new Web3Modal({
      network:"mumbai",
      providerOptions:{},
      disableInjectedProvider:false,
    });
  }

}, [walletConnected]);

// const renderButton =()=>{
//   if(walletConnected){
//     return(
//       <div>
// {/* <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className=" text-black text-md font-medium">{address}</button> */}
     
// <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
//   </svg></button>

// <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
//     <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
//       <li>
//         <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
//       </li>
//       <li>
//         <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
//       </li>
//       <li>
//         <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
//       </li>
//       <li>
//         <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
//       </li>
//     </ul>
// </div>


//       </div>
       
//     )
   
//   }
//   else{
//     return(
//       <button onClick = {connectWallet} className=" text-sky-200 text-md font-medium">Connect wallet</button>
//     );
//   }
// };

const renderButton = () => {
  if (walletConnected) {
    return (
      <section>
        <button
          id="dropdownDefaultButton" className="text-black text-md font-medium text-center"
          onClick={toggleDropdown}
        >
          {address}
        </button>
        <div
          id="dropdown"
          className={`z-10 ${isDropdownOpen ? 'block' : 'hidden'} bg-white dark:bg-gray-600`}
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li>
              <Link href="/profile" className="block px-4 py-2 dark:hover:bg-gray-600 dark:hover:text-white"> Profile</Link>
            </li>
            <li>
              <Link href="/" onClick={disconnectWallet} className="block px-4 py-2 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
            </li>
          </ul>
        </div>
      </section>
    );
  } else {
    return (
      <button onClick={connectWallet} className="text-sky-200 text-md font-medium">Connect wallet</button>
    );
  }
};

  return (
    <div className="overflow-x-hidden">

<div className="flex flex-col md:inline-flex lg:flex-row lg:justify-between lg:w-[100%] h-[84px] mx-auto">
  <div className="lg:flex lg:items-center md:items-center md:space-x-3 md:inline-flex flex-start">
    <div className="text-white text-opacity-75 text-lg font-medium leading-7 text-center">About</div>
    <div className="text-white text-opacity-75 text-lg font-medium leading-7 text-center">Collection</div>
    <div className="text-white text-opacity-75 text-lg font-medium leading-7 text-center">FAQs</div>
  </div>
  <div className="flex items-center mt-2 lg:mt-0 md:flex md:items-center md:justify-end">
    <div className="lg:min-w-[143px] lg:min-h-[47px] min-w-full min-h-[47px] pl-7 pr-4 pt-2 pb-2.5 bg-slate-500 bg-opacity-50 rounded-[100px]">
      {renderButton()}
    </div>
    <div className="lg:ml-8 flex space-x-3.5">
      <div className="w-7 h-7 relative">
        <div className="w-6 h-6 left-0 top-0">
          <div className="w-6 h-6 left-0 top-0" />
        </div>
      </div>
      <div className="w-7 h-7 relative">
        <div className="w-6 h-6 left-0 top-0">
          <div className="w-6 h-6 left-0 top-0">
            <div className="w-[21px] h-[17px] left-[2px] top-[4px]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div className="w-[100%] sm:w-[1512px] h-[606px] px-[12px] sm:px-[308px] py-[131px] sm:py-[131px] bg-neutral-900 justify-center items-center sm:inline-flex lg:inline-flex lg:w-full lg:h-full lg:justify-center lg:items-center">
  <div className="flex-col justify-center items-center gap-[16px] sm:gap-[38px] sm:inline-flex sm:justify-center">
    <div className="text-center">
      <span className="text-white text-[24px] sm:text-[44px] font-medium leading-[36px] sm:leading-[78px]">The project that inspired the modern </span>
      <span className="text-white text-[24px] sm:text-[44px] font-bold leading-[36px] sm:leading-[78px]">CryptoArt movement</span>
    </div>
    <div className="text-center">
    <span className="w-[260px] sm:w-[650px] text-center text-white text-sm sm:text-xl font-normal leading-[21px] sm:leading-[31px]">
      10,000 unique collectible characters with proof of ownership stored on the Ethereum blockchain.
    </span>
    </div>

    <div className="h-[38px] sm:h-[59px] pl-[10px] sm:pl-[38px] pr-[8px] sm:pr-10 pt-[7px] sm:pt-[13px] pb-1.5 sm:pb-3.5 bg-white rounded-[20px] sm:rounded-[100px] sm:justify-center items-center">
      <div className="text-center"><span className="text-neutral-900 text-sm sm:text-xl font-medium leading-[21px] sm:leading-[31px]">Mint now</span></div>
    </div>
  </div>
</div>

<div className="w-[100%] h-[261px] py-[37px] flex overflow-x-auto">
    <img className="w-[187px] h-[187px] px-1 top-0" src="https://s3-alpha-sig.figma.com/img/8459/18bd/4c2fc8c3b62b46073b3ff058074d2657?Expires=1691366400&Signature=YA~5Svo1kXv6DDxyHji13j~ulu~34tByMgvHwAdAVSXhpQtN0tn9hzUDR8M1qKAlIHnGGe4ysEkVYk1pMWmK4RYfMTuhzI9Jko-aCfnjKRZk4kRPpVM6xjhKkaoTZaVHu9kTvSM9KA3i4FLAiiBQTMs0669MzODT14KcbCm2W~dxIuLYmDKp9BZkP6kwo3GpvWSfzTt1Y~N7HwBeqRg8g-jYD2oUGCNQWra78ZWWzcka1taNsrqVNcAHj0WY9wyPlxWdEp5hD1TpXxOeTr356TqNEOkJv06rdBjjEyvneISsUReL8ndE2gcak50dETtVrjdHTNuRiT5xRmlz0EtdnQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
    <img className="w-[187px] h-[187px] px-1 top-0" src="https://s3-alpha-sig.figma.com/img/98bd/c3ac/32b7f02b0ba8f12abfee842ae402c09d?Expires=1691366400&Signature=TTUO1x9Z8OZgAxQ2aqC4RHN0T6UZlIh6nyA99pnxa~jv4otBU1I9m0FhMk9cRAjBlujkqWO0EArGYjLUq-uru2RgjI-U18OReWgLtp1ZCrSmaEKksPzOX9UTqiKI-XAUyUdV9JSIlgYt61EDxFqRpbwU47a2WtrWTL2vOAW3H~R2kX8fIteHCyJOHfX9E4QcAqCmVEUrlzGok2EgCHCpgAnuH7aVWwwq612WxY8xSirk7r7hVlxmPuPrFhq4p4a30mA-ik4FYH0ZLxe7l-5R27SnAnVjePxp7fQYejbj4QjzVdOXmLoF-0SuGAn-2FQ~qG4CFyAxwnVNof1~7IrjVQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
    <img className="w-[187px] h-[187px] px-1 top-0" src="https://s3-alpha-sig.figma.com/img/10b8/3cb6/f20cb58dd6232d2a7cac4d66eb2537d7?Expires=1691366400&Signature=QbSYs7CoyDIzDFI5~Bp1bgbbJ8f7KcjeUzhAyaTXD8i9MAIBF~uiKHCQOKQxZn8ebyiO1O0Rbggk5eIePj7syJhnO8y~XkdxOaydnOfvcbajFH4EJ5sg60RCurMoSB2YdREfi-ITi6WUrTF-8toKCj9FjIgzaXQb-GuXUL~ckmIAGUb17NXtOiWCeXyJ9bq08wG72kN~aj~8pZdWEpdZQH8h2xjCgmJ71cvIC-JjpAJvdPqfIPtrUNPZXQ2W4YsKXfvNQb8qs-J~kBvc7NCCNlrVJWTugrvJ89Pl7jWvtR6Xx~CAcijANXBDfhp4gfmZDVaDMg865aouLv5yDQZUKg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
    <img className="w-[187px] h-[187px] px-1 top-0" src="https://s3-alpha-sig.figma.com/img/61cf/cac1/390ca28ffb9b4b3d0e8f46ef0197fa2f?Expires=1691366400&Signature=GfZiSjCyyo1cg9M80nEseX6KiKTs1ndHlG0ClteaKuH95qDoT8-9ezuKkREmLD7SRTe-ZI8o-w9XWfzp5dY-iKMmWrReuTVYHQnUOnmRsQAu7mpW2~rTJKQYLY~f6DVFYSZcg1JBsWj4Uvf4GTOUXKMH~4UvAlsB7qgjSrgrKQ-aWBdSat1bpm9fdm7m6C5oQfq0VYcuuOPMTGt16HiI2-QTsPODksS~EJ0X~ueV2fbK2CidW5ndXnbPy~2ikWMqUcJbJxBB-TkQomWKoz7uLDW3-0HJNK5Vf5ojRBSbAw6GIAqZDXrbKAv-WvCYlH8N1XxiyNgk8oIlKLiKbruttQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
    <img className="w-[187px] h-[187px] px-1 top-0" src="https://s3-alpha-sig.figma.com/img/85c8/9201/d2548ef0fa188801c17708fa464f3773?Expires=1691366400&Signature=OSRb4mb8YVXH0YXHdLeZvLMPcj4xUAHpRsGbr6~sEpNTjAUFQf91Q2mvAaKe~1~3FrWrbPgj~BPOJSl7t~TrnhaJxQvtsOIQBEQaB6TmqUK4mB2QlDSh2RLgpio-ge6wAbywYvS1J~yH2u75pA2WdUxM02aC3SCv9ZiIFKV-5OnOoBKNLE9VhB0y6QLagVmbviRK8568FZhCOc3qEvdnQOjWswXd8dNxpLeyKLFW~w4p13~Ktf3U4yIR9vn3-LWoqAQZTZHM7aSlcxMovxhH8wiRMSTYYhml9Snp56TYs~xe8xEjWVWTC1W8Vn4ZsmBIaH6r87wetsN~m0lq89ObIQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
    <img className="w-[187px] h-[187px] px-1 top-0" src="https://s3-alpha-sig.figma.com/img/10b8/3cb6/f20cb58dd6232d2a7cac4d66eb2537d7?Expires=1691366400&Signature=QbSYs7CoyDIzDFI5~Bp1bgbbJ8f7KcjeUzhAyaTXD8i9MAIBF~uiKHCQOKQxZn8ebyiO1O0Rbggk5eIePj7syJhnO8y~XkdxOaydnOfvcbajFH4EJ5sg60RCurMoSB2YdREfi-ITi6WUrTF-8toKCj9FjIgzaXQb-GuXUL~ckmIAGUb17NXtOiWCeXyJ9bq08wG72kN~aj~8pZdWEpdZQH8h2xjCgmJ71cvIC-JjpAJvdPqfIPtrUNPZXQ2W4YsKXfvNQb8qs-J~kBvc7NCCNlrVJWTugrvJ89Pl7jWvtR6Xx~CAcijANXBDfhp4gfmZDVaDMg865aouLv5yDQZUKg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
    <img className="w-[187px] h-[187px] px-1 top-0" src="https://s3-alpha-sig.figma.com/img/98bd/c3ac/32b7f02b0ba8f12abfee842ae402c09d?Expires=1691366400&Signature=TTUO1x9Z8OZgAxQ2aqC4RHN0T6UZlIh6nyA99pnxa~jv4otBU1I9m0FhMk9cRAjBlujkqWO0EArGYjLUq-uru2RgjI-U18OReWgLtp1ZCrSmaEKksPzOX9UTqiKI-XAUyUdV9JSIlgYt61EDxFqRpbwU47a2WtrWTL2vOAW3H~R2kX8fIteHCyJOHfX9E4QcAqCmVEUrlzGok2EgCHCpgAnuH7aVWwwq612WxY8xSirk7r7hVlxmPuPrFhq4p4a30mA-ik4FYH0ZLxe7l-5R27SnAnVjePxp7fQYejbj4QjzVdOXmLoF-0SuGAn-2FQ~qG4CFyAxwnVNof1~7IrjVQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
    <img className="w-[187px] h-[187px] px-1 top-0" src="https://s3-alpha-sig.figma.com/img/8459/18bd/4c2fc8c3b62b46073b3ff058074d2657?Expires=1691366400&Signature=YA~5Svo1kXv6DDxyHji13j~ulu~34tByMgvHwAdAVSXhpQtN0tn9hzUDR8M1qKAlIHnGGe4ysEkVYk1pMWmK4RYfMTuhzI9Jko-aCfnjKRZk4kRPpVM6xjhKkaoTZaVHu9kTvSM9KA3i4FLAiiBQTMs0669MzODT14KcbCm2W~dxIuLYmDKp9BZkP6kwo3GpvWSfzTt1Y~N7HwBeqRg8g-jYD2oUGCNQWra78ZWWzcka1taNsrqVNcAHj0WY9wyPlxWdEp5hD1TpXxOeTr356TqNEOkJv06rdBjjEyvneISsUReL8ndE2gcak50dETtVrjdHTNuRiT5xRmlz0EtdnQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
    <img className="w-[187px] h-[187px] px-1 top-0" src="https://s3-alpha-sig.figma.com/img/cbb8/27f6/d02c895f811f4f9c5d2af894faae8de6?Expires=1691366400&Signature=YqkK9x6P~L3Nsd1krrIrxQxD-uxEPxMnMvS0ZGTjUTjsr9ai7ceZMVNW0TyC44vAc2Gw8tv63VcsIIHBQQMDTpGLi42xgHDuGwkciagne3CYncMej~~BKZrBdOvGq5gKkfKM-59NYY8iFYzHfbssxEdCny0eeOQlrVGfwb9XipPb4ZPIdfVvId6lrnjw4ZnypPT4X0QFv3vx-XvPFMGLdux7x7QTVbeWrmSV0JkJnVJe2ZoTxkYmaCD0vEbUwgl90Qq4YKaTNuw6I51rcjyXzuSw4ExWXbwONyQfYAysJfYRQUVv35HS4JvFSF0f6Cl9NEciBeFtjVujcnxEQ3jtuw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
    <img className="w-[187px] h-[187px] px-1 top-0" src="https://s3-alpha-sig.figma.com/img/98bd/c3ac/32b7f02b0ba8f12abfee842ae402c09d?Expires=1691366400&Signature=TTUO1x9Z8OZgAxQ2aqC4RHN0T6UZlIh6nyA99pnxa~jv4otBU1I9m0FhMk9cRAjBlujkqWO0EArGYjLUq-uru2RgjI-U18OReWgLtp1ZCrSmaEKksPzOX9UTqiKI-XAUyUdV9JSIlgYt61EDxFqRpbwU47a2WtrWTL2vOAW3H~R2kX8fIteHCyJOHfX9E4QcAqCmVEUrlzGok2EgCHCpgAnuH7aVWwwq612WxY8xSirk7r7hVlxmPuPrFhq4p4a30mA-ik4FYH0ZLxe7l-5R27SnAnVjePxp7fQYejbj4QjzVdOXmLoF-0SuGAn-2FQ~qG4CFyAxwnVNof1~7IrjVQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
    <img className="w-[187px] h-[187px] px-1 top-0" src="https://s3-alpha-sig.figma.com/img/85c8/9201/d2548ef0fa188801c17708fa464f3773?Expires=1691366400&Signature=OSRb4mb8YVXH0YXHdLeZvLMPcj4xUAHpRsGbr6~sEpNTjAUFQf91Q2mvAaKe~1~3FrWrbPgj~BPOJSl7t~TrnhaJxQvtsOIQBEQaB6TmqUK4mB2QlDSh2RLgpio-ge6wAbywYvS1J~yH2u75pA2WdUxM02aC3SCv9ZiIFKV-5OnOoBKNLE9VhB0y6QLagVmbviRK8568FZhCOc3qEvdnQOjWswXd8dNxpLeyKLFW~w4p13~Ktf3U4yIR9vn3-LWoqAQZTZHM7aSlcxMovxhH8wiRMSTYYhml9Snp56TYs~xe8xEjWVWTC1W8Vn4ZsmBIaH6r87wetsN~m0lq89ObIQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
    <img className="w-[187px] h-[187px] px-1 top-0" src="https://s3-alpha-sig.figma.com/img/cbb8/27f6/d02c895f811f4f9c5d2af894faae8de6?Expires=1691366400&Signature=YqkK9x6P~L3Nsd1krrIrxQxD-uxEPxMnMvS0ZGTjUTjsr9ai7ceZMVNW0TyC44vAc2Gw8tv63VcsIIHBQQMDTpGLi42xgHDuGwkciagne3CYncMej~~BKZrBdOvGq5gKkfKM-59NYY8iFYzHfbssxEdCny0eeOQlrVGfwb9XipPb4ZPIdfVvId6lrnjw4ZnypPT4X0QFv3vx-XvPFMGLdux7x7QTVbeWrmSV0JkJnVJe2ZoTxkYmaCD0vEbUwgl90Qq4YKaTNuw6I51rcjyXzuSw4ExWXbwONyQfYAysJfYRQUVv35HS4JvFSF0f6Cl9NEciBeFtjVujcnxEQ3jtuw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
  </div>

<div className="w-[100%] md:w-[100%] h-[auto md:h-[691px]] py-[131px] flex flex-col justify-center items-center gap-[74px]">
  <div className="text-center text-white text-[26px] font-medium leading-[39px]">Featured in</div>
  <div className="md:flex flex-col md:flex-row justify-start items-start gap-7">
    <div className="h-[316px] px-px pt-px pb-5 rounded-[28px] border border-neutral-600 flex flex-col justify-start items-center gap-[19px]">
      <div className="pl-[37px] pr-[42px] pt-[43px] pb-[51px] rounded-tl-[28px] rounded-tr-[28px] border-b border-neutral-600 flex flex-col justify-start items-start gap-[18px]">
        <img className="w-[125px] h-5" src="https://via.placeholder.com/125x20" />
        <div className="w-[354px] text-white text-[23px] font-normal leading-[35px]">This ethereum-based project could change how we think about digital art</div>
      </div>
      <div className="h-10 pt-[9px] pb-2.5 flex justify-center items-start gap-[223px]">
        <div className="w-[115px] h-[21px] text-white text-xl font-medium leading-[21px]">Read article</div>
        <div className="w-5 h-5 relative"></div>
      </div>
    </div>
    
    <div className="h-[316px] px-px pt-px pb-5 rounded-[28px] border border-neutral-600 flex flex-col justify-start items-center gap-[19px]">
      <div className="pl-[37px] pr-[73px] pt-[43px] pb-[51px] rounded-tl-[28px] rounded-tr-[28px] border-b border-neutral-600 flex flex-col justify-start items-start gap-[18px]">
        <img className="w-[125px] h-5" src="https://via.placeholder.com/125x20" />
        <div className="w-[323px] text-white text-[22px] font-normal leading-[35px]">CryptoKitties, CryptoPunks and the birth of a cottage industry</div>
      </div>
      <div className="h-10 pt-[9px] pb-2.5 flex justify-center items-start gap-[223px]">
        <div className="w-[115px] h-[21px] text-white text-xl font-medium leading-[21px]">Read article</div>
        <div className="w-5 h-5 relative"></div>
      </div>
    </div>
    
    <div className="h-[316px] md:mx-1 px-px pt-px py-5 rounded-[28px] border border-neutral-600 flex flex-col justify-start items-center gap-[19px]">
      <div className="pl-[37px] pr-[63px] pt-[43px] pb-4 rounded-tl-[28px] rounded-tr-[28px] border-b border-neutral-600 flex flex-col justify-end items-start gap-[18px]">
        <img className="w-[125px] h-5" src="https://via.placeholder.com/125x20" />
        <div className="w-[333px] text-white text-[23px] font-normal leading-[35px]">‘Obviously, we had no idea it was going to get here,’ say the guys who made the first NFT</div>
      </div>
      <div className="h-10 pt-[9px] pb-2.5 flex justify-center items-start gap-[223px]">
        <div className="w-[115px] h-[21px] text-white text-xl font-medium leading-[21px]">Read article</div>
        <div className="w-5 h-5 relative"></div>
      </div>
    </div>
  </div>
</div>



<div className="w-[100%] h-[491px] px-[75.59px] py-3 bg-neutral-900 rounded-bl-[55.99px] rounded-br-[55.99px] justify-start items-start inline-flex">
  <div className="h-[1291px] pt-[130px] pb-[131px] flex-col justify-start items-start gap-[131px] inline-flex">
    <div className="w-[1342px] justify-start items-start gap-[352px] inline-flex">
      <div className="text-white text-[53px] font-medium leading-[67px]">Meet the Punks</div>
      <div className="h-[266px] flex-col justify-start items-start gap-7 inline-flex">
        <div className="w-[605px] text-white text-xl font-normal leading-[31px]">The CryptoPunks are 24x24 pixel art images, generated algorithmically. Most are punky-looking guys and girls, but there are a few rarer types mixed in: Apes, Zombies and even the odd Alien. Every punk has their own profile page that shows their attributes as well as their ownership/for-sale status.</div>
        <div className="w-[627px] h-20 pr-[174px] pt-[19px] justify-start items-center gap-[19px] inline-flex">
          <div className="w-[178px] h-[59px] pl-[39px] pr-10 pt-[13px] pb-3.5 bg-white rounded-[100px] justify-start items-start flex">
            <div className="text-center text-neutral-900 text-[19px] font-medium leading-[31px]">Buy a Punk</div>
          </div>
          <div className="w-64 h-[61px] px-10 pt-3.5 rounded-[100px] border border-white border-opacity-25 justify-start items-start flex">
            <div className="text-center text-white text-xl font-medium leading-[31px]">View full collection</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



<div className="lg:w-[100%] justify-start items-start pt-9 gap-[93px] lg:flex-row inline-flex md:flex flex-col">
      <div className="h-[523px] flex-col justify-start items-start gap-[19px] inline-flex ">
        <div className="w-[634px] h-[162px] pl-[38px] pr-[47px] py-[38px] bg-slate-500 rounded-[28px] border border-slate-500 justify-start items-start inline-flex">
          <div className="w-[549px] text-white text-[28px] font-medium leading-[42px]">Punks with a blue background are not for sale and have no current bids.</div>
        </div>
        <div className="w-[634px] h-[162px] pl-[38px] pr-[117px] py-[38px] rounded-[28px] border border-neutral-600 justify-start items-start inline-flex">
          <div className="w-[478px] text-white text-[28px] font-medium leading-[42px]">Punks with a red background are available for sale by their owner.</div>
        </div>
        <div className="w-[634px] h-[162px] pl-[38px] pr-[49px] py-[38px] rounded-[28px] border border-neutral-600 justify-start items-start inline-flex">
          <div className="w-[519px] text-white text-[28px] font-medium leading-[42px]">Punks with a purple background have an active bid on them</div>
        </div>
      </div>
      <div className="w-[634px] h-[634px] justify-start items-start flex">
        <img className="rounded-[37px] md: w-[524px] h-[524px]" src="https://s3-alpha-sig.figma.com/img/70dc/a3eb/45b248f677fc0e5b8887e6f43d57af89?Expires=1691366400&Signature=RNRL2g8bW5OR4Wk96B-QYcH-5Cv0Q-GqGf4J~RXs24yE8JiyNB8ywtv4rBReTiJqtTklgowUrK0gkIjbGwEhzbMGfvsDRURGIhlenb9WaDYZoNvSg9TVOTnJzoNAOEFrzuM1JHqVx~CYEJ-UDyqUEs7FOYq~x519gocy0cT4Z7XBgznl6c7mz2755qybNpVYEvAFAEB3G2u1s9lOZ4MqlOoUTWJUBDkgXGQbJHgNv4iPYMw979Fo1EDgrVKEnizozgw8CUX~BpdSW6OmCCQfHtKMefL0LIPl9cYH30u1BQ-M1-EdGPQdnfwQg2vASI0h7I4hjKh98cXxG108Q3mq~A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
      </div>
    </div>

    <div className="lg:w-[100%] lg:h-[974px] pt-[131px] flex-col justify-start items-start gap-[93px] inline-flex bg-white">
  <div className="lg:w-[1361px] lg:h-[67px] relative">
    <div className="left-0 top-0 absolute text-neutral-900 text-3xl md:text-2xl lg:text-4xl font-medium leading-[67px]">Largest Sales</div>
    <div className="w-[159px] h-[61px] pl-[38px] pr-10 pt-3.5 pb-[15px] left-[1208px] top-[3px] absolute rounded-[100px] border border-neutral-900 border-opacity-20 justify-start items-start inline-flex">
      <div className="text-center text-neutral-900 text-lg md:text-xl lg:text-2xl font-medium leading-[31px]">View all</div>
    </div>
  </div>

  <div className="lg:w-[100%] lg:h-[683px] pr-[0] pb-8 md:pb-16 lg:pb-28 justify-start items-start inline-flex overflow-hidden">
    <div className="w-[454px] h-[571px] relative">
      <div className="w-[426px] h-[571px] left-0 top-0 absolute">
        <div className="w-[426px] h-[426px] left-0 top-0 absolute">
          <img className="w-[426px] h-[426px] left-0 top-0 absolute rounded-[28px]" src="https://s3-alpha-sig.figma.com/img/0d6b/388f/e434d5156e3f016f97404aec1a3fb289?Expires=1691366400&Signature=OP27bkbnB5m1OZzCdDaRAH9DQ3ImThL5BgfjTxFb94mz2FklqICLBc3WNpS7IbGKoHrhCOKYUlZ4p-Cz4280gJkN9UiRBbVD6QroeleNOGSBGNfxgCXpKLMbzE3dJkmxYsQRQPE-23tvcl2bDr7M2WgtKNcp4ZGEo5lp2XcH5WHIQQaIivUBhECg7in84s9LhmM4Red-VZCC-KDaSDJulkVkUTpD29iJYnjgJutdEmNH-AbPvQrRfs61dQiVdJZqoxAQ4UOqtrqP7gXa5yGnR8q2pxexDIMoPAD3rDeiJRH6man2R2nuOzVN9hR4RqmrtNQd1o5fwbgPAVnXbT7Lcw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
        </div>
      </div>
      <div className="w-[426px] h-[571px] lg:left-[454px] lg:top-0 absolute">
        <div className="w-[426px] h-[426px] left-0 top-0 absolute">
          <img className="w-[426px] h-[426px] left-0 top-0 absolute rounded-[28px]" src="https://s3-alpha-sig.figma.com/img/8d50/c9fc/8f3b046b7634434d368c402e0f1af980?Expires=1691366400&Signature=Hyr2AtzBGe5GfdfLBcuFVsv~UVLYtz8JQeeP-23uq~zBgcgV59L6nR~tKZgAbGo5eYDp2J3braBtQ1L-H85bX3Lps4H8B-3Tj2jV9jppx5hZOV8vDXsLg14ONsRb2AdaWo9hwtHBjqv1TmABL9fDXXvqee~-JRctMnS1pxdI9QC1D3BYCCbeKqKqEXkcTVsjbvqd~UhNBJlwzpEcRGOCPihSbwcPwU3SNM~6zywogorp8y8nwLAdKzXaTPhoWZNBy8VhpZ9TdREy~j-ah46NLLDbVqZvHNWhvGScW~T1a5KNSEisuH2nkAPFlBsz5IOG8GbrNli0ZVV3zEhuzLsyIg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
        </div>
      </div>
      <div className="w-[426px] h-[571px] lg:left-[907px] lg:top-0 absolute">
        <div className="w-[426px] h-[426px] left-0 top-0 absolute">
          <img className="w-[426px] h-[426px] left-0 top-0 absolute rounded-[28px]" src="https://s3-alpha-sig.figma.com/img/f1e5/7cfb/c27f8af87507a7e5898f9eb0aa97ebc5?Expires=1691366400&Signature=cSWsZaU-sWVX252uGxQS0tbm9oM-VrwCaxfftc7xKCOCs7daOc71NafOSQDShKFBIcohriYIyxHrT1vzerNuGM5KIWlnC9-VVLH1A9YnZP7~tKiGtMVru460AIcu-O34sJ-QQOKYHWxnq1fQ7NP-FzIIxHlIj0M9QJvcwMFzu-EmgDc7i2k2sTR319HDbVSa9ui24YvNTMcTxJxjubEDsThxtO~WZQNUG~LJIZ-6g55hYWSwAA4gSSytPiPhbVcYnVFhzupRRa7KH7628KvcOgGiNlL0m-xwOzz1kaLQj2wb0F8AfU2Tz-6tr6Po8s7xBiAHqjLJWknterCg2Pq5jg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
        </div>
      </div>
    </div>
    <div className="w-[65px] h-[65px] left-0 top-[618px] absolute bg-white rounded-[65px] border border-neutral-900 border-opacity-20">
      <div className="left-[21px] top-[21px] absolute justify-start items-start inline-flex">
        <div className="w-4 h-4 md:w-6 md:h-6 lg:w-7 lg:h-7 relative" />
      </div>
    </div>
    <div className="w-[65px] h-[65px] lg:left-[75px] lg:top-[618px] absolute bg-white rounded-[65px] border border-neutral-900 border-opacity-20">
      <div className="left-[21px] top-[21px] absolute justify-start items-start inline-flex">
        <div className="w-4 h-4 md:w-6 md:h-6 lg:w-7 lg:h-7 relative" />
      </div>
    </div>
  </div>
</div>



<div className="w-full lg:w-[100%] h-auto pt-8 pb-32 md:pb-28 flex flex-col items-start gap-4 md:gap-24 bg-white">
  <div className="w-full lg:w-[100%] h-auto relative">
    <div className="left-0 top-0 absolute text-neutral-900 text-lg md:text-5xl font-medium leading-6 md:leading-10">Recent Transactions</div>
    <div className="w-36 h-10 md:h-16 pl-3 md:pl-9 pr-4 md:pr-10 py-2 md:py-3.5 left-[calc(100% - 6rem)] md:left-auto top-[32px] md:top-[28px] absolute rounded-full border border-neutral-900 border-opacity-20 flex justify-center items-center">
      <div className="text-center text-xs md:text-xl font-medium leading-5 md:leading-loose">View all</div>
    </div>
  </div>
  <div className="w-full lg:w-[1361px] h-auto pr-4 md:pr-96 pb-8 md:pb-28 inline-flex items-start gap-4 md:gap-7">
    <div className="w-full h-auto relative">
      <img className="w-full h-auto md:w-[400px] lg:w-[600px] left-0 top-0 absolute md:static rounded-3xl" src="https://via.placeholder.com/426x426" />
      <div className="pr-4 md:pr-44 flex flex-col justify-start items-start">
        <div className="text-neutral-900 text-sm md:text-2xl font-medium leading-6 md:leading-10">#1254</div>
        <div className="text-neutral-900 text-xs md:text-lg font-normal leading-5 md:leading-loose">New bid of 51.20Ξ ($210,265)</div>
      </div>
    </div>
    <div className="w-full h-auto relative">
      <img className="w-full h-auto md:w-[400px] lg:w-[600px] left-0 top-0 absolute md:static rounded-3xl" src="https://via.placeholder.com/426x426" />
      <div className="pr-4 md:pr-48 flex flex-col justify-start items-start">
        <div className="text-neutral-900 text-sm md:text-2xl font-medium leading-6 md:leading-10">#9844</div>
        <div className="text-neutral-900 text-xs md:text-lg font-normal leading-5 md:leading-loose">New bid of 111Ξ ($455,848)</div>
      </div>
    </div>
    <div className="w-full h-auto relative">
      <img className="w-full h-auto md:w-[400px] lg:w-[600px] left-0 top-0 absolute md:static rounded-3xl" src="https://via.placeholder.com/426x426" />
      <div className="pr-4 md:pr-40 flex flex-col justify-start items-start">
        <div className="text-neutral-900 text-sm md:text-2xl font-medium leading-6 md:leading-10">#4156</div>
        <div className="text-neutral-900 text-xs md:text-lg font-normal leading-5 md:leading-loose">Offered for 63.95Ξ ($262,626)</div>
      </div>
    </div>
    <div className="w-full h-auto relative">
      <img className="w-full h-auto md:w-[400px] lg:w-[600px] left-0 top-0 absolute md:static rounded-3xl" src="https://via.placeholder.com/426x426" />
      <div className="pr-4 md:pr-40 flex flex-col justify-start items-start">
        <div className="text-neutral-900 text-sm md:text-2xl font-medium leading-6 md:leading-10">#4156</div>
        <div className="text-neutral-900 text-xs md:text-lg font-normal leading-5 md:leading-loose">Offered for 63.95Ξ ($262,626)</div>
      </div>
    </div>
    <div className="w-full h-auto relative">
      <img className="w-full h-auto md:w-[400px] lg:w-[600px] left-0 top-0 absolute md:static rounded-3xl" src="https://via.placeholder.com/426x426" />
      <div className="pr-4 md:pr-40 flex flex-col justify-start items-start">
        <div className="text-neutral-900 text-sm md:text-2xl font-medium leading-6 md:leading-10">#4156</div>
        <div className="text-neutral-900 text-xs md:text-lg font-normal leading-5 md:leading-loose">Offered for 63.95Ξ ($262,626)</div>
      </div>
    </div>
  </div>
  <div className="w-16 h-16 bg-white rounded-3xl border border-neutral-900 border-opacity-20">
    <div className="w-6 h-6 relative left-6 top-6 md:left-[21px] md:top-[21px] justify-start items-start inline-flex">
      <div className="w-3 h-3 relative" />
    </div>
  </div>
  <div className="w-16 h-16 bg-white rounded-3xl border border-neutral-900 border-opacity-20">
    <div className="w-6 h-6 relative left-6 top-6 md:left-[21px] md:top-[21px] justify-start items-start inline-flex">
      <div className="w-3 h-3 relative" />
    </div>
  </div>
</div>


<div className="w-96 h-96 px-20 py-32 bg-neutral-900 rounded-tl-3xl rounded-tr-3xl justify-start items-start inline-flex">
  <div className="w-96 h-96 relative">
    <div className="left-0 top-[27px] absolute text-white text-5xl font-medium leading-10">How do I get a punk?</div>
    <div className="left-[626px] top-0 absolute flex-col justify-start items-start inline-flex">
      <div className="w-px h-96 left-[45px] top-[90px] absolute bg-white bg-opacity-20" />
      <div className="w-96 h-96 relative">
        <div className="w-96 h-72 left-[140px] top-[47px] absolute">
          <img className="w-14 h-14 left-0 top-0 absolute" src="https://via.placeholder.com/56x56" />
          <div className="w-80 h-6 left-0 top-[88px] absolute text-white text-xl font-medium leading-loose">Download and install MetaMask</div>
          <div className="w-96 h-20 left-0 top-[139px] absolute"><span className="text-white text-opacity-80 text-lg font-normal leading-7">Download and install a Chrome browser plugin called </span><span className="text-white text-opacity-80 text-lg font-normal underline leading-7">MetaMask</span><span className="text-white text-opacity-80 text-lg font-normal leading-7">. This will allow websites (that you authorise) access to your Ethereum account.</span></div>
          <div className="w-56 h-12 pl-6 pr-7 pt-2 pb-2.5 left-0 top-[247px] absolute rounded-full border border-white border-opacity-25 justify-start items-start inline-flex">
            <div className=" text-white text-lg font-medium leading-7 min-w-[300px]">Download MetaMask</div>
          </div>
        </div>
        <div className="w-24 h-24 p-5 left-[1px] top-[28px] absolute bg-neutral-900 justify-start items-start inline-flex">
          <div className="w-14 h-14 relative">
            <div className="w-14 h-14 left-0 top-0 absolute" />
          </div>
        </div>
      </div>
      <div className="w-96 h-72 relative">
        <div className="w-96 h-48 left-[140px] top-[47px] absolute">
          <img className="w-14 h-14 left-0 top-0 absolute" src="https://via.placeholder.com/56x56" />
          <div className="w-52 h-6 left-0 top-[88px] absolute text-white text-xl font-medium leading-loose">Buy some Ethereum</div>
          <div className="w-96 left-0 top-[134px] absolute text-white text-opacity-80 text-lg font-normal leading-7">If you made a new account, buy some Ethereum. The MetaMask plugin has a button that will allow you to buy Ether from Coinbase.</div>
        </div>
        <div className="w-24 h-24 p-5 left-[1px] top-[28px] absolute bg-neutral-900 justify-start items-start inline-flex">
          <div className="w-14 h-14 relative">
            <div className="w-14 h-14 left-0 top-0 absolute" />
          </div>
        </div>
      </div>
      <div className="w-96 h-56 relative">
        <div className="pr-2 left-[140px] top-[46px] absolute flex-col justify-start items-start gap-1 inline-flex">
          <div className="text-white text-xl font-medium leading-loose">Start bidding, buying and selling</div>
          <div className="w-96 text-white text-opacity-80 text-lg font-normal leading-7">Once you have the plugin installed, this website will recognise it and add buttons that allow you to bid on, buy and sell punks directly in the interface.</div>
        </div>
        <div className="w-24 h-24 p-5 left-[1px] top-[28px] absolute bg-neutral-900 justify-start items-start inline-flex">
          <div className="w-14 h-14 relative">
            <div className="w-14 h-14 left-0 top-0 absolute" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  </div>
  )
  }