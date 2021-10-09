import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sea-of-thieves',
  templateUrl: './sea-of-thieves.component.html',
  styleUrls: ['./sea-of-thieves.component.scss']
})

export class SeaOfThievesComponent implements OnInit {

  elencoMappe: Array<Isola>;
  ricerca: any;
  mostraRisultato: boolean = false;
  isolaTrovata: any;

  constructor() {
    this.elencoMappe = new Array();
    this.ricerca = "";
  }

  ngOnInit(): void {
    this.initIsole();
  }

  // Crea le isole e le aggiunge all'array isole
  initIsole() {
    this.elencoMappe.push(new Isola("Cannon cove", "G-10", "https://static.wikia.nocookie.net/seaofthieves_gamepedia/images/0/08/CannonCove_Map.png"));
    this.elencoMappe.push(new Isola("Crescent isle", "B-9", "https://static.wikia.nocookie.net/seaofthieves_gamepedia/images/8/86/CrescentIsle_Map.png"));
    this.elencoMappe.push(new Isola("Lone cove", "H-6", "https://static.wikia.nocookie.net/seaofthieves_gamepedia/images/3/33/LoneCove_Map.png"));
    this.elencoMappe.push(new Isola("Mermaid's hideway", "B-13", "https://static.wikia.nocookie.net/seaofthieves_gamepedia/images/2/2b/GP_Mermaid%27s_Hideaway.png"));
    this.elencoMappe.push(new Isola("Sailor's bounty", "C-4", "https://static.wikia.nocookie.net/seaofthieves_gamepedia/images/6/63/GP_Sailor%27s_Bounty.png"));
    this.elencoMappe.push(new Isola("Smuggler's bay", "F-3", "https://static.wikia.nocookie.net/seaofthieves_gamepedia/images/0/03/GP_Smuggler%27s_Bay.png"));
    this.elencoMappe.push(new Isola("Wanderers refuge", "F-12", "https://static.wikia.nocookie.net/seaofthieves_gamepedia/images/d/d6/WanderersRefuge_Map.png"));
    this.elencoMappe.push(new Isola("Crook's hollow", "M-16", "https://static.wikia.nocookie.net/seaofthieves_gamepedia/images/0/01/CrooksHollow_Map.png"));
    this.elencoMappe.push(new Isola("Devil's ridge", "P-19", "https://static.wikia.nocookie.net/seaofthieves_gamepedia/images/6/60/DevilsRidge_Map.png"));
    this.elencoMappe.push(new Isola("Discovery ridge", "E-17", "https://static.wikia.nocookie.net/seaofthieves_gamepedia/images/d/dd/DiscoveryRidge_Map.png"));
    this.elencoMappe.push(new Isola("Plunder valley", "G-16", "https://static.wikia.nocookie.net/seaofthieves_gamepedia/images/6/60/PlunderValley_Map.png"));
    this.elencoMappe.push(new Isola("Shark bait cove", "H-19", "https://oyster.ignimgs.com/mediawiki/apis.ign.com/sea-of-thieves/4/48/Shark-bait-cove.jpg"));
    this.elencoMappe.push(new Isola("Snake island", "K-16", "https://static.wikia.nocookie.net/seaofthieves_gamepedia/images/e/e1/Snake_Island_illustrated_map-s.png"));
    this.elencoMappe.push(new Isola("Thieves' haven", "L-20 / M-20", "https://rarethief.com/wp-content/uploads/2020/03/sea-of-thieves-athenas-run-chapter-1-1024x576.png"));
    this.elencoMappe.push(new Isola("Kraken's fall", "R-12", "http://surveyorpete.fun/pics/krakens_fall/treasure_map.png"));
    this.elencoMappe.push(new Isola("Marauder's arch", "Q-3", "https://static.wikia.nocookie.net/seaofthieves_gamepedia/images/f/fe/MaraudersArch_Map.png"));
    this.elencoMappe.push(new Isola("Old faithful isle", "M-4", "https://static.wikia.nocookie.net/seaofthieves_gamepedia/images/4/49/OldFaithfulIsle_1.png"));
    this.elencoMappe.push(new Isola("Shipwreck bay", "M-10", "https://static.wikia.nocookie.net/seaofthieves_gamepedia/images/5/5f/ShipwreckBay_Map.png"));
    this.elencoMappe.push(new Isola("The crooked masts", "O-11", "https://static.wikia.nocookie.net/seaofthieves_gamepedia/images/f/f4/TheCrookedMasts_Riddle1_Answer_Map.png"));
    this.elencoMappe.push(new Isola("The sunken grove", "P-7", "https://static.wikia.nocookie.net/seaofthieves_gamepedia/images/0/04/TheSunkenGrove_Map.png"));
    this.elencoMappe.push(new Isola("Ashen reaches", "V-23", "https://static.wikia.nocookie.net/seaofthieves_gamepedia/images/a/a5/Ashen_Reaches.png"));
    this.elencoMappe.push(new Isola("Fetcher's rest", "V-12", "https://static.wikia.nocookie.net/seaofthieves_gamepedia/images/4/4a/Fetcher%27s_Rest.png"));
    this.elencoMappe.push(new Isola("Flintlock peninsula", "W-14/15", "https://static.wikia.nocookie.net/seaofthieves_gamepedia/images/b/be/Flintlock_Peninsula.png"));
    this.elencoMappe.push(new Isola("Ruby's fall", "Y-16", "http://surveyorpete.fun/pics/rubys_fall/treasure_map.png"));
    this.elencoMappe.push(new Isola("The devil's thirst", "W-21", "https://static.wikia.nocookie.net/seaofthieves_gamepedia/images/a/ad/The_Devil%27s_Thirst.png"));
  }

  cerca() {
    const c = document.getElementById('inputSearch') as HTMLInputElement;
    const isolaTrovata = this.elencoMappe.find(x => x.getNome() == c.value) as Isola;
    if (isolaTrovata != undefined) {
      this.mostraRisultato = true;
      this.isolaTrovata = isolaTrovata;
    }
  }

  resetRicerca() {
    this.mostraRisultato = false;
    const c = document.getElementById('inputSearch') as HTMLInputElement;
    c.value = "";
  }

}

class Isola {
  nome: String;
  urlImmagine: String;
  posizione: String;


  constructor(nome: String, posizione: String, urlImmagine: String) {
    this.nome = nome;
    this.posizione = posizione;
    this.urlImmagine = urlImmagine;
  }

  getNome(): String {
    return this.nome;
  }

  getPosizione(): String {
    return this.posizione;
  }

  getUrlImmagine(): String {
    return this.urlImmagine;
  }

  setNome(nome: String) {
    this.nome = nome;
  }

  setPosizione(posizione: String) {
    this.posizione = posizione;
  }

  setUrlImmagine(urlImmagine: String) {
    this.urlImmagine = urlImmagine;
  }

}