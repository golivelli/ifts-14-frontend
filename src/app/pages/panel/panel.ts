import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.html',
  styleUrls: ['./panel.css']
})
export class PanelComponent {
  novedadForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.novedadForm = this.fb.group({
      titulo: ['', Validators.required],
      fecha: ['', Validators.required],
      creador: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipo: ['', Validators.required],
      archivo: [null],
      finalizacion: [''],
      tecnicatura: ['']
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.novedadForm.patchValue({ archivo: file });
    }
  }

  guardarBorrador() {
    console.log('Guardando como borrador', this.novedadForm.value);
  }

  subirNovedad() {
    if (this.novedadForm.valid) {
      console.log('Subiendo novedad', this.novedadForm.value);
    } else {
      this.novedadForm.markAllAsTouched();
    }
  }
}
