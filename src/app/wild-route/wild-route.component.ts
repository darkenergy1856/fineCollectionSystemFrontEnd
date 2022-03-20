import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wild-route',
  templateUrl: './wild-route.component.html',
  styleUrls: ['./wild-route.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WildRouteComponent implements OnInit {

  constructor(public router : Router) { }

  ngOnInit(): void {
    document.body.className = "selector";
  }

}
