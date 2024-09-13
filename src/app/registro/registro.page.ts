import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private navCtrl: NavController,
    private loadingController: LoadingController
  ) {
    this.formularioRegistro = this.fb.group({
      nombre: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmacionpassword: new FormControl('', Validators.required)
    }, {
      validator: this.passwordsMatch('password', 'confirmacionpassword')
    });
  }

  ngOnInit() {}

  // Función para validar que las contraseñas coinciden
  passwordsMatch(passwordKey: string, confirmPasswordKey: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.get(passwordKey);
      const confirmPasswordControl = formGroup.get(confirmPasswordKey);

      if (!passwordControl || !confirmPasswordControl) {
        return;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordsMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  async guardar() {
    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        message: 'Debes llenar todos los campos y asegurarte de que las contraseñas coincidan',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }
  
    // Mostrar spinner
    const loading = await this.loadingController.create({
      message: 'Guardando...',
      spinner: 'crescent'  // Usar el spinner 'crescent'
    });
    await loading.present();
  
    // Simulación de tiempo de espera para el registro
    setTimeout(async () => {
      const f = this.formularioRegistro.value;
      const usuario = {
        nombre: f.nombre,
        password: f.password
      };
  
      localStorage.setItem('usuario', JSON.stringify(usuario));
      localStorage.setItem('ingresado', 'true');
  
      await loading.dismiss();
  
      const successAlert = await this.alertController.create({
        message: 'Registro guardado exitosamente',
        buttons: [{
          text: 'Aceptar',
          handler: () => {
            this.navCtrl.navigateRoot('login');
          }
        }]
      });
  
      await successAlert.present();
    }, 2000);  // Ajusta el tiempo según sea necesario
  }
  
}
