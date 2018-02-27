import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/service.index';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(
    private _settings: SettingsService
  ) { }

  ngOnInit() {
    this._settings.colocarCheck();
  }

  cambiarColor ( color: String, link: Element) {
    this._settings.aplicarTema(color);
    this._settings.guardarAjustes(color);
    this._settings.cambiarCheck(link);
  }


}
