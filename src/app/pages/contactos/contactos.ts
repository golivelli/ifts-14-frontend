import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PrimaryButton } from '@/app/components/globals/primary-button/primary-button';
import { ContactMessage, ContactService } from '@/app/services/contact.service';

@Component({
  selector: 'app-contactos-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, PrimaryButton],
  templateUrl: './contactos.html',
  styleUrl: './contactos.css'
})
export class ContactosAdminComponent implements OnInit {
  messages: ContactMessage[] = [];
  filteredMessages: ContactMessage[] = [];

  loading = true;
  error = '';
  filterTerm = '';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.loading = true;
    this.error = '';

    this.contactService.getContactMessages().subscribe({
      next: (data) => {
        this.messages = data;
        this.applyFilter();
        this.loading = false;
      },
      error: () => {
        this.error = 'No pudimos cargar las consultas. Intenta nuevamente.';
        this.loading = false;
      }
    });
  }

  applyFilter(): void {
    const term = this.filterTerm.trim().toLowerCase();

    if (!term) {
      this.filteredMessages = [...this.messages];
      return;
    }

    this.filteredMessages = this.messages.filter((msg) => {
      return (
        msg.nombre.toLowerCase().includes(term) ||
        msg.email.toLowerCase().includes(term) ||
        msg.motivo.toLowerCase().includes(term) ||
        msg.telefono.toLowerCase().includes(term) ||
        msg.mensaje.toLowerCase().includes(term)
      );
    });
  }
}
