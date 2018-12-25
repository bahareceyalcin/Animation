import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { CreditComponent } from './credit/credit.component';
import { ProtocolComponent } from './protocol/protocol.component';
import { CollectionComponent } from './collection/collection.component';
import { HomeComponent } from './home/home.component';


export const appRoutes: Routes = [
    { path: 'credit', component: CreditComponent },
    { path: 'protocol', component: ProtocolComponent },
    { path: 'collection', component: CollectionComponent },
    { path: 'home', component: HomeComponent },    
    { path: '', component: HomeComponent }
];

