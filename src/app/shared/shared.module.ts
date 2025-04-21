import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';

@NgModule({
  imports: [
    CommonModule,
    LoadingSpinnerComponent,
    ErrorMessageComponent
  ],
  exports: [
    LoadingSpinnerComponent,
    ErrorMessageComponent
  ]
})
export class SharedModule { }