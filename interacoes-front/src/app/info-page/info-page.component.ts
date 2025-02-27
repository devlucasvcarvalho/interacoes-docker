import {
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { AcoesService } from '../services/acoes.service';

@Component({
  selector: 'ds-info-page',
  standalone: true,
  imports: [],
  templateUrl: './info-page.component.html',
  styleUrl: './info-page.component.scss',
})
export class InfoPageComponent implements OnInit {
  banner = 'assets/pin.svg';
  municipio = '';
  localizacao = '';
  acaoNome = '';
  interacoes: any;
  filteredInteracao: any = {};
  acaoEscolhida: any;
  coordenadas: any;

  constructor(
    private router: ActivatedRoute,
    private acoesService: AcoesService,
    private cdr: ChangeDetectorRef,
    private router2: Router) { }

  ngOnInit(): void {
    this.municipio = this.router.snapshot.paramMap.get('municipio') || '';
    this.acaoNome = this.router.snapshot.paramMap.get('acao') || '';
    this.loadInteracoes();
  }

  backToHome() {
    this.router2.navigate(['/']);
  }

  loadInteracoes(): void {
    this.acoesService.getAcoes().subscribe((data) => {
      this.interacoes = data;
      const municipioEncontrado = this.interacoes
        .flatMap((a: any) => a.municipios)
        .find((b: any) => {
          return b.municipio.replace(/\s+/g, '') === this.municipio;
        });

      if (municipioEncontrado){
        this.coordenadas = municipioEncontrado.coordenadas;
        this.localizacao = municipioEncontrado.nome;
      }

      if (!municipioEncontrado) {
        console.error('Município não encontrado:', this.municipio);
        return;
      }

      const acoesFiltradas = municipioEncontrado.acoes.find((acao: any) => {
        if (acao.acao.includes('/')) {
          return acao.acao.replace(/\s+/g, '').split('/')[0] === this.acaoNome.replace(/\s+/g, '');
        } else {
          return acao.acao.replace(/\s+/g, '') === this.acaoNome.replace(/\s+/g, '');
        }

      },
      );

      if (!acoesFiltradas) {
        console.error('Ação não encontrada:', this.acaoNome);
        return;
      }

      this.acaoEscolhida = acoesFiltradas;

      if (this.acaoEscolhida.banner !== '') {
        this.banner = 'assets/images/' + this.acaoEscolhida.banner;
      }

      // Força a atualização da view
      this.cdr.detectChanges();
    });
  }

  filterByMunicipio = (municipio: string) => {

  };
}
