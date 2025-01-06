import { Component, inject, OnInit } from '@angular/core';
import { ProvincesService } from '../../services/provinces.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { LocalidadVo } from '../../vos/localidad-vo';

@Component({
  selector: 'app-registro-social',
  templateUrl: './registro-social.component.html',
  styleUrls: ['./registro-social.component.css'],
  standalone: true,
  imports: [DropdownModule, CommonModule, FormsModule, MessagesModule, MessageModule],
  providers: [MessageService]
})
export default class RegistroSocialComponent implements OnInit {

  meses: any[] = [];
  registroSociales: any[] = [];
  sexos: any[] = [];
  etnias: any[] = [];
  provinces: LocalidadVo[] = [];
  cantones: LocalidadVo[] = [];
  parroquias: LocalidadVo[] = [];
  selectedMes = '';
  selectedRegistroSocial = '';
  selectedSexo = '';
  selectedEtnia = '';
  selectedProvince = '';
  selectedCanton = '';
  selectedParroquia = '';
  messages: Message[] = [];

  private readonly provincesService = inject(ProvincesService);

  constructor(
    private readonly messageService: MessageService,
    private readonly primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.loadProvinces();
    this.loadMeses();
    this.loadRegistroSocial();
    this.loadSexos();
    this.loadEtnias();
  }

  loadMeses() {
    this.meses.push({ id: 1, nombre: 'ENERO' }, { id: 2, nombre: 'FEBRERO' }, { id: 3, nombre: 'MARZO' }, { id: 4, nombre: 'ABRIL' },
      { id: 5, nombre: 'MAYO' }, { id: 6, nombre: 'JUNIO' }, { id: 7, nombre: 'JULIO' }, { id: 8, nombre: 'AGOSTO' }, { id: 9, nombre: 'SEPTIEMBRE' },
      { id: 10, nombre: 'OCTUBRE' }, { id: 11, nombre: 'NOVIEMBRE' }, { id: 12, nombre: 'DICIEMBRE' }
    );
  }

  loadRegistroSocial() {
    this.registroSociales.push({ id: 1, nombre: 'POBRE' }, { id: 2, nombre: 'POBRE MODERADO' }, { id: 3, nombre: 'NO POBRE' }, { id: 4, nombre: 'POBRE EXTREMO' });
  }

  loadSexos() {
    this.sexos.push({ id: 1, nombre: 'MASCULINO' }, { id: 2, nombre: 'FEMENINO' }, { id: 3, nombre: 'OTRO' });
  }

  loadEtnias() {
    this.etnias.push({ id: 1, nombre: 'BLANCO' }, { id: 2, nombre: 'NEGRO' }, { id: 3, nombre: 'INDIGENA' }, { id: 4, nombre: 'MESTIZO' }, { id: 5, nombre: 'MULATO' });
  }


  loadProvinces(): void {
    this.provincesService.getProvinces().subscribe({
      next: (respuesta) => {
        if (respuesta.data) {
          this.provinces = respuesta.data;
        } else {
          if (respuesta.mensaje) {
            this.messageService.add({ severity: 'error', summary: 'Message:', detail: respuesta.mensaje });
          }
        }
      },
      error: (err) => {
        console.error('Error loading provinces:', err);
        this.messageService.add({ severity: 'error', summary: 'Message:', detail: 'Servicio que obtiene el listado de provincias no disponible.' });
      },
    });
  }

  onProvinceChange(): void {
    this.cantones = [];
    this.parroquias = [];
    this.selectedCanton = '';
    this.selectedParroquia = '';
    if (this.selectedProvince) {
      this.provincesService.getCantones(this.selectedProvince).subscribe({
        next: (respuesta) => {
          if (respuesta.data) {
            this.cantones = respuesta.data;
          } else {
            if (respuesta.mensaje) {
              this.messageService.add({ severity: 'error', summary: 'Message:', detail: respuesta.mensaje });
            }
          }
        },
        error: (err) => {
          console.error('Error loading cantones:', err);
          this.messageService.add({ severity: 'error', summary: 'Message:', detail: 'Servicio que obtiene el listado de cantones no disponible.' });
        },
      });
    }
  }


  onCantonChange(): void {
    this.parroquias = [];
    this.selectedParroquia = '';
    if (this.selectedCanton) {
      this.provincesService.getParroquias(this.selectedCanton).subscribe({
        next: (respuesta) => {
          if (respuesta.data) {
            this.parroquias = respuesta.data;
          } else {
            if (respuesta.mensaje) {
              this.messageService.add({ severity: 'error', summary: 'Message:', detail: respuesta.mensaje });
            }
          }
        },
        error: (err) => {
          console.error('Error loading parroquias:', err);
          this.messageService.add({ severity: 'error', summary: 'Message:', detail: 'Servicio que obtiene el listado de parroquias no disponible.' });
        },
      });
    }
  }

  enviarFormulario() {
    this.messageService.clear();
    let esValido = true;
    if (!this.selectedMes) {
      this.messageService.add({ severity: 'error', summary: 'Message:', detail: 'El campo Mes es requerido.' });
      esValido = false;
    }
    if (!this.selectedProvince) {
      this.messageService.add({ severity: 'error', summary: 'Message:', detail: 'El campo Provincia es requerido.' });
      esValido = false;
    }
    if (!this.selectedCanton) {
      this.messageService.add({ severity: 'error', summary: 'Message:', detail: 'El campo Canton es requerido.' });
      esValido = false;
    }
    if (!this.selectedParroquia) {
      this.messageService.add({ severity: 'error', summary: 'Message:', detail: 'El campo Parroquia es requerido.' });
      esValido = false;
    }
    if (!this.selectedRegistroSocial) {
      this.messageService.add({ severity: 'error', summary: 'Message:', detail: 'El campo Nivel Bienestar es requerido.' });
      esValido = false;
    }
    if (!this.selectedSexo) {
      this.messageService.add({ severity: 'error', summary: 'Message:', detail: 'El campo Sexo es requerido.' });
      esValido = false;
    }
    if (!this.selectedEtnia) {
      this.messageService.add({ severity: 'error', summary: 'Message:', detail: 'El campo Etnia es requerido.' });
      esValido = false;
    }
    if (esValido) {
      this.messageService.add({ severity: 'success', summary: 'Message:', detail: 'La informacion se envio correctamente.' });
    }
  }
}
