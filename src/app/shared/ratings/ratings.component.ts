import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {

  @Input() score: number;
  stars: Array<number>;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.score);
    let roundedScore = Math.round(this.score);
    this.stars = new Array(roundedScore).fill(1);
  }

}
