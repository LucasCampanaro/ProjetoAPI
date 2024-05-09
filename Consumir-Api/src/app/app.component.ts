import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pessoa } from './models/pessoa';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Consumir-Api';
  http = inject(HttpClient);
  urlApi = 'http://localhost:5115';

  //Listar
  pessoas$?: Observable<Pessoa[]>;

  //Busca
  pessoaEncontrada$?: Observable<Pessoa>;
  valorBuscaPessoa = '';

  //Adiciona
  nomeAdicionar = '';
  emailAdicionar = '';
  cpfAdicionar = '';

  //Atualizar
  idAtualizar = '';
  nomeAtualizar = '';

  ngOnInit(): void {
    this.obterPessoas();
  }

  obterPessoas(){
    this.pessoas$ = this.http.get<Pessoa[]>(`${this.urlApi}/pessoas`)
  }

  obterPessoaEspecifica() {
    if (!this.valorBuscaPessoa)
      return;

    this.pessoaEncontrada$ = this.http.get<Pessoa>(`${[this.urlApi]}/pessoas/${this.valorBuscaPessoa}`)
  }

  adicionarPessoa(){
    if (!this.nomeAdicionar)
      return;

    const pessoaCriar: Pessoa = {
      id: '5f625921-e60e-408f-a878-ce98befafcbe',
      nome: this.nomeAdicionar,
      email: 'email@email.com',
      cpf: '000.000.000-00',
    }

    this.http.post<void>(`${this.urlApi}/pessoas`, pessoaCriar)
    .subscribe(_ => {
      this.obterPessoas()
      this.nomeAdicionar = '';
  });
  }

  obterDadosAtualizar(pessoa: Pessoa){
    this.idAtualizar = pessoa.id;
    this.nomeAtualizar = pessoa.nome;
  }

  atualizarNome(){
    if (!this.nomeAtualizar || !this.idAtualizar)
      return;

    const pessoa: Pessoa = { 
      id: this.idAtualizar, 
      nome: this.nomeAtualizar,
      email: '',
      cpf: ''
    }

    const url = `${this.urlApi}/pessoas/${this.idAtualizar}`;

    this.http.put<Pessoa>(url, pessoa)
    .subscribe(_ => {
       this.obterPessoas()
       this.nomeAtualizar = '';
    })
  }
}
