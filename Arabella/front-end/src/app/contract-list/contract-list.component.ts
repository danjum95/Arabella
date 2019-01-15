import { AuthorizationService } from './../authorization.service';
import { Component, OnInit } from '@angular/core';
import { contractListInterface } from '../interface/contractListInterface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {

  message = false;
  allContracts$: Observable<Array<contractListInterface>>;

  columns: string[];

  constructor(private Auth: AuthorizationService) { }


  ngOnInit() {
    this.loadData();
  }

  loadData () {
    this.columns = ['Użytkownik', 'E-mail', 'Zatwierdź'];
    this.allContracts$ = this.Auth.getAllContracts(localStorage.getItem('userToken'));
  }

  id(event) {
    this.message = true;
    this.Auth.acceptContract(localStorage.getItem('userToken'), event.target.id, 2).subscribe();

    setTimeout(() => {
      this.message = false;
    }, 1500);
  }
}
