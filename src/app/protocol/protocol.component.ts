import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.css']
})
export class ProtocolComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }
  resizeTab(){
    console.log("asdad");
    var elem = document.getElementById("contents");
    elem.style.width="33%";  
    var btn = document.getElementById("btn");
  

  }
}