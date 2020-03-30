import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { OrdersComponent } from './component/orders/orders.component';
import { ScoutsAssignedOrdersComponent } from './component/helpers/scouts-assigned-orders/scouts-assigned-orders.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'drag', component: ScoutsAssignedOrdersComponent },
  { path: 'orders/add', component: OrdersComponent },
  { path: 'scouts', loadChildren: () => import('./component/scouts/scouts.module').then(m => m.ScoutsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
