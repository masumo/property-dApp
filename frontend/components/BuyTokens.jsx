import * as React from 'react';
import Router, { useRouter } from "next/router";
import {ethers, Contract} from 'ethers';
import { useSigner } from 'wagmi';
import * as lotteryJson from '../abi/Lottery.json';
import { Button, Typography, Input} from '@material-tailwind/react';

export function BuyTokens() {
  const [data, setData] = React.useState(null);
	const [isLoading, setLoading] = React.useState(false);
  const { data:signer} = useSigner();
  const router = useRouter();

  let etherscanApi = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
  let lotteryAddress = process.env.NEXT_PUBLIC_LOTTERY_ADDRESS;
  let tokenRatio = process.env.NEXT_PUBLIC_TOKEN_RATIO;
  let testnet = process.env.NEXT_PUBLIC_TESTNET;

  
   const provider = new ethers.providers.EtherscanProvider(testnet, etherscanApi);
   const lotteryContract = new Contract(lotteryAddress, lotteryJson.abi, provider);

   async function handleSubmit(e) {
    if(signer){
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      let tokens = formData.get('tokens');
      await buyTokens(tokens, signer, lotteryContract, tokenRatio, setData, setLoading);
      
      
    }else{
      alert("Please connect to a wallet");
      e.preventDefault();
    }
}

    return (
      <div>
        {/* <h2>Buy Tokens</h2> */}
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" method="post" onSubmit={handleSubmit}>
              <Typography
                  variant="medium"
                  color="blue-gray"
                  className="mb-4 font-medium"
                  >
                  Enter the amount of token:
              </Typography>
              <div className="mb-4 flex flex-col gap-6">
                <Input label ="Amount:" name="tokens" />
              </div>
              <Button className="mt-6" fullWidth type="submit">Buy Tokens</Button>
          </form>
          { 
            isLoading? <p>Buying Tokens...</p> : <p></p>
          }
          { 
            data? <p>{data}</p> : <p></p>
          }
          
      </div>
    )
    
  }

  async function buyTokens(tokens, signer, contract, tokenRatio, setData, setLoading) {
    setLoading(true);
    try {
        const tx = await contract.connect(signer).purchaseTokens({
            value: ethers.utils.parseEther(tokens).div(tokenRatio),
          });
          const receipt = await tx.wait();
          setLoading(false);
          console.log(`Tokens bought (${receipt.transactionHash})\n`);
          setData(`Tokens bought (${receipt.transactionHash})\n`);
        
    } catch (error) {
        setData(error.data.message);
        console.log(`ERROR IS ${error.data.message}`);
        setLoading(false);
    }
  }
   
 


 