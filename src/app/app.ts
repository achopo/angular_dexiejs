import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Clients } from './components/clients/clients';
import { Products } from './components/products/products';
import { Factures } from './components/factures/factures';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Clients, Factures, Products],
  template: `
    <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
      <div style="flex: 1;">
        <h2>Clients</h2>
        <app-clients (clientSelected)="onClientSelected($event)"></app-clients>
      </div>

      <div style="flex: 1;">
        <h2>Products</h2>
        <app-products></app-products>
      </div>

      <div style="flex: 1;">
        <h2>Factures</h2>
        <app-factures [clientCin]="selectedClientCin()"></app-factures>
      </div>
    </div>
  `
})
export class App {
  selectedClientCin = signal<string | null>(null);

  onClientSelected(cin: string) {
    this.selectedClientCin.set(cin);
  }
}
