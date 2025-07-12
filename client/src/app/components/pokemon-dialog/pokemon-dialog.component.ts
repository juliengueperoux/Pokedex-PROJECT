import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pokemon } from 'src/app/models/pokemon';

@Component({
    selector: 'app-pokemon-dialog',
    templateUrl: './pokemon-dialog.component.html',
    styleUrls: ['./pokemon-dialog.component.css'],
    standalone: false
})
export class PokemonDialogComponent implements OnInit {

  pokemon: Pokemon;
  constructor( private dialogRef: MatDialogRef<PokemonDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
   this.pokemon = data.pokemon;
  }

  close() {
    this.dialogRef.close();
}

  ngOnInit() {
  }

}
