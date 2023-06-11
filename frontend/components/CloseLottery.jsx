import * as React from 'react';
import Router, { useRouter } from "next/router";
import {ethers, Contract} from 'ethers';
import * as lotteryJson from '../abi/Lottery.json';
import { useSigner } from 'wagmi';
import { Button, Typography } from '@material-tailwind/react';

export function CloseLottery() {
  const [data, setData] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);
  const { data:signer} = useSigner();
  //const [errorReason, setError] = React.useState(null);
  const router = useRouter();

  let etherscanApi = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
  let lotteryAddress = process.env.NEXT_PUBLIC_LOTTERY_ADDRESS;
  let testnet = process.env.NEXT_PUBLIC_TESTNET;

  
   const provider = new ethers.providers.EtherscanProvider(testnet, etherscanApi);
   const lotteryContract = new Contract(lotteryAddress, lotteryJson.abi, provider);

    return (
      <div className="mt-2 w-80 max-w-screen-lg sm:w-96">
        <Typography variant="medium" color="blue-gray" className="text-center mb-2 font-medium">
          The lottery need to be closed, before claiming the prize or burning the tokens.
        </Typography>
        <div className="flex justify-center">
          <Button onClick={async () => await closeLottery(lotteryContract, signer, setLoading, setData)}>
            Close Lottery
          </Button>
        </div>
          { 
            isLoading? <Typography variant="medium" color="blue-gray" className="text-center mb-2 font-medium">Clossing Lottery...</Typography> : <p></p>
          }
          { 
            data? <Typography variant="medium" color="blue-gray" className="text-center mb-2 font-medium">{data}</Typography> : <p></p>
          }
          
      </div>
    )
    
  }


 async function closeLottery(contract, signer, setLoading, setData) {
  try{
    setLoading(true);
    const tx = await contract.connect(signer).closeLottery();
    const receipt = await tx.wait();
    setLoading(false);
    console.log(`Bets closed (${receipt.transactionHash})\n`);
    setData(`Bets closed (${receipt.transactionHash})\n`)
  } catch(error){
    setData(error.reason);
    setLoading(false);
  }
  
}
   
 


 