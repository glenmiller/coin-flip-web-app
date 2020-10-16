import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {RadioButtonModule} from 'primeng/radiobutton';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ButtonModule,
		InputTextModule,
		RadioButtonModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule
{
}

