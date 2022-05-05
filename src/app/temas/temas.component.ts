import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(){

    // if(environment.token ==''){
    //   alert('Sessão expirada, faça login para continuar')
    //   this.router.navigate(['/entrar'])
    // }
  }
}


