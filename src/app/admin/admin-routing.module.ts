import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberAssistanceComponent } from './member-assistance/member-assistance.component';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path:'member-assistance', title:"Chart", component:MemberAssistanceComponent},
  { path:'form', title:"Chart", component:FormComponent},
  { path:'home', title:"Home", component:HomeComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
