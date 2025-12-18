import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonTone = 'primary' | 'secondary';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonIconPosition = 'left' | 'right' | 'none';

@Component({
  selector: 'app-primary-button',
  imports: [CommonModule, MatIcon, RouterLink],
  templateUrl: './primary-button.html',
  styleUrl: './primary-button.css'
})
export class PrimaryButton {
  /* Texto del botón */
  @Input() label: string = "Button";

  /* Variante visual */
  @Input() variant: ButtonVariant = 'primary';
  @Input() tone: ButtonTone = 'primary';

  /* Tamaño */
  @Input() size: ButtonSize = 'medium';

  /* Estado deshabilitado */
  @Input() disabled: boolean = false;

  /* Ícono opcional (por ejemplo: nombre del ícono o clase SVG) */
  @Input() icon?: string;

  /* Posición del ícono (left, right, none) */
  @Input() iconPosition: ButtonIconPosition = 'none';

  @Input() active: boolean = false;

  /* Navegación opcional */
  @Input() routerLink?: string | any[];
  @Input() queryParams?: Record<string, any>;

  /* Evento click */
  @Output() onClick = new EventEmitter<Event>();

  handleClick(event: Event) {
    if (!this.disabled) {
      this.onClick.emit(event);
    }
  }

  /* Devuelve las clases CSS finales dinámicamente */
  get classes(): string {
    return [
      'btn',
      this.variant === 'outline'
        ? `btn--outline-${this.tone}`
        : `btn--${this.variant}`,
      `btn--${this.size}`,
      this.iconPosition !== 'none' ? `btn--icon-${this.iconPosition}` : '',
      this.disabled ? 'btn--disabled' : '',
    ]
    .filter(Boolean)
    .join(' ');
  }
}
