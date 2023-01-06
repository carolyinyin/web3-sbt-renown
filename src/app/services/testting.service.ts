import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TesttingService {
  public aaa?: string;
  constructor() {
    console.log('TesttingService constructor()')
  }
}
