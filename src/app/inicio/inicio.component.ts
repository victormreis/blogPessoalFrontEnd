import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
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

  tema: Tema = new Tema
  listaTemas: Tema[]
  idTema: number

  usuario: Usuario = new Usuario
  idUsuario = environment.id

  foto= environment.foto



  constructor(
    private router: Router,
    private postagensService: PostagensService,
    private temaService: TemaService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    if(environment.token ==''){
      alert('Sessão expirada, faça login para continuar')
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

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema
    this.usuario.id = this.idUsuario
    this.postagem.usuario = this.usuario
    this.postagensService.postPostagem(this.postagem).subscribe({
      next:(resp: Postagem) => {
      this.postagem = resp
      alert('Postagem realizada com Sucesso!')
      this.postagem = new Postagem()
      this.getAllPostagens()
      this.findByIdUsuario()
      },
      error: (erro) => {
        if(erro.status == 500) {
          alert('Preencha todos os campos para fazer uma postagem!')
        }
      },
    })

  }

}

