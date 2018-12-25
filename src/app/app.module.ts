import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreditComponent } from './credit/credit.component';
import { ProtocolComponent } from './protocol/protocol.component';
import { appRoutes } from './routes';
import { CollectionComponent } from './collection/collection.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component'; 
import { TabsComponent } from './tabs-component/tabs.component';
import { TabComponent } from './tabs-component/tab.component';
import { DynamicTabsDirective } from './tabs-component/dynamic-tabs.directive';


@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent,
    CreditComponent,
    ProtocolComponent,
    CollectionComponent,
    ButtonComponent,
    TabsComponent,
    TabComponent,
    DynamicTabsDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TabComponent]
})
export class AppModule { }
