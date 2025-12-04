import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrimaryButton } from '../../components/globals/primary-button/primary-button';

@Component({
    selector: 'app-panel-selection',
    standalone: true,
    imports: [PrimaryButton],
    templateUrl: './panel-selection.html',
    styleUrl: './panel-selection.css'
})
export class PanelSelectionComponent {

    constructor(private router: Router) { }

    navigateTo(path: string) {
        this.router.navigate([path]);
    }
}
