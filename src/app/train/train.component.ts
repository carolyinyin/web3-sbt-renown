import { ProviderService } from './../services/provider.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MembershipTokenContract, RatingTokenContract } from '../models';
import { ChartConfiguration } from 'chart.js';
import { TeamsAddress, TeamsShortInfo } from '../models/info';
import { take } from 'rxjs';
import { ModelType } from '../shared/components/mdialog/mdialog.component';
import { BaseChartDirective } from 'ng2-charts';

export enum MaskAddress {
  MBT = '0x4ECcf0ABd662f5B1740Ac1626fF6E3653d769FDC', //Poju's Ver1 contract
  Creator = '0x5A11E4A7f2bFDf2FE2cD18e13ec5d36636cde80C', // 合約創建者
  Voter = '0x176114e002c7E685a231085e95c1Ce6B3988F794', //社團成員
  // Voter = '0xbd7Ba44A2f7827A6115083bdC4d6800bC6d8d08a', //社團成員-2
  TeamManager_14 = '0x494D693aa4184724F04d07fA6a018cA17Fcb5910', //小組14-管理員

}

export enum ICharacter {
  組織 = 'club',
  投票者 = 'issuer',
  候選人 = 'recipient',
  訪客 = 'nobody'
}

export enum EStep {
  個人資訊 = 'INFO',
  投票 = 'VOTE',
  排名 = 'RANK'
}

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss']
})
export class TrainComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public setScore = 0
  public teamsinfo = TeamsShortInfo
  public teamsAddress = TeamsAddress

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: '分數' , backgroundColor: '#4B72B4', hoverBackgroundColor: '#253C62', borderColor: '#253C62'},
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    // animation: false,
    maintainAspectRatio: false,
    indexAxis: 'y',
    responsive: false,
    plugins: {
      legend: {

      }
    }
  };

  public step = "INFO";
  public showPanel: boolean = false

  public character: ICharacter = ICharacter.組織;
  public isMember: boolean = true;

  public displayedColumns: string[] = ['index', 'issuer', 'recipient', 'score', 'comment', 'timestamp'];
  public dataSource: any = [];

  constructor(public provider: ProviderService, private ref: ChangeDetectorRef) {
    // 圖表組別
    Object.entries(this.teamsinfo).forEach(value => {
      this.barChartData.labels?.push(value[1].no)
    });

    // 取得登入帳號
    this.provider.getAccount().pipe(
      take(1)
    ).subscribe(async accounts => {
      this.provider.defaultAccount = accounts[0];
      console.log('初始登入帳號=',accounts[0])
    });

  }

  async ngOnInit(): Promise<void> {
    // 取得MBT合約內容
     this.provider._MembershipTokenContract = await this.provider.getResume(MembershipTokenContract.abi, MembershipTokenContract.address)
    // 取得RT合約內容
    this.provider._RatingTokenContract = await this.provider.getResume(RatingTokenContract.abi, RatingTokenContract.address)

    console.log('取得MBT合約內容=', this.provider._MembershipTokenContract)
    console.log('取得RT合約內容=', this.provider._RatingTokenContract)
  }


  public async changePanel(step: string){

    switch(step){
      case EStep.個人資訊:

      break;
      case EStep.投票:
        await this.provider._MembershipTokenContract.methods.isMember(this.provider.defaultAccount)
        .call().then((result: any) => {
          console.log(`${this.provider.defaultAccount} isMember = ${result}`)
          this.isMember = result
        });
      break;
      case EStep.排名:
        const mockdata = [10, 25, 30, 60, 75, 50, 30, 50, 35, 45, 15, 20, 40, 30]
        this.barChartData.datasets[0].data = mockdata

        await this.teamsAddress.forEach((address: any, index: number) => {
          if(address){
            console.log(`第${index+1}組 錢包地址 = ${address}`)

            this.provider._RatingTokenContract.methods.getRatings(address)
            .call({
              from: MaskAddress.TeamManager_14
            }).then((ratings: any) => {
              if(ratings.length > 0){
                console.log(`第${index+1}組: 投票紀錄 = ${ratings}`)
                ratings.forEach((val: any, round: number) => {
                  // const issuer    = val[0]
                  const recipient = val[1]
                  // const comment   = val[2]
                  const score     = Number(val[3])
                  // const timestamp = val[4]

                  // 如果接收地址 與 地址相同
                  if(recipient === address){
                    // 圖表資料更新
                    console.log(`第${index+1}組: 第${round+1}筆紀錄 old = ${this.barChartData.datasets[0].data[index]}`)
                    this.barChartData.datasets[0].data[index] += score
                    console.log(`第${index+1}組: 第${round+1}筆紀錄 new = ${this.barChartData.datasets[0].data[index]}`)
                    this.chart?.update();
                  }
                });
              }else{
                console.log(`第${index+1}組: 無相關投票紀錄`)
              }
            });
          }else{
            console.log(`第${index+1}組: 未參與`)
          }
        });
      break;
    }

    this.step = step;
  }

  public exectVote(target: number){
    this.provider.openDialog(target.toString(), ModelType.投票表單)
  }

}
