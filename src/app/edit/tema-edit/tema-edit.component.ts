import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  tema: Tema = new Tema

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    if(environment.token ==''){
      this.router.navigate(['/entrar'])
    }

    let id = this.route.snapshot.params['id']
    this.findByIdTema(id)
  }

  findByIdTema(id: number){
    this.temaService.getByIdTema(id).subscribe((resp: Tema) =>{
      this.tema = resp
    })
  }

  atualizar(){
    console.log(this.tema)
    this.temaService.putTema(this.tema).subscribe({
      next:(resp: Tema) =>{
      this.tema = resp
      alert('Tema atualizado')
      console.log(this.tema)
      this.router.navigate(['/temas'])
      },
      error: (erro) => {
        if(erro.status == 409){
          alert('Não é possivel atualziar o tema pois a descrição já existe!')
        }
      },
    })
  }


}
