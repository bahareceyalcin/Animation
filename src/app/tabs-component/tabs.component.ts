import { Component, ContentChildren, QueryList, AfterContentInit, ViewChild, ComponentFactoryResolver, ViewContainerRef, EventEmitter, Output } from '@angular/core';

import { TabComponent } from './tab.component';
import {DynamicTabsDirective} from './dynamic-tabs.directive';

@Component({
  selector: 'app-tabs',
  template:`
    <ul class="nav nav-tabs" role="tablist">
      <li *ngFor="let tab of tabs" (click)="selectTab(tab)"  class="nav-item" >
        <a class="nav-link" [class.active]="tab.active" href="javascript:void(0);">{{tab.title}}</a>
      </li>
      <!-- dynamic tabs -->
      <li *ngFor="let tab of dynamicTabs" (click)="selectTab(tab)" class="nav-item">
        <a href="javascript:void(0);" class="nav-link" [class.active]="tab.active">{{tab.title}} <span class="tab-close" *ngIf="tab.isCloseable" (click)="closeTab(tab)" >x</span></a>
      </li>
    </ul>
    <ng-content></ng-content>
    <ng-template dynamic-tabs #container></ng-template>
  `,
  styles: [
    `
    ul{
      padding-top: 13px;
    }
    .tab-close {
      color: gray;
      text-align: right;
      cursor: pointer;
    }
    a{
      background-color: #fff;
      color: black;
      padding: 14px 25px;
      text-align: center;
      text-decoration: none;
      margin-right: 150px;
      border-radius: 5px;
      animation-fill-mode:forwards;
      animation-duration:0.5s;
      animation-name:slideright;
      display: inline-flex;
      margin-left: -120px;
    }
    @-webkit-keyframes slideright {
      0% {
          -webkit-transform: translateX(0);
          transform: translateX(0);
      }
  
      100% {
          -webkit-transform: translateX(100px);
          transform: translateX(100px);
      }
  }
  
  @keyframes slideright {
      0% {
          -webkit-transform: translateX(0);
          transform: translateX(0);
      }
  
      100% {
          -webkit-transform: translateX(100px);
          transform: translateX(100px);
      }
  }
  
    li{
      display: inline;
    }
    `
  ]
})
export class TabsComponent implements AfterContentInit {
  dynamicTabs: TabComponent[] = [];

  @Output() closedTab: EventEmitter<any> = new EventEmitter();
  @Output() openedTab: EventEmitter<any> = new EventEmitter();

  @ContentChildren(TabComponent)
  tabs: QueryList<TabComponent>;

  @ViewChild(DynamicTabsDirective)
  dynamicTabPlaceholder: DynamicTabsDirective;

  /*
    Alternative approach of using an anchor directive
    would be to simply get hold of a template variable
    as follows
  */
  // @ViewChild('container', {read: ViewContainerRef}) dynamicTabPlaceholder;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) {}

  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    let activeTabs = this.tabs.filter((tab)=>tab.active);

    // if there is no active tab set, activate the first
    if(activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }



  openTab(title: string,link:string, isCloseable = false, isOpenTab = true) {
    // get a component factory for our TabComponent
    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(TabComponent);

    // fetch the view container reference from our anchor directive
    let viewContainerRef = this.dynamicTabPlaceholder.viewContainer;

    // alternatively...
    // let viewContainerRef = this.dynamicTabPlaceholder;

    // create a component instance
    let componentRef = viewContainerRef.createComponent(componentFactory);

    // set the according properties on our component instance
    let instance: TabComponent = componentRef.instance as TabComponent;
    instance.title = title;
    instance.isCloseable = isCloseable;
    instance.link=link;

    // remember the dynamic component for rendering the
    // tab navigation headers
    this.dynamicTabs.push(componentRef.instance as TabComponent);

    if(isOpenTab) {
      // set it active
      this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
    }
  }

  selectTab(tab : TabComponent){
    // deactivate all tabs
    this.tabs.toArray().forEach(tab => tab.active = false);
    this.dynamicTabs.forEach(tab => tab.active = false);

    // activate the tab the user has clicked on.
    tab.active = true;
    this.openedTab.emit(tab);
  }
  selectTabByIndex( index:number){
    for(let i=0; i<this.dynamicTabs.length;i++) {
      if (index == i) {
        this.selectTab(this.dynamicTabs[i]);
        break;
      }
    }
  }

  closeTab(tab: TabComponent) {
    for(let i=0; i<this.dynamicTabs.length;i++) {
      if(this.dynamicTabs[i] === tab) {
        // remove the tab from our array
        this.dynamicTabs.splice(i,1);

        // destroy our dynamically created component again
        let viewContainerRef = this.dynamicTabPlaceholder.viewContainer;
        // let viewContainerRef = this.dynamicTabPlaceholder;
        viewContainerRef.remove(i);

        // set tab index to 1st one
        this.selectTab(this.tabs.first);

        //send event
        this.closedTab.emit(i);

        break;
      }
    }
  }

  closeActiveTab() {
    let activeTabs = this.dynamicTabs.filter((tab)=>tab.active);
    if(activeTabs.length > 0)  {
      // close the 1st active tab (should only be one at a time)
      this.closeTab(activeTabs[0]);
    }
  }

}
