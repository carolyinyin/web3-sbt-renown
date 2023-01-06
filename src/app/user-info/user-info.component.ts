import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TesttingService } from '../services/testting.service';
import { Subject, take } from 'rxjs';
import { MembershipTokenContract, RatingTokenContract } from '../models';
import { ProviderService } from '../services/provider.service';
import { Web3Utils } from '../utils';
import { MatDialog } from '@angular/material/dialog';
import { MDialogComponent } from '../shared/components/mdialog/mdialog.component';

export enum _identity {
  Student = 'Student'
}
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnDestroy {

  membershipContractControl = new FormControl('');
  fontStyle?: string;
  public accounts?: string;
  public balance?: string;
  private destory$ = new Subject();
  public errorMessage?: any
  public memberInfo: any = {
    identity:'',
    timestamp:'',
    isMember:''
  };
  private _MembershipTokenContract: any;


  constructor(
    private provider: ProviderService,
    public dialog: MatDialog) {

    // 取得登入者地址
    // this.provider.getAccount().pipe(take(1))
    // .subscribe(accounts => {
    //   this.accounts = accounts;
    // },(err)=>{
    //   console.log('getAccount err=', err)
    // });

    // // 取得MBT合約內容
    // this.provider._MembershipTokenContract = this.provider.getResume(MembershipTokenContract.abi, MembershipTokenContract.address)
    // console.log('_MembershipTokenContract =', this.provider._MembershipTokenContract)

    // this.provider.defaultAccount = MaskAddress.Voter

  }

  ngOnInit(): void {

  }

  sendToService(){

  }

  openDialog() {
    this.dialog.open(MDialogComponent, {
      data: {
        animal: 'panda',
      },
    });
  }

  reset(){
    this.memberInfo = {
      identity:'',
      timestamp:'',
      isMember:''
    };
  }

  ngOnDestroy(): void {
    this.destory$.next(null)
  }

}

