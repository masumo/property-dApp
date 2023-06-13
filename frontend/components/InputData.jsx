import * as React from 'react';
import Router, { useRouter } from "next/router";
import {ethers, Contract} from 'ethers';
import { useSigner } from 'wagmi';
import * as lotteryJson from '../abi/Lottery.json';
import * as tokenJson from '../abi/LotteryToken.json';
import { Button, Typography, Input } from '@material-tailwind/react';

export function InputData() {
  const [data, setData] = React.useState(null);
	const [isLoading, setLoading] = React.useState(false);
  //const [errorReason, setError] = React.useState(null);
  const router = useRouter();
  const { data:signer} = useSigner();

  let etherscanApi = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
  let lotteryAddress = process.env.NEXT_PUBLIC_LOTTERY_ADDRESS;
  let tokenAddress = process.env.NEXT_PUBLIC_TOKEN_ADDRESS;
  let testnet = process.env.NEXT_PUBLIC_TESTNET;

  
   const provider = new ethers.providers.EtherscanProvider(testnet, etherscanApi);
   const lotteryContract = new Contract(lotteryAddress, lotteryJson.abi, provider);
   const tokenContract = new Contract(tokenAddress, tokenJson.abi, provider);

   async function handleSubmit(e) {
    if(signer){
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      let amount = formData.get('amount');
        
      await bet(amount, signer, tokenContract, lotteryContract, setData, setLoading);
    }else{
      alert("Please connect to a wallet");
      e.preventDefault();
    }

    
}

    return (
      <div  >
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:flex sm:justify-center" method="post" onSubmit={handleSubmit}>
              <div className="flex flex-row gap-6">
                  <div>
                      <Typography
                      variant="medium"
                      color="blue-gray"
                      className="mb-4 font-medium"
                        >
                          Property Address :
                      </Typography>
                      <div className="mb-4 flex flex-col gap-6">
                        <Input label ="Number:" name="number" />
                        <Input label ="Street:" name="street" />
                        <Input label ="City:" name="city" />
                        <Input label ="State:" name="state" />
                        <Input label ="Zip:" name="zip" />
                        <Input label ="Country:" name="country" />
                      </div>
                  </div>
                  <div>
                      <Typography
                      variant="medium"
                      color="blue-gray"
                      className="mb-4 font-medium"
                        >
                          Property Data :
                      </Typography>
                      <div className="mb-4 flex flex-col gap-6">
                        <Input label ="Name:" name="name" />
                        <Input label ="Description:" name="description" />
                        <Input label ="Status:" name="propertyStatus" />
                        <Input label ="Type:" name="propertyType" />
                        <Input label ="Land Size:" name="landSize" />
                        <Input label ="Price per sq.ft:" name="pricePerSqft" />
                        <Input label ="Bedrooms:" name="bedrooms" />
                        <Input label ="Bathrooms:" name="bathrooms" />
                        <Input label ="Year Built:" name="yearBuilt" />
                        <Input label ="Last sold price:" name="lastSoldPrice" />
                        <Input label ="Last sold date:" name="lastSoldDate" />
                      </div>
                      <Button className="mt-6" fullWidth type="submit">Save</Button>
                  </div>
                  <div>
                      <Typography
                      variant="medium"
                      color="blue-gray"
                      className="mb-4 font-medium"
                        >
                          Property Owner :
                      </Typography>
                      <div className="mb-4 flex flex-col gap-6">
                        <Input label ="Name:" name="name" />
                        <Input label ="Email:" name="email" />
                        <Input label ="Phone:" name="phone" />
                      </div>
                  </div>
              </div>
              
              
              
          </form>
          { 
            isLoading? <p>Betting is in progress...</p> : <p></p>
          }
          { 
            data? <p>{data}</p> : <p></p>
          }
          
      </div>
    )
    
  }

  

  async function bet(amount, signer, token, contract, setData, setLoading) {
    setLoading = true;
    const allowTx = await token
      .connect(signer)
      .approve(contract.address, ethers.constants.MaxUint256);
    await allowTx.wait();
    const tx = await contract.connect(signer).betMany(amount);
    const receipt = await tx.wait();
    console.log(`Bets placed (${receipt.transactionHash})\n`);
    let output = `Bets placed (${receipt.transactionHash})\n`;
    setData = output;
    setLoading = false;
  }
   
 


 