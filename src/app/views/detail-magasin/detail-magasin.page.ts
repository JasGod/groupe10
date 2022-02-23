import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Command } from 'src/app/model/command';
import { PopinaService } from 'src/app/service/popina.service';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

@Component({
  selector: 'app-detail-magasin',
  templateUrl: './detail-magasin.page.html',
  styleUrls: ['./detail-magasin.page.scss'],
})
export class DetailMagasinPage implements OnInit {
  magasin: any;
  produits: any[] = [];

  command: Command = {
    idUser: 0,
    montant: 0,
    date: new Date(),
    quantite: 0,
    moyenLivraison: '',
  };

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private popinaServ: PopinaService,
    private route: ActivatedRoute,
    private emailComposer: EmailComposer
  ) {}

  ngOnInit() {
    let idMag = this.route.snapshot.paramMap.get('id');
    this.popinaServ.getProduits(idMag);
    this.magasin = this.popinaServ.magasin;
    this.produits = this.popinaServ.produits;
  }

  signalRupture(produit: any) {
    this.emailComposer.open({
      to: 'takamchristian2@gmail.com',
      cc: 'toboujas@gmail.com',
      attachments: [produit.image],
      subject: 'Signaler la rupture de stock',
      body: `le produit ${produit.nom} est en rupture de stock, veillez s'il vous plait en fournir plus.
      image joint.   Cordialement,`,
      isHtml: true,
    });
  }

  async presentAlertRadio(qte: number) {
    const alert = await this.alertController.create({
      header: 'Moyen De Livraison',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Moto',
          value: 'moto',
          handler: () => {
            console.log('Radio 1 selected');
          },
          checked: true,
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Voiture',
          value: 'voiture',
          handler: () => {
            console.log('Radio 2 selected');
          },
        },
      ],
      buttons: [
        {
          text: 'Commande',
          handler: (data: any) => {
            console.log('Confirm Ok: ', data, 'quantité: ', qte);
            this.command.quantite = qte;
            this.command.moyenLivraison = data;
            this.command.date = new Date();
            this.popinaServ.PostCommand(this.command);
          },
        },
      ],
    });

    await alert.present();
  }

  async presentAlertPrompt(produit: any) {
    const alert = await this.alertController.create({
      header: produit.nom,
      subHeader: produit.description,
      message: `<img src="${produit.image}" style="border-radius: 20px">`,

      inputs: [
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Entrer la quantité',
          min: 1,
          max: produit.stock,
        },
      ],

      buttons: [
        {
          text: 'Signaler la rupture',
          role: 'signaler',
          cssClass: 'my-custom-class',
          handler: () => {
            this.signalRupture(produit);
            this.presentToast();
            console.log('Confirm signaler');
          },
        },
        {
          text: 'ajouter au panier',
          handler: (data: any) => {
            this.presentAlertRadio(data.quantity);
            this.command.montant = produit.prix * data.quantity;
            console.log('Confirm ajouter panier', data);
          },
        },
      ],
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Votre message a bien été envoyé.',
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
}
