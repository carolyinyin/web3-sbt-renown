import { Component } from '@angular/core';
import { ProviderService } from './services/provider.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private provider: ProviderService) {}
}
