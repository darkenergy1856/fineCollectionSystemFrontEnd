import { Component, OnInit } from '@angular/core';
import { PublicAccessService } from '../Services/public-access.service';

@Component({
  selector: 'app-public-access',
  templateUrl: './public-access.component.html',
  styleUrls: ['./public-access.component.css']
})
export class PublicAccessComponent implements OnInit {

  constructor(private publicAccess : PublicAccessService) { }

  ngOnInit(): void {
  }

}
