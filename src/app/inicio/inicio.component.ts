import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagensService } from '../service/postagens.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  tituloPost: string

  tema: Tema = new Tema
  listaTemas: Tema[]
  idTema: number
  nomeTema: string

  usuario: Usuario = new Usuario
  idUsuario = environment.id
  foto= environment.foto

  key = 'date'
  reverse = true



  constructor(
    private router: Router,
    private postagensService: PostagensService,
    private temaService: TemaService,
    private authService: AuthService,
    private alertas: AlertasService
  ) { }

  ngOnInit(){

    window.scroll(0,0)

    if(environment.token ==''){
      this.alertas.showAlertDanger('Sessão expirada, faça login para continuar')
      this.router.navigate(['/entrar'])
    }
    this.authService.refreshToken();
    this.getAllTemas()
    this.getAllPostagens()


  }

  getAllTemas(){
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp

    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) =>{
      this.tema = resp
    })
  }

  getAllPostagens() {
    this.postagensService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  findByIdUsuario(){
    this.authService.getByIdUsuario(this.idUsuario).subscribe((resp: Usuario) =>{
      this.usuario = resp
    })
  }

  findByTitulo(){
    if(this.tituloPost == ''){
      this.getAllPostagens()
    }else{
      this.postagensService.getByTitulo(this.tituloPost).subscribe((resp: Postagem[]) =>{
        this.listaPostagens = resp
      })
    }
  }

  findByNome(){
    if(this.nomeTema == ''){
      this.getAllTemas()
    }else{
      this.temaService.getByNome(this.nomeTema).subscribe((resp: Tema[]) => {
        this.listaTemas = resp
      })
    }
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema
    this.usuario.id = this.idUsuario
    this.postagem.usuario = this.usuario
    this.postagensService.postPostagem(this.postagem).subscribe({
      next:(resp: Postagem) => {
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem realizada com Sucesso!')
      this.postagem = new Postagem()
      this.getAllPostagens()
      this.getAllTemas()

      },
      error: (erro) => {
        if(erro.status == 500) {
          this.alertas.showAlertInfo('Preencha todos os campos para fazer uma postagem!')
        }
      },
    })

  }

}

