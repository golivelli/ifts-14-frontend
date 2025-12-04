import { Component, ViewChild } from '@angular/core';

import { FormContact } from '@/app/components/globals/form-contact/form-contact';
import { PrimaryButton } from '@/app/components/globals/primary-button/primary-button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-contactanos',
  imports: [FormContact, PrimaryButton],
  templateUrl: './form-contactanos.html',
  styleUrl: './form-contactanos.css',
})
export class FormContactanos {
  @ViewChild(FormContact) formContact!: FormContact;

  constructor(private router: Router) {}

  enviarConsulta() {
    this.formContact.submit();

    console.log("VALORES DEL FORMULARIO:", this.formContact.contactForm.value);

    // if (this.formContact.contactForm.valid) {
    //   this.router.navigate(['/contactanos']);
    // }
  }
}

