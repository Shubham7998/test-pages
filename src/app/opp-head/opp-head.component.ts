import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-opp-head',
  templateUrl: './opp-head.component.html',
  styleUrls: ['./opp-head.component.scss']
})
export class OppHeadComponent implements OnInit {

  
  constructor(private route :ActivatedRoute) { }

  ngOnInit(): void {

  
  }

}