import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
import { CheckState } from "./CheckState";
import { OpenBets } from "./OpenBets";
import { DisplayBalance } from "./DisplayBalance";
import { DisplayTokenBalance } from "./DisplayTokenBalance";
import { InputData } from "./InputData";
import { BuyTokens } from "./BuyTokens";
import { CloseLottery } from "./CloseLottery";
import { ClaimPrize } from "./ClaimPrize";
import { BurnToken } from "./BurnToken";

import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel, Typography,
  } from "@material-tailwind/react";

export default function InstructionsComponent() {
	const router = useRouter();
	return (
		<>
				<header>
					<Typography variant="h1">Property dApp</Typography>
				</header>
				<div className="w-4/6 h-fit block">
					<PageBody></PageBody>
				</div>
				<footer  className="fixed inset-x-0 bottom-0 bg-neutral-900 text-center ">
					Group 1 Cohort 2 Encode Solidity Bootcamp April 2023
				</footer>
		</>
	);
}

function PageBody(){
	return(
		
		<Tabs value="html">
			<TabsHeader>
				<Tab key="search" value="search">
					Search
				</Tab>
				<Tab key="create" value="create">
					Input Data
				</Tab>
				<Tab key="balance" value="balance">
					Balance
				</Tab>
				<Tab key="buy" value="buy">
					Deposit
				</Tab>
				<Tab key="burn" value="burn">
					Withdraw
				</Tab>
			</TabsHeader>
			<TabsBody>
				<TabPanel key="search" value="search">
					<div className="flex flex-col items-center justify-center gap-4">
						<CheckState/>
						<OpenBets/>
					</div>
				</TabPanel>
				<TabPanel key="balance" value="balance">
					<div className="flex flex-col items-center justify-center gap-4">
						<DisplayBalance/>
						<DisplayTokenBalance/>
					</div>
				</TabPanel>
				<TabPanel key="buy" value="buy">
					<div className="flex flex-col items-center justify-center gap-4">
						<BuyTokens/>
					</div>
				</TabPanel>
				<TabPanel key="burn" value="burn">
					<div className="flex flex-col items-center justify-center gap-4">
						<DisplayBalance/>
						<DisplayTokenBalance/>
						<BurnToken/>
					</div>
				</TabPanel>
				<TabPanel key="create" value="create">
					<div className="flex flex-col items-center justify-center gap-4">
						<InputData/>
					</div>
				</TabPanel>
			</TabsBody>
		</Tabs>
		
	)
}


