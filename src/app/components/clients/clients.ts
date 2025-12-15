import { Component,OnInit,output,signal } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [],
  templateUrl: './clients.html',
  styleUrl: './clients.css',
})
export class Clients implements OnInit {

  clients = signal<Client[]>([]);
  selectedClient = signal<Client | null>(null);
  constructor(private clientService: ClientService){}

  clientSelected = output<string>();

  async ngOnInit(){
    await this.loadClients();
  }

  async loadClients(){
    this.clients.set(await this.clientService.getAll());
  }

  select(client: Client){
    this.clientSelected.emit(client.cin);
  }

  
  async add(client: Client){
    await this.clientService.add(client);
    await this.loadClients();
  }

  async update(client: Client) {
    await this.clientService.update(client);
    this.selectedClient.set(null);
    await this.loadClients();
  }

  async delete(cin: string) {
  try {
    await this.clientService.delete(cin);
    await this.loadClients();
  } catch (e: any) {
    alert(e.message);
  }
}

}
