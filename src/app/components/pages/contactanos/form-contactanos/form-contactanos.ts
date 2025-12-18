import { Component, ViewChild } from '@angular/core';

import { FormContact } from '@/app/components/globals/form-contact/form-contact';
import { PrimaryButton } from '@/app/components/globals/primary-button/primary-button';

@Component({
  selector: 'app-form-contactanos',
  imports: [FormContact, PrimaryButton],
  templateUrl: './form-contactanos.html',
  styleUrl: './form-contactanos.css',
})
export class FormContactanos {
  @ViewChild(FormContact) formContact?: FormContact;

  enviarConsulta() {
    if (!this.formContact) {
      return;
    }
    this.formContact.submit();
  }
}

