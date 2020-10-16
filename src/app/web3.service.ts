import {Injectable} from '@angular/core';
import Web3 from 'web3';

declare let require: any;
declare let window: any;

const TRUFFLE_CONTRACT = require('@truffle/contract');

@Injectable({
	providedIn: 'root'
})
export class Web3Service
{
	public accounts: string[];

	public web3: any;

	public constructor()
	{
		if (typeof window.ethereum !== 'undefined')
		{
			window.ethereum.request({method: 'eth_requestAccounts'}).then((inAccounts) =>
			{
				console.log('Accounts: ' + inAccounts);
				this.web3 = new Web3(window.ethereum);
				this.accounts = inAccounts;
			});
		}
		else
		{
			console.log('No web3? You should consider trying MetaMask!');
		}
	}

	public async createContract(inContractArtifacts): Promise<any>
	{
		let theContract;

		while (!this.web3)
		{
			const theDelay = new Promise(resolve => setTimeout(resolve, 100));
			await theDelay;
		}

		theContract = TRUFFLE_CONTRACT(inContractArtifacts);
		theContract.setProvider(this.web3.currentProvider);

		return (theContract);
	}
}
