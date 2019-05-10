import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PreviewInfosComponent } from './components/preview-infos/preview-infos.component';
import { SearchPokemonComponent } from './components/search-pokemon/search-pokemon.component';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/httpService/http.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { PokemonService } from './services/pokemonService/pokemon.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    PreviewInfosComponent,
    SearchPokemonComponent
  ],
  imports: [
    MatIconModule,  
    MatSnackBarModule,
    MatProgressBarModule,
    MatListModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [HttpService,PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
