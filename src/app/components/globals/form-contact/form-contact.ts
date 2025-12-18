import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { finalize } from 'rxjs/operators';
import { ContactRequest, ContactService } from '@/app/services/contact.service';

@Component({
  selector: 'app-form-contact',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './form-contact.html',
  styleUrl: './form-contact.css',
})
export class FormContact {
  contactForm: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  private topicLabels: Record<string, string> = {
    one: 'Sistemas Embebidos e IoT',
    two: 'Eficiencia Energética',
    three: 'Otra consulta'
  };

  constructor(private fb: FormBuilder, private contactService: ContactService) {
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
      this.errorMessage = 'Revisá los campos obligatorios.';
      return;
    }

    const formValue = this.contactForm.value;
    const topicKey = (formValue.topicControl || 'three') as keyof typeof this.topicLabels;
    const payload: ContactRequest = {
      nombre: formValue.fullnameControl,
      email: formValue.emailControl,
      telefono: formValue.telControl,
      motivo: this.topicLabels[topicKey] ?? this.topicLabels['three'],
      mensaje: formValue.comentControl
    };

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.contactService.sendContact(payload)
      .pipe(finalize(() => this.isSubmitting = false))
      .subscribe({
        next: () => {
          this.successMessage = 'Recibimos tu consulta. Te contactaremos pronto.';
          this.errorMessage = '';
          this.contactForm.reset({
            fullnameControl: '',
            emailControl: '',
            telControl: '',
            topicControl: 'three',
            comentControl: ''
          });
          this.contactForm.markAsPristine();
          this.contactForm.markAsUntouched();
        },
        error: (error) => {
          console.error('Error al enviar la consulta de contacto', error);
          this.errorMessage = 'No pudimos enviar la consulta. Intentá nuevamente en unos minutos.';
        }
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
