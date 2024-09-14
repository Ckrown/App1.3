import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OlvidarPage } from './olvidar.page';

const routes: Routes = [
  { path: 'olvidar', component: OlvidarPage },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // Otras rutas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
