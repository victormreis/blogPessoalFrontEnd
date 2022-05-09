import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit {

  tema: Tema = new Tema()
  listaTema: Tema[]

  constructor(
    private router: Router,
    private temaService: TemaService
  ) { }

  ngOnInit(){

    if(environment.token ==''){
      alert('Sessão expirada, faça login para continuar')
      this.router.navigate(['/entrar'])
    }

    this.findAllTemas()


  }

  findAllTemas(){
    this.temaService.getAllTemas().subscribe((resp:Tema[]) =>{
      this.listaTema = resp
      console.log(this.listaTema)
    })
  }

  cadastrar(){
    this.temaService.postTema(this.tema).subscribe({
      next: (resp:Tema) =>{
      this.tema = resp
      alert('Tema cadastrado com sucesso!')
      this.tema = new Tema()
      this.findAllTemas()
      },
      error: (erro) => {
        if(erro.status == 400){
          alert('Tema não pode ser cadastrado pois já existe um tema com está descrição');
        }
      },
    })

  }

}


