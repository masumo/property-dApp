import * as React from 'react';
import Router, { useRouter } from "next/router";
import {ethers, Contract} from 'ethers';
import * as lotteryJson from '../abi/Lottery.json';
import { useSigner } from 'wagmi';
import { Button, Input, Typography } from '@material-tailwind/react';

export function ClaimPrize() {
  const [data, setData] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);
  //const [errorReason, setError] = React.useState(null);
  const { data:signer} = useSigner();
  const router = useRouter();

  let etherscanApi = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
  let lotteryAddress = process.env.NEXT_PUBLIC_LOTTERY_ADDRESS;
  let testnet = process.env.NEXT_PUBLIC_TESTNET;

   const provider = new ethers.providers.EtherscanProvider(testnet, etherscanApi);
   const lotteryContract = new Contract(lotteryAddress, lotteryJson.abi, provider);
   
   async function handleSubmit(e) {
    if(signer){
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      let amount = formData.get('amount');
      await claimPrize(lotteryContract, signer, amount, setLoading, setData);
      
      
    }else{
      alert("Please connect to a wallet");
      e.preventDefault();
    }
}

    return (
      <div>
        <form className="mt-2 mb-2 w-80 max-w-screen-lg sm:w-96" method="post" onSubmit={handleSubmit}>
              <Typography
                  variant="medium"
                  color="blue-gray"
                  className="mb-4 font-medium"
                >
                  Claim Tokens:
              </Typography>
                <Input label ="Amount:" name="amount" /> 
              <Button className="mt-6" fullWidth type="submit">Claim</Button>
          </form>
          { 
            isLoading? <Typography variant="medium" color="blue-gray" className="text-center mb-4 font-medium">Claiming Tokens...</Typography> : <p></p>
          }
          { 
            data? <Typography variant="medium" color="blue-gray" className="text-center mb-4 font-medium">{data}</Typography> : <p></p>
          }
          
      </div>
    )
    
  }


 async function claimPrize(contract, signer, amount, setLoading, setData) {
  setLoading(true);
  try {
    const tx = await contract
    .connect(signer)
    .prizeWithdraw(ethers.utils.parseEther(amount));
    const receipt = await tx.wait();
    console.log(`Prize claimed (${receipt.transactionHash})\n`);
    setLoading(false);
    setData(`Prize claimed (${receipt.transactionHash})\n`)
    
  } catch (error) {
    setLoading(false);
    setData(`Couldn't claim the prize`)
  }
  
}
   
 


 