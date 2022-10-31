import { Component } from '@angular/core';
import chroma from 'chroma-js';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

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
    '#ff00ab',
    '#00edff',
    '#555555',
    '#ffffff',
    '#000000',
  ];

  onChoose(color: string): void {
    this.colors.push(color);
    this.playSound();
  }

  onChangePicker(color: string) {
    this.colors.push(color);
    this.playSound();
  }

  playSound(): void {
    try {
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      gain.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.5);
      gain.connect(audioContext.destination);

      oscillator.connect(gain);
      oscillator.type = this.type;
      oscillator.start(0);
    } catch (e) {
      console.error(e);
    }
  }

  get type(): OscillatorType {
    const types = ['sawtooth', 'sine', 'square', 'triangle'];
    const index = Math.floor(Math.random() * types.length);
    return types[index] as OscillatorType;
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

  drop(event: CdkDragDrop<string[]>): void {
    this.colors.splice(event.currentIndex, 1);
  }
}
