import * as React from 'react';
import Router, { useRouter } from "next/router";
import {ethers, Contract} from 'ethers';
import { useSigner } from 'wagmi';
import { Button, Typography } from '@material-tailwind/react';


export function DisplayBalance() {
  const [data, setData] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);
  //const [errorReason, setError] = React.useState(null);
  const { data:signer} = useSigner();
  const router = useRouter();

  let etherscanApi = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
  let testnet = process.env.NEXT_PUBLIC_TESTNET;
  const provider = new ethers.providers.EtherscanProvider(testnet, etherscanApi); 
  return (
    <div className="mt-2 w-80 max-w-screen-lg sm:w-96">
      <div className="flex justify-center">
      <Button className="mb-2" onClick={async () => await displayBalance(signer, provider, setLoading, setData)}>
        Display Balance
      </Button>
      </div>
        { 
          isLoading? <Typography variant="medium" color="blue-gray" className="text-center mb-2 font-medium">Checking the Account Balance...</Typography> : <p></p>
        }
        { 
          data? <Typography variant="medium" color="blue-gray" className="text-center mb-2 font-medium">{data}</Typography> : <p></p>
        }
        
    </div>
  )
    
  }

  async function displayBalance(signer, provider, setLoading, setData) {
    setLoading(true)
    const balanceBN = await provider.getBalance(
        signer._address
      );
    setLoading(false)
    const balance = ethers.utils.formatEther(balanceBN);
    console.log(
    `The account of address ${
        signer._address
    } has ${balance} ETH\n`
    );
    let output = `The account of address ${
        signer._address
    } has ${balance} ETH\n`
    setData(output)
  }
   
 


 