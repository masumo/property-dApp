import * as React from 'react';
import Router, { useRouter } from "next/router";
import {ethers, Contract} from 'ethers';
import * as tokenJson from '../abi/LotteryToken.json';
import { useSigner } from 'wagmi';
import { Button, Typography } from '@material-tailwind/react';


export function DisplayTokenBalance() {
  const [data, setData] = React.useState(null);
	const [isLoading, setLoading] = React.useState(false);
  //const [errorReason, setError] = React.useState(null);
  const router = useRouter();

  let etherscanApi = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
  let lotteryAddress = process.env.NEXT_PUBLIC_LOTTERY_ADDRESS;
  let tokenAddress = process.env.NEXT_PUBLIC_TOKEN_ADDRESS;
  let testnet = process.env.NEXT_PUBLIC_TESTNET;
  const { data:signer} = useSigner();
  const provider = new ethers.providers.EtherscanProvider(testnet, etherscanApi);
  const tokenContract = new Contract(tokenAddress, tokenJson.abi, provider);

    return (
      <div className="mt-2 w-80 max-w-screen-lg sm:w-96">
        <div className="flex justify-center">
          <Button className="mb-2" onClick={async () => await displayTokenBalance(tokenContract, signer, setLoading, setData)}>
            Display Token Balance
          </Button>
        </div>
          { 
            isLoading? <Typography variant="medium" color="blue-gray" className="text-center mb-2 font-medium">Checking token balance...</Typography> : <p></p>
          }
          { 
            data? <Typography variant="medium" color="blue-gray" className="text-center mb-2 font-medium">{data}</Typography> : <p></p>
          }
          
      </div>
    )
    
  }


 async function displayTokenBalance(tokenContract, signer, setLoading, setData) {
  setLoading(true);
  const balanceBN = await tokenContract.balanceOf(signer._address);
  console.log(balanceBN)
  const balance = ethers.utils.formatEther(balanceBN);
  console.log(balance)
  const output =`The account of address ${
    signer._address
  } has ${balance} LT0\n`;
  console.log(output)
  setData(output);
  setLoading(false);
}
   
 


 