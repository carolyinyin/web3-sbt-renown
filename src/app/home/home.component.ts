import { ModelType } from './../shared/components/mdialog/mdialog.component';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MembershipTokenContract } from '../models';
import { ProviderService } from '../services/provider.service';
import { _identity } from '../user-info/user-info.component';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons/faTwitterSquare';
import { faPinterest } from '@fortawesome/free-brands-svg-icons/faPinterest';
import { MaskAddress } from '../train/train.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isDark: boolean = false
  membershipContractControl = new FormControl('');
  fontStyle?: string;
  public accounts?: string;
  public balance?: string;
  public errorMessage?: any
  public memberInfo: any = {
    identity:'',
    timestamp:'',
    isMember:''
  };
  private _MembershipTokenContract: any;
  public panel: string = 'About' //Profile

// ==========================
// 1. 處理無法引用contract 問題
// ==========================

// ====================

// ====================

// ====================
  constructor(private provider: ProviderService, private router: Router) {

    // 取得登入者地址
    this.provider.getAccount().pipe(take(1))
    .subscribe(accounts => {
      this.accounts = accounts;
    },(err)=>{
      console.log('getAccount err=', err)
      this.provider.openDialog('錢包地址取得失敗', ModelType.登入)
    });

    // 取得MBT合約內容
    this.provider._MembershipTokenContract = this.provider.getResume(MembershipTokenContract.abi, MembershipTokenContract.address)
    // console.log('_MembershipTokenContract =', this.provider._MembershipTokenContract)

    // this.provider.defaultAccount = MaskAddress.Voter

  }

  ngOnInit(): void {
  }

  public membershipContractAction(action: any, address: string = ''){
    // console.log('this.provider.defaultAccount=',this.provider.defaultAccount)

    switch(action){
      case 'mint':
        const payload1 = {
          _member: MaskAddress.Voter,
          _identity:_identity.Student,
          _timestamp:"1000000"
        }
        this.provider._MembershipTokenContract.methods.mint(payload1._member,payload1._identity,payload1._timestamp)
        .send({
          from: MaskAddress.Creator
        }).then((res: any) => {
          // {"blockHash":"0x06912c356eaccadc6ce3eb8526391e26b87c2ccf028640f1b45a65d5da4e0680","blockNumber":7993845,"contractAddress":null,"cumulativeGasUsed":11690410,"effectiveGasPrice":69080633506,"from":"0x5a11e4a7f2bfdf2fe2cd18e13ec5d36636cde80c","gasUsed":54680,"logsBloom":"0x00000000040000000000000000000000000001000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000040000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":true,"to":"0x77de55c8666fdfbdda7553ebad0f8de4a54e1b01","transactionHash":"0xf197c3cab02a228aed498b89b3ad51e61a65e5fe6a096de12749b7b96ed242c8","transactionIndex":84,"type":"0x2","events":{"Mint":{"address":"0x77dE55C8666fdFBDDA7553eBad0f8de4a54e1B01","blockHash":"0x06912c356eaccadc6ce3eb8526391e26b87c2ccf028640f1b45a65d5da4e0680","blockNumber":7993845,"logIndex":101,"removed":false,"transactionHash":"0xf197c3cab02a228aed498b89b3ad51e61a65e5fe6a096de12749b7b96ed242c8","transactionIndex":84,"id":"log_dc3b9c80","returnValues":{"0":"0xbd7Ba44A2f7827A6115083bdC4d6800bC6d8d08a","_member":"0xbd7Ba44A2f7827A6115083bdC4d6800bC6d8d08a"},"event":"Mint","signature":"0x3c3284d117c92d0b1699230960384e794dcba184cc48ff114fe4fed20c9b0565","raw":{"data":"0x000000000000000000000000bd7ba44a2f7827a6115083bdc4d6800bc6d8d08a","topics":["0x3c3284d117c92d0b1699230960384e794dcba184cc48ff114fe4fed20c9b0565"]}}}}
          console.log('membershipContractAction mint res=', res)
        });
      break
      case 'getMember':
        console.log('getMember')
        const payload2 = {
          _member: MaskAddress.Voter
        }
        this.provider._MembershipTokenContract.methods.getMember(payload2._member)
        .call({
          from: MaskAddress.Creator
        }).then((res: any) => {
          // ["Student","1000000"]
          this.memberInfo.identity = res.identity
          this.memberInfo.timestamp = res.timestamp
          console.log('_MembershipTokenContract getMember() result=', res)
        });
      break
      case 'isMember':

      break
    }
  }

  getMask(){
    this.provider.enableConnect().pipe(take(1)).subscribe(
      res => {
        this.provider.defaultAccount = res[0] // 取得登入錢包地址
        // console.log('this.provider.defaultAccount=',this.provider.defaultAccount)

        if(res[0]){
          // 判斷是否為組織

          // 判斷是否有投票權

          // 判斷是否為得票人

          this.router.navigate(['/main'])
        }

      },
      err => {
        console.error('err=', err);
        if (err.code === -32002 || err.message === "Already processing eth_requestAccounts. Please wait."){
          this.provider.openDialog('請登入您的錢包', ModelType.登入)
        }

      }
    );


  }

}
