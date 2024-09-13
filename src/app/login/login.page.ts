import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  isLoading: boolean = false;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController,
    private loadingController: LoadingController
  ) {
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
  }

  ngOnInit() { }

  async ingresar() {
    var f = this.formularioLogin.value;
    var usuarioString = localStorage.getItem('usuario');

    if (usuarioString !== null) {
      var usuario = JSON.parse(usuarioString);

      if (usuario.nombre === f.nombre && usuario.password === f.password) {

        this.isLoading = true;

        // Crear y presentar el spinner
        const loading = await this.loadingController.create({
          message: 'Iniciando sesión...',
          spinner: 'crescent', // Tipo de spinner
          duration: 2000 // Duración opcional en ms
        });

        await loading.present();

        setTimeout(async () => {
          await loading.dismiss();
          localStorage.setItem('ingresado', 'true');
          localStorage.setItem('nombreUsuario', f.nombre);
          this.navCtrl.navigateRoot('inicio');
        }, 2000);
      } else {
        const alert = await this.alertController.create({
          message: 'Datos Incorrectos',
          buttons: ['Aceptar'],
        });
        await alert.present();
      }
    } else {
      const alert = await this.alertController.create({
        message: 'No hay datos de usuario en el almacenamiento local. Por favor, registre primero.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }
}
