import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { Produto } from '../types/produto';


  const items: Produto[] = [
    {
      "id": "1",
      "nome": "Camiseta",
      "quantidade": 2,
      "preco": "50.00"
    },
    {
      "id": "2",
      "nome": "Calça Jeans",
      "quantidade": 1,
      "preco": "120.00"
    },
    {
      "id": "3",
      "nome": "Tênis",
      "quantidade": 3,
      "preco": "80.00"
    },
    {
      "id": "4",
      "nome": "Livro",
      "quantidade": 4,
      "preco": "35.00"
    },
    {
      "id": "5",
      "nome": "Caneta",
      "quantidade": 10,
      "preco": "5.00"
    }
  ];

  const itemsJSON = JSON.stringify(items);

  interface FormasDePagamento {
    value: string;
    viewValue: string;
  }

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTableModule,
    FormsModule,
    MatSelectModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit{
  displayedColumns: string[] = ['id', 'nome', 'preco', 'quantidade', 'acao'];

  listaDeProdutos: Produto[] =  items;

  formasDePagamento: FormasDePagamento[] = [
    {value: '0', viewValue: 'Dinheiro'},
    {value: '1', viewValue: 'Pix'},
    {value: '2', viewValue: 'Cartao'},
    {value: '3', viewValue: 'Boleto'}
  ]

  vendaForm = this.formBuilder.group({
    nome: [''],
    data: [''],
    formaDePagamento: ['']
  })


  constructor(private formBuilder: FormBuilder) {

  }
  ngOnInit(): void {
    if (typeof window !==  'undefined' && window.localStorage) {
      localStorage.setItem('listaProdutos', itemsJSON)
    }
  }

  atualizarListaDeProdutos() {
    if (typeof window !==  'undefined' && window.localStorage) {
      const listaProdutos = localStorage.getItem('listaProdutos');
      this.listaDeProdutos = JSON.parse(listaProdutos!) as Produto[];
    } else {
      console.warn('localStorage not available');
    }
  }

  removerProdutoDaLista(id: string) {
    if (typeof window !==  'undefined' && window.localStorage) {
      const listaProdutosJSON = localStorage.getItem('listaProdutos');
      if (!listaProdutosJSON) {
        return; // Sai caso não haja lista armazenada
      }

      let listaProdutos: Produto[] = JSON.parse(listaProdutosJSON);

      listaProdutos = listaProdutos.filter(produto => produto.id !== id);

      localStorage.setItem('listaProdutos', JSON.stringify(listaProdutos));

      this.listaDeProdutos = listaProdutos;
    }
  }
}
