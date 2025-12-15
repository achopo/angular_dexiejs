import { Component, effect, input, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

import { FactureService } from '../../services/facture.service';
import { Facture } from '../../models/facture.model';
import { FactureProduct } from '../../models/facture_product.model';

@Component({
  selector: 'app-factures',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './factures.html',
  styleUrls: ['./factures.css'],
})
export class Factures {

  factures = signal<Facture[]>([]);
  selectedFacture = signal<Facture | null>(null);
  factureLines = signal<FactureProduct[]>([]);

  clientCin = input<string | null>();
  selectedClientCin = signal<string | null>(null);

  constructor(private factureService: FactureService) {
    effect(() => {
      const cin = this.clientCin();
      if (cin) {
        this.loadFacturesForClient(cin);
      }
    });
  }

  async loadFacturesForClient(cin: string) {
    this.selectedClientCin.set(cin);
    this.factures.set(await this.factureService.getByClient(cin));
    this.selectedFacture.set(null);
    this.factureLines.set([]);
  }

  async selectFacture(factureId: number) {
    const result = await this.factureService.getFactureWithProduct(factureId);
    if (result) {
      this.selectedFacture.set(result.facture);
      this.factureLines.set(result.lines);
    }
  }

  async createFactureForClient(dateValue: string) {
    const cin = this.clientCin();
    if (!cin) return;

    const facture: Facture = {
      date: new Date(dateValue),
      clientCin: cin,
    };

    await this.factureService.addFacture(facture, []);
    await this.loadFacturesForClient(cin);
  }

  async delete(factureId: number) {
    const cin = this.clientCin();
    if (!cin) return;

    await this.factureService.deleteFacture(factureId);
    await this.loadFacturesForClient(cin);
  }
}
