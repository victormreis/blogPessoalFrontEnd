import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario = new Usuario()
  idUsuario: number
  confirmarSenha: string;
  tipoDeUsuario: string;
  id = environment.id;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
   ) { }

  ngOnInit(){
    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }
    this.idUsuario = this.route.snapshot.params['id']
    this.findByIdUsuario(this.idUsuario)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  validaSenha() {
    let txtSenha = <HTMLLabelElement>document.querySelector('#txtSenha');
    let senha = <HTMLInputElement>document.querySelector('#senha');
    let confSenha = <HTMLInputElement>document.querySelector('#confirmarSenha');

    if (this.confirmarSenha == this.usuario.senha) {
      txtSenha.innerHTML = 'Confirme sua senha';
      senha.style.border = 'solid 1px green';
      confSenha.style.border = 'solid 1px green';
    } else {
      txtSenha.innerHTML = 'Senhas não são identicas!';
      senha.style.border = 'solid 1px red';
      confSenha.style.border = 'solid 1px red';
    }

  }

  tipoUsuario(event: any){
    this.tipoDeUsuario = event.target.value;
  }

  validaNome(){
    let txtNome = <HTMLLabelElement>document.querySelector('#txtNome');
    let nome = <HTMLInputElement>document.querySelector('#nome');

    if (this.usuario.nome.length < 3) {
      txtNome.innerHTML = 'Digite um nome válido';
      txtNome.style.color = 'red';
      nome.style.border = 'solid 1px red';
    } else {
      txtNome.innerHTML = 'Nome';
      txtNome.style.color = 'black';
      nome.style.border = 'solid 1px green';
    }

  }

  atualizar(){
    this.usuario.tipo = this.tipoDeUsuario;
    if (this.usuario.senha != this.confirmarSenha) {
      alert('As senhas não conferem');
    // if(this.usuario.tipo == null){
    //   alert('Selecione um tipo de usuário antes de prosseguir!')
    // }
    } else {
      this.auth.atualizar(this.usuario).subscribe({
        next: (resp: Usuario) => {
          console.log(this.usuario)
          this.usuario = resp;
          alert('Usuario Atualizado com sucesso! Por favor faça o login para validar as alterações');
          this.router.navigate(['/entrar']);
          environment.token = '';
          environment.foto = '';
          environment.id = 0;
          environment.nome = '';
        },
        error: (erro) => {
          if (erro.status == 400) {
            alert('Preencha os campos corretamente para atualizar o usuario');
          }
        },
      });
    }

  }

  findByIdUsuario(id: number){
    this.auth.getByIdUsuario(id).subscribe((resp: Usuario) =>{
      this.usuario = resp
      this.usuario.senha = ''
    })
  }



}
