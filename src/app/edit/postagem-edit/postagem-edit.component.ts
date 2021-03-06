import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { PostagensService } from 'src/app/service/postagens.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: Postagem = new Postagem()
  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagensService: PostagensService,
    private temaService: TemaService,
    private alertas: AlertasService
  ) {}

  ngOnInit(){
    window.scroll(0,0)

    if(environment.token ==''){
      this.alertas.showAlertInfo('Sessão expirada, faça login para continuar')
      this.router.navigate(['/entrar'])
    }
    let id = this.route.snapshot.params['id']
    this.findByIdPostagem(id)
    this.findAllTemas()
  }

  findByIdPostagem(id: number){
    this.postagensService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  findAllTemas(){
    this.temaService.getAllTemas().subscribe((resp: Tema[])=> {
      this.listaTemas = resp
    })

  }

  atualizar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema
    // this.postagem.tema.postagem = []
    // this.postagem.usuario.postagens = []
    console.log(this.postagem)

    this.postagensService.putPostagem(this.postagem).subscribe({
      next:(resp: Postagem) => {
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem Atualizada com sucesso!')
      this.router.navigate(['/inicio'])
      },
      error: (erro) => {
        if(erro.status == 400){
          this.alertas.showAlertDanger('Preencha todos os campos para atualizar uma postagem')
        }
      }
    })
  }

}
