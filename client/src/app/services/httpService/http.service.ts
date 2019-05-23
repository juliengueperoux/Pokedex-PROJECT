import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private Api ="https://pokeapi.co/api/v2/"
  

  constructor(private http: HttpClient) { }
  // id or name 
  getPokemon(id){
    return this.http.get(this.Api+"pokemon/"+id)
  }
  getPokemons(idBegin,number){
    return this.http.get(this.Api+"pokemon//?offset="+idBegin+"&limit="+number)
  }
  getAllPokemons(){
    return this.http.get(this.Api+"pokemon/?limit=10000")
  }
  getPokemonDescription(url){
    return this.http.get(url)
  }
  getPokemonByUrl(url){
    return this.http.get(url)
  }
  getPokemonInRange(min,number){
    return this.http.get(this.Api+"pokemon/?offset="+min+"&?limit="+number)
  }

  
}
