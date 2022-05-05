import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css'],
})
export class CadastrarComponent implements OnInit {
  usuario: Usuario = new Usuario();
  confirmarSenha: string;
  tipoDeUsuario: string;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    window.scroll(0, 0);
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  tipoUsuario(event: any) {
    this.tipoDeUsuario = event.target.value;
  }

  cadastrar() {
    this.usuario.tipo = this.tipoDeUsuario;
    if (this.usuario.senha != this.confirmarSenha) {
      alert('As senhas não conferem');
    } else {
      this.auth.cadastrar(this.usuario).subscribe({
        next: (resp: Usuario) => {
          this.usuario = resp;
          alert('Usuario Cadastrado com sucesso!');
          this.router.navigate(['/entrar']);
        },
        error: (erro) => {
          if (erro.status == 400) {
            alert('Email já cadastrado!');
          }
          if (erro.status == 500) {
            alert('O formulario não pode ter campos vazios');
          }
        },
      });
    }
  }

  validaNome() {
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

  validaEmail() {
    let regex = '[a-z0-9]+@[a-z]+.[a-z]{2,3}';
    let txtEmail = <HTMLLabelElement>document.querySelector('#txtEmail');
    let email = <HTMLInputElement>document.querySelector('#usuario');
    if (this.usuario.usuario.match(regex)) {
      txtEmail.innerHTML = 'Usuário';
      email.style.border = 'solid 1px green';
    } else {
      txtEmail.innerHTML = 'Usúario Invalido';
      email.style.border = 'solid 1px red';
    }
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
}
