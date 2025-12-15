import { Injectable } from '@angular/core';
import { db } from './db.service';
import { Facture } from '../models/facture.model';
import { FactureProduct } from '../models/facture_product.model';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  async addFacture(
    facture :Facture,
    products :{productId:number ; quantity:number}[]
  ){
    return db.transaction(
        'rw',
        db.factures,
        db.factureProducts,
        async() => {

            const factureId = await db.factures.add(facture);

            const pivot: FactureProduct[] = products.map(p => ({
                 factureId,
                 productId: p.productId,
                 quantity: p.quantity
        }));

        await db.factureProducts.bulkAdd(pivot);

        return factureId;
        }
    )
  }

  getAll() {
    return db.factures.toArray();
  }

  getByClient(cin: string) {
    return db.factures
      .where('clientCin')
      .equals(cin)
      .toArray();
  }

  async getFactureWithProduct(factureId:number){
    const facture = await db.factures.get(factureId);
    if (!facture) return null;
    const lines = await db.factureProducts.where('factureId').equals(factureId).toArray();
    return { facture, lines };
  }

  async deleteFacture(factureId: number){
    return db.transaction(
        'rw',
        db.factures,
        db.factureProducts,
        async ()=> {
            await db.factureProducts.where('factureId').equals(factureId).delete();
            await db.factures.delete(factureId);
        }
    );
  }
}
