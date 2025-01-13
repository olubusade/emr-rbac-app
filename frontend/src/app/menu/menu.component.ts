import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-menu',
  template: `
  <ul>
    <li *ngIf="hasPermission('Patient Records', 'viewme')">View Patient Records</li>
    <li *ngIf="hasPermission('Prescriptions', 'writeme')">Write Prescriptions</li>
    <li *ngIf="hasPermission('Appointments', 'updateme')">Update Appointments</li>
</ul>
  `
})
export class MenuComponent {
  constructor(private authService: AuthService) {}

  hasPermission(resource: string, action: string): boolean {
    const decoded = this.authService.getDecodedToken();
    return decoded.permissions.some((p: any) => p.resource === resource && p.action === action);
  }
}
