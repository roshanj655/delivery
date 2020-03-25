import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { OrdersComponent } from './component/orders/orders.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'orders/add', component: OrdersComponent },
  { path: 'scouts', loadChildren: () => import('./component/scouts/scouts.module').then(m => m.ScoutsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
