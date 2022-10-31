import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ColorContrastPipe } from './color-contrast.pipe';

@NgModule({
  declarations: [AppComponent, ColorContrastPipe],
  imports: [BrowserModule, ColorPickerModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
