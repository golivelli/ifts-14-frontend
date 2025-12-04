import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-frequently-asked',
  imports: [RouterLink, MatExpansionModule],
  templateUrl: './frequently-asked.html',
  styleUrl: './frequently-asked.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrequentlyAsked {
  readonly panelOpenState = signal(false);
}
