import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public title = 'ADMIN';
  
  public menu = [
    { name: 'Dashboard', link: '/', icon: 'dashboard' },
    { name: 'Orders', link: '/orders/add', icon: 'dashboard' },
    { name: 'Scouts', link: '/scouts/add', icon: 'dashboard' },
  //   { name: 'Report', link: '#', icon: 'dashboard' },
  //  { name: 'Classic Dashboard', link: '/app/dashboard', icon: 'dashboard' },
  //  { name: 'Classic Dashboard', link: '/app/dashboard', icon: 'dashboard' },
  //  { name: 'Custom Dashboard', link: '/app/dashboard-custom', icon: 'view_quilt' },
  //   {
  //     name: 'UI',
  //     children: [
  //       ...[
  //         'buttons',
  //         'cards',
  //         'colors',
  //         'forms',
  //         'icons',
  //         'typography',
  //         'tables',
  //       ].map(ui => ({
  //         name: ui[0].toUpperCase() + ui.slice(1),
  //         link: `/ui/${ui}`,
  //       })),
  //       {
  //         name: 'Right sidebar',
  //         link: '/ui/right-sidebar',
  //       },
  //     ],
  //     icon: 'view_comfy',
  //   },
  //   { name: 'Components', link: '/app/components', icon: 'developer_board' },
  //   { name: 'Account', link: '/app/forms', icon: 'person' },
  //   {
  //     name: 'Maps', icon: 'map', children: [
  //     { name: 'Simple map', link: '/maps/simple' },
  //     { name: 'Advanced map', link: '/maps/advanced' },
  //     ],
  //   },
  //   { name: 'Charts', link: '/app/charts', icon: 'multiline_chart' },
  //   {
  //     name: 'Pages', children: [
  //     { name: 'Sign in', link: '/pages/login' },
  //     { name: 'Sign up', link: '/pages/sign-up' },
  //     { name: 'Forgot password', link: '/pages/forgot-password' },
  //     { name: '404', link: '/pages/error' },
  //     ],
  //     icon: 'pages',
  //   },
  ];
  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }
  navigate() {
    const layout = (document.querySelector('.mdl-layout') as any).MaterialLayout;
    if (layout.drawer_.getAttribute('aria-hidden') !== 'true') {
      layout.toggleDrawer();
    }
  }

}
