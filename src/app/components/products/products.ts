import { Component, OnInit,signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {

  products = signal<Product[]>([]);
  selectedProduct = signal<Product | null>(null);

  constructor(private productService:ProductService){}

  async ngOnInit(){
    await this.loadProducts();
  }
  async loadProducts(){
    this.products.set(await this.productService.getAll());
  }

  select(product:Product){
    this.selectedProduct.set(product);
  }

  async add(product:Product){
    await this.productService.add(product);
    await this.loadProducts();
  }

  async update(product:Product){
    await this.productService.update(product);
    this.selectedProduct.set(null);
    await this.loadProducts();
  }

  async delete(id:number) {
    await this.productService.delete(id);
    await this.loadProducts();
  }
}
