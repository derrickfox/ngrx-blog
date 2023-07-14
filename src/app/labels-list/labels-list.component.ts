import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-labels-list',
  templateUrl: './labels-list.component.html',
  styleUrls: ['./labels-list.component.sass']
})
export class LabelsListComponent implements OnInit {
  onChipEnd($event: Event) {
    throw new Error('Method not implemented.');
  }

  @Input() labels!: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
