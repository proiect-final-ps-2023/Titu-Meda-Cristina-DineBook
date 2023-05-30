import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ScriptService } from 'src/app/services/script/script.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  public admin?: Admin;
  public input: string = "";
  private webSocket: WebSocket;
  notif: string = "";

  constructor(
    private scriptService: ScriptService,
    private adminService: AdminService,
    private authService: AuthService) {
      this.webSocket = new WebSocket('ws://localhost:8080/logged-users');
      this.webSocket.onmessage = (event) => {
      this.notif = event.data;
      };
    }

  ngOnInit(): void {
    this.scriptService.loadScript();
    const user = this.authService.getCurrentUser();
    if(user != null) {
      this.getAdminById(user.id);
    }
  }

  public async getAdminById(id: string) {
    const admin$ = this.adminService.getAdmin(id);
    this.admin = await lastValueFrom(admin$);
  }
}
