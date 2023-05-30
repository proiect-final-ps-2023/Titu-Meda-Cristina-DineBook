import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ScriptService } from 'src/app/services/script/script.service';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.css']
})
export class NavAdminComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private scriptService: ScriptService
    ) {}

  ngOnInit(): void {
    this.scriptService.loadScript();
  }

  submit_logout(): void {
    this.authService.logout();
  }

}
