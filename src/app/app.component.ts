import {Component, Input, OnInit, ChangeDetectorRef} from '@angular/core';

import {PrimeNGConfig} from 'primeng/api';

import {Web3Service} from './web3.service';

declare let require: any;

const COIN_FLIP_ARTIFACTS = require('../contract/CoinFlip.json');

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
	public amount: string;

	public borderColor: string;

	public contract: any;

	public heads: boolean;

	@Input() public result: string;

	public title = 'coin-flip-web-app';

	public constructor(
		private primengConfig: PrimeNGConfig,
		private web3Service: Web3Service,
		private cdr: ChangeDetectorRef)
	{
	}

	public ngOnInit(): void
	{
		this.primengConfig.ripple = true;

		this.result = '';
		this.borderColor = '#1976d2';

		this.web3Service.createContract(COIN_FLIP_ARTIFACTS).then((inContract) =>
		{
			inContract.deployed().then(inDeployedContract =>
			{
				console.log(inDeployedContract);
				this.contract = inDeployedContract;

				this.contract.betResults({}, (inError, inEvent) =>
				{
					console.log('betResults event - Results: ' + inEvent.args.userAddress + ' ' + inEvent.args.wonFlag);
					if (inEvent.args.wonFlag)
					{
						this.borderColor = '#00CC00';
						this.result = 'Won + ' + this.amount;
					}
					else
					{
						this.borderColor = '#CC6600';
						this.result = 'Lost - ' + this.amount;
					}

					this.cdr.detectChanges();
				});

				this.contract.errorMessage({}, (inError, inEvent) =>
				{
					console.log('Contract Error Message: ' + inEvent.args.message);
				});
			});
		});
	}

	public play(): void
	{
		console.log('Clicked');
		const theSendData = {
			from: this.web3Service.accounts[0],
			value: this.web3Service.web3.utils.toWei(this.amount, 'ether'),
			gas: '250000'
		};

		console.log('Bet - From: ' + theSendData.from + ' Value: ' + theSendData.value);
		this.contract.bet.sendTransaction(this.heads, theSendData).then((inData) =>
		{
		});
	}
}
