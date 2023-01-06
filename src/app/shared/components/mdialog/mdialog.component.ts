import { ProviderService } from './../../../services/provider.service';
import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamsAddress } from 'src/app/models/info';
import { take, mergeMap, finalize, delay } from 'rxjs/operators';

export interface DialogData {
  type: string;
  info: string;
}
export enum ModelType {
  登入 = 'login',
  一般 = 'normal',
  投票表單 = 'vote-form'
}

@Component({
  selector: 'app-mdialog',
  templateUrl: './mdialog.component.html',
  styleUrls: ['./mdialog.component.scss']
})
export class MDialogComponent implements OnInit {
  public loading = false;
  public isConfirm = false;
  public teamsAddress = TeamsAddress;
  public setScore: string = '';

  constructor(public dialogRef: DialogRef, @Inject(MAT_DIALOG_DATA) public data: DialogData, public provider : ProviderService) {}

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close()
  }

  // 確認投票
  public async exectVoteConfirm(target: string){
    this.isConfirm = false
    this.loading = true

    try {
      const payload = {
        _recipient: this.teamsAddress[Number(target)-1],
        _comment:"good",
        _score: this.setScore,
        _timestamp: Date.now()
      }
      console.log('exectVote payload=', payload)

      this.provider.executeMethod_Rate(payload)
      .pipe(
        take(1),
        finalize(()=>{
          this.loading = false
        })
      )
      .subscribe(
        receipt => {
            console.log('投票完成 資訊 =',receipt)
            this.isConfirm = true
            this.provider.transactionConfirmed();

        },
        err => {
            console.log('err=',err)
            this.close()
            this.provider.transactionError(err);
        }
      );

    } catch (error: any) {
      console.log('exectVoteConfirm errro=', error)
      this.data.info = /invalid address/g.test(error) ? '該組別地址尚未申請，無法投票。' : '操作失敗，請稍後再試。'
      this.data.type = ModelType.一般
    }


  }


}
