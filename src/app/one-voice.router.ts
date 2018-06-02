import { AppComponent } from './app.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { RepairsManageStagesFormComponent } from './repairs-manage-stages-form/repairs-manage-stages-form.component';
/**
 * Component Dependency
 */

export const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'manage_stages', component: RepairsManageStagesFormComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
export const AppRouting: ModuleWithProviders = RouterModule.forRoot(routes);



