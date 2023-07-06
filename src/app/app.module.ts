import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputTextComponent } from './components/input-text/input-text.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { BotaoCadastrarComponent } from './components/botao-cadastrar/botao-cadastrar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CadastroFormComponent } from './cadastro-form/cadastro-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CampoErroComponent } from './components/campo-erro/campo-erro.component';
@NgModule({  
  declarations: [
    AppComponent,
    InputTextComponent,
    BotaoCadastrarComponent,
    CadastroFormComponent,
    CampoErroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
