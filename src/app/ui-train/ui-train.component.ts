import { Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../services/provider.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-ui-train',
  templateUrl: './ui-train.component.html',
  styleUrls: ['./ui-train.component.scss']
})
export class UiTrainComponent implements OnInit {
  public isDark: boolean = false

  constructor(private provider: ProviderService, private router: Router) { }

  ngOnInit(): void {

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
        console.error(err);
      }
    );


  }

}
