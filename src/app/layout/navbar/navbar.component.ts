import { Component, OnInit } from '@angular/core';
export interface UserInfoDto {
  id: number;

  username: string;

  avatar: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  categories: string[] = [];

  profile!: UserInfoDto | null;

  constructor() {}

  ngOnInit(): void {

    // this.categoriesService.getCategories().subscribe({
    //   next: (res) => {
    //     this.categories = res.data;
    //   },
    // });

    // this.userService.getProfile().subscribe({
    //   next: (res) => {
    //     this.profile = res.data;
    //   },
    // });

  }

  logout(): void {
    // window.localStorage.clear();
    // this.router.navigateByUrl('login');
  }

  deleteAccount(): void {
    // this.userService.deleteUser().subscribe({
    //   next: (res) => {
    //     alert(res.message);
    //   },
    // });
  }

}
