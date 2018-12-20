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

  allContracts$: Observable<Array<contractListInterface>>;

  columns: string[];

  constructor(private Auth: AuthorizationService) { }


  ngOnInit() {
    this.loadData();
  }

  loadData () {
    this.columns = ['Imię', 'Nazwisko', 'E-mail'];

    this.Auth.getSchool(localStorage.getItem('userToken')).subscribe(data => {
      this.allContracts$ = this.Auth.getAllContracts(localStorage.getItem('userToken'));
    });
  }
}
