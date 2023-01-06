
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, from } from 'rxjs';
import { delay } from 'rxjs/operators';
import Web3 from 'web3';
import { TransactionParameter } from '../models';
import { MDialogComponent, ModelType } from '../shared/components/mdialog/mdialog.component';
import { HttpClient } from '@angular/common/http';
import { RTRateRequest } from '../models/IRT';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
    private web3: any = null;
    private accountList: Array<string> = [];
    public _MembershipTokenContract: any;
    public _RatingTokenContract: any;
    public isPending = false;
    public isConfirmed = false;
    public isError = false;
    public errorMessage = '';
    public loading = false;

    constructor(public dialog: MatDialog, private http: HttpClient) {
      this.web3 = typeof window.web3 !== 'undefined' ? new Web3(window.ethereum)
      : new Web3(new Web3.providers.HttpProvider('https://goerli.etherscan.io/'));

      window.web3 = this.web3;

      console.log('window.web3=',window.web3)
    }

    public openDialog(message: string, modelType: string = ''){
      this.dialog.open(MDialogComponent, {
        data: {
          type: modelType,
          info: message,
        },
        width: '50%'
      });
    }

    public set defaultAccount(account: string) {
      this.web3.eth.defaultAccount = account;
    }

    public get defaultAccount(): string {
        return this.web3.eth.defaultAccount;
    }

    public get accounts(): Array<string> {
        return this.accountList;
    }

    public enableConnect(): Observable<any> {
        if(!window.web3) this.openDialog('尚未找到您的虛擬錢包')
        try {
          const enabled$ = from(this.web3.currentProvider.enable())
          return from(enabled$);
        } catch (error) {
          this.openDialog('尚未找到您的虛擬錢包')
          return from('');
        }
    }

    public getAccount(): Observable<any> {
        return from(this.web3.eth.getAccounts());
    }

    public getBlock(index: number): Observable<any> {
        return from(this.web3.eth.getBlock(index));
    }

    public getCurrentBlockNumber(): Observable<any> {
      return from(this.web3.eth.getBlockNumber());
  }

    public getTransaction(txHash: string): Observable<any> {
        return from(this.web3.eth.getTransaction(txHash));
    }

    public getReceipt(txHash: string): Observable<any> {
        return from(this.web3.eth.getTransactionReceipt(txHash));
    }

    public sendTransaction(params: TransactionParameter): Observable<any> {
        return from(this.web3.eth.sendTransaction(params));
    }

    // public deployResume(info: ResumeInitialOptions): Observable<any> {
    //     const strLib = TruffleContract(StrLibContract);
    //     const resume = TruffleContract(ResumeContract);
    //     strLib.setProvider(this.web3.currentProvider);
    //     resume.setProvider(this.web3.currentProvider);
    //     resume.setNetwork(this.web3.currentProvider.networkVersion);
    //     return from(strLib.new({ from: this.defaultAccount })).pipe(
    //         mergeMap((instance: any) => {
    //             resume.link('StrLib', instance.address);
    //             return resume.new(info.name, info.address, info.age, info.gender, { from: this.defaultAccount });
    //         }),
    //         take(1)
    //     );
    // }

    public getResume(abi: any, address: string): any {
        return new this.web3.eth.Contract(abi, address);
    }

    public getBalance(address: string): Observable<any> {
      return from(this.web3.eth.getBalance(address));
    }

    public executeMethod(method: any): Observable<any> {
        return from(method);
    }


    public executeMethod_Rate(payload: RTRateRequest): Observable<any>{
      // 測試
      // const jsondata: string = '../../assets/data/response-rate-success.json';
      // return this.http.get(jsondata).pipe(delay(1000))

      // 正式
      return this.executeMethod(
        this._RatingTokenContract.methods
        .rate(payload._recipient,payload._comment,payload._score,payload._timestamp)
        .send({ from: this.defaultAccount })
      )
    }

    public transactionConfirmed(): void {
      this.isPending = false;
      this.isConfirmed = true;
    }

    public transactionError(err?: any): void {
      this.isPending = false;
      this.isError = true;
      if (err) {
        console.log('transactionError=', err)
        this.errorMessage = err;
        switch(err.code) {
          case 4100:
            this.openDialog('請確認錢包已選擇正確帳號', ModelType.一般)
            break
          case 4001:
            this.openDialog('您拒絕了此次的交易', ModelType.一般)
            break
          case '':
            break
          default:
            this.openDialog('系統異常，請回報管理員或確認錢包狀態再次嘗試。', ModelType.一般)
            break
        }
      }
    }

    public resetConfirmState(): void {
      this.isConfirmed = false;
    }

    public resetErrorState(): void {
      this.isError = false;
      this.errorMessage = '';
    }

}
function resolve(arg0: boolean) {
  throw new Error('Function not implemented.');
}

