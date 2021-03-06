import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css'],
})
export class EntrarComponent implements OnInit {
  // btnEntrar = <HTMLButtonElement>document.querySelector('#btnEntrar')
  isLoading = false
  usuarioLogin: UsuarioLogin = new UsuarioLogin();
  txtBtn: string

  constructor(private auth: AuthService,
    private router: Router,
    private alertas: AlertasService,
    ) {}

  ngOnInit() {
    window.scroll(0,0)
    this.alterTxtBtn()

  }

  entrar() {
    this.isLoading = true
    this.alterTxtBtn()
    this.auth.entrar(this.usuarioLogin).subscribe({
      next: (resp: UsuarioLogin) => {
        this.usuarioLogin = resp;
        environment.id = this.usuarioLogin.id;
        environment.nome = this.usuarioLogin.nome;
        environment.foto = this.usuarioLogin.foto;
        environment.token = this.usuarioLogin.token;
        environment.tipo = this.usuarioLogin.tipo
        this.router.navigate(['/inicio']);


      },
      error: (erro) => {
        if (erro.status == 401) {
          this.alertas.showAlertDanger('Usuário ou senha estão incorretos!');
          this.isLoading = false
          this.alterTxtBtn()
        }
        if(erro.status == 500){
          this.alertas.showAlertDanger('Preencha todos os campos para fazer o login');
          this.isLoading = false
          this.alterTxtBtn()
        }
      },
    });
  }

  alterTxtBtn(){
    if(this.isLoading == false){
      this.txtBtn = 'Entrar'
    }
    else{
      this.txtBtn = 'Carregando'
    }
  }

  validaEmail(){
    let email = (<HTMLLabelElement>document.querySelector('#txtUsuario'))
    let regex = "[a-z0-9]+@[a-z]+\.[a-z]{2,3}"
    if(this.usuarioLogin.usuario.match(regex)){
      email.innerHTML = 'Usuário'
      email.style.color = 'black'
    }else{
      email.innerHTML = 'Usuário precisa ser um email válido'
      email.style.color = 'red'
    }

  }


}
