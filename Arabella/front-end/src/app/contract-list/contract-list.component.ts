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
  errorMessage = false;

  columns: string[];

  constructor(private Auth: AuthorizationService) { }


  ngOnInit() {
    this.loadData();
  }

  loadData () {
    this.Auth.getAllContracts(localStorage.getItem('userToken')).subscribe(data => {
      if (data.length === 0) {
        this.errorMessage = true;
      } else {
        for ( let i = 0; i < data.length; i++) {
          if (data[i].status === 2) {
            this.errorMessage = true;
          }
        }
      }
    });
    setTimeout(() => {
      this.columns = ['Użytkownik', 'E-mail', 'Zatwierdź'];
      this.allContracts$ = this.Auth.getAllContracts(localStorage.getItem('userToken'));
    }, 300);
  }

  reg(id) {
    this.message = true;
    this.Auth.acceptContract(localStorage.getItem('userToken'), id, 2).subscribe();

    setTimeout(() => {
      this.message = false;
    }, 1500);
  }
}

