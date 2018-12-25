import { Component,  ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventEmitter } from 'events';
import { ButtonComponent } from './button/button.component';
import { TabsComponent } from './tabs-component/tabs.component';
import { trigger, transition, style, animate } from '@angular/animations';

 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'animation-app';  
  @ViewChild(TabsComponent) tabsComponent;

  constructor(private router: Router, private route: ActivatedRoute) { }
  
  // label = "button label"


  functioncall(event) {
    console.log('functioncall', event);
  }

  onOpenedTab(tab){
     this.router.navigate([tab.link]);
  }

  createTab(event){
    console.log(event.target.attributes);
    this.tabsComponent.openTab(
      event.target.innerHTML,
      event.target.attributes[1].textContent,
      true,
      false,
    );

    // var btn=document.createElement('button');
    // document.getElementById("tabs").appendChild(btn);
    // btn.style.backgroundColor='#fff';
    // btn.style.width='90px';
    // btn.style.height='50px';
    // btn.style.borderRadius='5px';
    // btn.style.margin='10px';
    
    // // var element = document.getElementById(clicked_id);
    // // console.log(clicked_id);
    // // var txt = element.textContent || element.innerText;
    // // console.log(txt+"dfefs");
    // // btn.textContent = txt;
    // var target = event.target || event.srcElement || event.currentTarget;
    // var idAttr = target.attributes.value;
    // var idAttribute = target.attributes.id;
    // var value = idAttr.nodeValue;
    // btn.textContent=value;
    // btn.onclick =function () {

    //   // var d1 = document.getElementById('tabs');
    //   // d1.insertAdjacentHTML('beforeend', "<a href=['/credit']></a>"); 

    // }
  }
}








