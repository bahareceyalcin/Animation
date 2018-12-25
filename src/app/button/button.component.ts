import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() label: string;
  @Output() onClick = new EventEmitter<any>();
  
  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
  } 
  onClickButton() { 
    console.log(this.label);
    this.router.navigate([this.label]);

    }

}
