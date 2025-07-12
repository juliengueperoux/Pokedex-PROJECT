import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-preview-card',
    templateUrl: './preview-card.component.html',
    styleUrls: ['./preview-card.component.css'],
    standalone: false
})
export class PreviewCardComponent implements OnInit {
  @Input() name: string;
  @Input() id: number;
  @Input() types: string[];
  @Input() image: string;

  constructor() { }

  ngOnInit() {
  }

}
