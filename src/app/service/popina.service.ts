import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Command } from '../model/command';

import { Storage } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Injectable({
  providedIn: 'root',
})
export class PopinaService {
  magasins: any[] = [];
  produits: any[] = [];
  magasin: any = {};
  private idUser: any;
  private _store: Storage;

  constructor(private ngFS: AngularFirestore, private storage: Storage) {
    this.initDB();
  }

  private async initDB() {
    const storage = await this.storage.create();
    this._store = storage;
    await this.storage.defineDriver(CordovaSQLiteDriver);
  }

  private saveIduser(id: number) {
    this._store.set('user', id);
  }

  async getIduser() {
    const idUse = await this._store.get('user');
    return idUse;
  }

  getMagasin() {
    const ref = this.ngFS.collection('Magasin');
    return ref.valueChanges({ idField: 'id' });
  }

  getProduits(id: any) {
    this.magasin = this.magasins.find((elt) => elt.id == id);
    this.produits = this.magasin.produits;
  }

  getCommand() {
    const ref = this.ngFS.collection('Commande');
    return ref.valueChanges();
  }

  PostCommand(command: Command) {
    this.getIduser().then((id) => {
      this.idUser = id;
      if (this.idUser) {
        command.idUser = this.idUser;
      } else {
        command.idUser = Math.random() * 10;
      }
      this.saveIduser(command.idUser);
      this.ngFS.collection('Commande').add({
        idUser: command.idUser,
        montant: command.montant,
        date: command.date,
        quantite: command.quantite,
        moyenLivraison: command.moyenLivraison,
      });
    });
  }
}
