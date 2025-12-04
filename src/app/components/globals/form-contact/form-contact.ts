import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-form-contact',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './form-contact.html',
  styleUrl: './form-contact.css',
})
export class FormContact {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      fullnameControl: ['', [
        Validators.required, 
        Validators.minLength(5), 
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/)
      ]],
      
      emailControl: ['', [
        Validators.required, 
        Validators.email
      ]],
      
      telControl: ['', [
        Validators.required, 
        Validators.pattern(/^[0-9+\-\s]*$/),
        Validators.maxLength(15),
        Validators.minLength(8)
      ]],

      topicControl: ['three', [Validators.required]],

      comentControl: ['', [
        Validators.required
      ]]
    });
  }

  get name() { return this.contactForm.get('fullnameControl'); }
  get email() { return this.contactForm.get('emailControl'); }
  get phone() { return this.contactForm.get('telControl'); }
  get topic() { return this.contactForm.get('topicControl'); }
  get coment() { return this.contactForm.get('comentControl'); }

  submit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const formData = this.contactForm.value;

    // Llamada al backend
    fetch('https://TU_BACKEND_URL/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(() => {
        alert('Consulta enviada.');
        this.contactForm.reset();
      })
      .catch(err => {
        console.error(err);
        alert('Hubo un error al enviar la consulta.');
      });
  }

  formatPhone(event: any) {
    let value = event.target.value;

    // Remover todo lo que NO sea número
    value = value.replace(/[^\d]/g, "");

    // Limitar a máximo 10 dígitos
    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    // FORMATO AUTOMÁTICO (11 5555-1234)
    if (value.length <= 2) {
      value = value;
    } else if (value.length <= 6) {
      value = value.replace(/(\d{2})(\d{1,4})/, "$1 $2");
    } else {
      value = value.replace(/(\d{2})(\d{4})(\d{1,4})/, "$1 $2-$3");
    }

    // Poner valor formateado en el input
    event.target.value = value;

    // Actualizar formControl
    this.contactForm.get("telControl")?.setValue(value, { emitEvent: false });
  }
}
