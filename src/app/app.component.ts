import { Component } from '@angular/core';
import chroma from 'chroma-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  colorPicker = '#2c3f75';
  colors: string[] = [];
  materials: string[] = [
    '#ff0000',
    '#ffa500',
    '#ffff00',
    '#33cc00',
    '#008ae5',
    '#4b0082',
    '#ee82ee',
    '#555555',
    '#ffffff',
    '#000000',
  ];

  onChoose(color: string): void {
    this.colors.push(color);
  }

  onChangePicker(color: string) {
    this.colors.push(color);
  }

  mix(): void {
    if (this.colors.length < 2) return;
    let source = this.colors[0];
    for (let i = 1; i < this.colors.length; i++) {
      source = chroma
        .scale([this.removeSharp(source), this.removeSharp(this.colors[i])])(0.5)
        .hex();
    }

    this.colors = [source];
  }

  reset(): void {
    this.colors = [];
  }

  removeSharp(s: string): string {
    return s.replace('#', '');
  }
}
