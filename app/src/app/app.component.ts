import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  tableData = new Array();
  chartData: any;
  opzioniGrafico: any;

  ricerca = "";

  URL = 'http://www.danielelupo.cloud/logESP32.txt';

  indiceInizio = 0;
  size = 10;
  datiGrafico = new Array();
  maxDati: number = 0;
  maxScarto: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getLogs();
  }

  getLogs(keyword?: string) {
    this.http.get(this.URL).toPromise().then((resp: any) => {
      console.info("Risposta GET file log ", resp);
    }).catch((error: any) => {
      if (error.status == 200) {
        this.extractLogFromRequest(error.error, keyword);
      }
    });
  }

  extractLogFromRequest(request: any, keyword?: string) {
    let arrayLogs = (request.text as String).split("\n");
    this.tableData = new Array();
    arrayLogs.forEach((riga: String) => {
      let tempDataOra, messaggio;
      [tempDataOra, messaggio] = riga.split("]");
      if (tempDataOra == undefined || tempDataOra.length == 0) return;
      tempDataOra = tempDataOra.split("[")[1];
      let data, orario;
      [data, orario] = tempDataOra.split(" ");
      if (keyword != undefined) {
        if (data.includes(keyword) || orario.includes(keyword) || messaggio.toLowerCase().includes(keyword.toLowerCase())) {
          this.tableData.push({ "data": data, "orario": orario, "messaggio": messaggio });
        }
      } else {
        this.tableData.push({ "data": data, "orario": orario, "messaggio": messaggio });
      }
      this.datiGrafico.push({ "data": data, "orario": orario, "messaggio": messaggio });
    });
    this.tableData = this.tableData.reverse();
    this.datiGrafico = this.datiGrafico.reverse();
    this.datiGrafico = this.datiGrafico.filter((x: any) => x.messaggio.includes("segnale:"));
    this.maxDati = +(this.datiGrafico.length);
    this.maxScarto = +this.maxDati - 1;
    this.updateRange();
  }

  doFilter() {
    this.getLogs(this.ricerca);
  }

  updateGrafico(dati: any) {
    let livelliBatteria: any[] = [];
    let labelX: any[] = [];
    let segnali: any[] = [];
    let utenti: any[] = [];
    let tmpSegnale = 0;
    let tmpCurrentWifiUsers = 0;
    dati = dati.reverse();
    dati.forEach((elemento: any) => {
      labelX.push(elemento.orario);
      livelliBatteria.push(elemento.messaggio.split(", stato")[0].split("Batteria: ")[1]);
      if (elemento.messaggio.includes("currentWifiUser:")) {
        tmpSegnale = elemento.messaggio.split(", segnale: ")[1].split(", currentWifiUser")[0];
        tmpCurrentWifiUsers = elemento.messaggio.split(", segnale: ")[1].split(", currentWifiUser: ")[1];
      } else {
        tmpSegnale = elemento.messaggio.split(", segnale: ")[1];
        tmpCurrentWifiUsers = 0;
      }
      tmpSegnale = +tmpSegnale;
      tmpSegnale = tmpSegnale;
      segnali.push(tmpSegnale);
      tmpCurrentWifiUsers = tmpCurrentWifiUsers;
      utenti.push(tmpCurrentWifiUsers);
    });
    this.chartData = {
      labels: labelX,
      datasets: [
        {
          label: 'Batteria',
          data: livelliBatteria,
          fill: true,
          borderColor: '#048c38',
          tension: 0.5,
          backgroundColor: 'rgba(60, 180, 113, 0.5)'
        },
        {
          label: 'Segnale',
          data: segnali,
          fill: false,
          borderColor: '#ecf404',
          tension: 0,
          backgroundColor: 'rgba(236, 244, 4, 0.3)',
          yAxisID: 'ySegnali'
        },
        {
          label: 'Utenti connessi',
          data: utenti,
          fill: false,
          borderColor: '#b30afc',
          tension: 0,
          backgroundColor: 'rgba(179, 10, 252, 0.3)',
          yAxisID: 'ySegnali'
        }
      ]
    };
    this.opzioniGrafico = {
      plugins: {
        legend: {
          display: true,
          labels: {
            color: '#ebedef'
          }
        },
        title: {
          display: true,
          text: 'Misurazioni (' + livelliBatteria.length + ' su ' + this.maxDati + ')',
          color: '#ebedef',
          font: {
            size: 18
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#ebedef'
          },
          grid: {
            color: 'rgba(255,255,255,0.2)'
          }
        },
        y: {
          min: 10,
          ticks: {
            color: '#ebedef',
            stepSize: 5,
          },
          grid: {
            color: 'rgba(255,255,255,0.2)'
          },
          title: {
            display: true,
            text: 'Percentuale batteria',
            color: '#ebedef',
            font: {
              size: 16
            }
          }
        },
        ySegnali: {
          type: 'linear',
          display: true,
          position: 'right',
          min: 0,
          max: 10,
          title: {
            display: true,
            text: 'Segnale e utenti',
            color: '#ebedef',
            font: {
              size: 16
            }
          },
          ticks: {
            color: '#ebedef'
          }
        }
      },
      animations: {
        tension: {
          duration: 1500,
          easing: 'linear',
          from: 0.7,
          to: 0.4,
          loop: true
        }
      },
      interaction: {
        mode: 'index',
        intersect: false,
      }
    };
    //this.opzioniGrafico = {};
  }

  updateRange() {
    let indiceFine = +this.indiceInizio + +this.size;
    this.updateGrafico(this.datiGrafico.slice(this.indiceInizio, indiceFine));
  }

}

