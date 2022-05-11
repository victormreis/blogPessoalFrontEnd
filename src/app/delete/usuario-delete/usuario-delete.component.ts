import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-delete',
  templateUrl: './usuario-delete.component.html',
  styleUrls: ['./usuario-delete.component.css']
})
export class UsuarioDeleteComponent implements OnInit {

  usuario: Usuario = new Usuario
  idUsuario: number

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.idUsuario = this.route.snapshot.params['id']
    this.findByIdUsuario(this.idUsuario)

  }


  findByIdUsuario(id: number){
    this.auth.getByIdUsuario(id).subscribe((resp:Usuario) =>{
      this.usuario = resp
    })

  }


  excluirConta(){
    this.auth.deletarUsuario(this.idUsuario).subscribe(()=>{
      alert('Usuario Deletado com sucesso!')
    this.router.navigate(['/entrar'])
    })

  }

}

