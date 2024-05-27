import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public menus = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Animais', url: '/animais', icon: 'paw' },
    { title: 'Pessoas', url: '/pessoas', icon: 'people-circle' },
    { title: 'Adoções', url: '/adocoes', icon: 'bag-handle' },
  ];
  constructor() {}
}
