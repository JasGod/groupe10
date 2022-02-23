import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Command } from 'src/app/model/command';

import { PopinaService } from 'src/app/service/popina.service';

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.page.html',
  styleUrls: ['./statistical.page.scss'],
})
export class StatisticalPage implements OnInit, AfterViewInit {
  statDay: [{ jour: Date; montant: number }];

  statMonth: [{ mois: number; montant: number }];

  command: Command[] = [];
  constructor(private popinaServ: PopinaService) {}

  ngAfterViewInit(): void {
    this.popinaServ.getIduser().then((id) => {
      console.log(id);
      this.popinaServ.getCommand().subscribe((data: Command[]) => {
        this.command = data.filter((elt) => {
          return elt.idUser == id;
        });

        for (let i = 0; i < this.command.length; i++) {
          for (let j = 0; j < this.command.length; j++) {
            if (
              this.command[i].date.getDay() == this.command[j].date.getDay()
            ) {
              this.statDay[i].jour = this.command[i].date;
              this.statDay[i].montant =
                this.command[i].montant + this.command[j].montant;
            }
            if (
              this.command[i].date.getMonth() == this.command[j].date.getMonth()
            ) {
              this.statMonth[i].mois = this.command[i].date.getMonth();
              this.statMonth[i].montant =
                this.command[i].montant + this.command[j].montant;
            }
          }
        }
      });
    });
  }

  ngOnInit() {}
}
