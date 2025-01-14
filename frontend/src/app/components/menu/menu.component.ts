import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  permissions: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.permissions = this.authService.getPermissions();
  }

  hasPermission(permission: string): boolean {
    return this.permissions[permission] === true;
  }
}
