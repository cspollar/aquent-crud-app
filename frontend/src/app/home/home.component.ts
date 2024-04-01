import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [MatGridListModule],
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  tiles: Tile[] = [
    {cols: 3, rows: 2, color: 'lightblue'},
    {cols: 1, rows: 4, color: 'lightgreen'},
    {cols: 1, rows: 2, color: 'lightpink'},
    {cols: 2, rows: 2, color: 'mistyrose'},
  ];
}