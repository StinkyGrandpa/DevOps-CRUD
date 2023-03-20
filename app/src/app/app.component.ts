import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
