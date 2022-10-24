import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AdministratorService} from "../services/administrator.service";
import {catchError, Observable, throwError} from "rxjs";
import {Administrator} from "../model/Administrator";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {
  administrator! :Observable<Array<Administrator>>;
  errorMessage! : string;
  searchFormGroup :FormGroup | undefined;
  //les methodes crud get post put delete se trouve dans AdministrationService
  constructor(private administratorService:AdministratorService ,private fb :FormBuilder,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control("")
    });
    this.handleSearchAdmin();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'40%'
    }).afterClosed().subscribe(value => {
      if(value === 'save'){
        this.handleSearchAdmin();
      }
    });
  }

  // c'est la methode d'affichage des administrateur et de recherche des administrateurs
  handleSearchAdmin() {
    let kw  = this.searchFormGroup?.value.keyword;
    this.administrator= this.administratorService.searchAdministrator(kw).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }
//editProduct  ouvre la dialogCompenent et tu vas dans le dialogCompenant
  editProduct(row : Administrator){
    this.dialog.open(DialogComponent,{
      width:"40%",
      data:row
    }).afterClosed().subscribe(value => {
      if (value === 'updated')
        this.handleSearchAdmin();
    })
  }
  deleteAdmin(id:number){
    this.administratorService.deleteAdmin(id)
      .subscribe({
        next:(res)=>{
          alert('deleted successfully')
          this.handleSearchAdmin();
        },
        error:()=>{
          alert('error while deleted')
        }
      })
  }
}
