import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Manager } from 'src/app/models/manager.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ManagerService } from 'src/app/services/manager/manager.service';

@Component({
  selector: 'app-home-manager',
  templateUrl: './home-manager.component.html',
  styleUrls: ['./home-manager.component.css']
})
export class HomeManagerComponent {
  public manager?: Manager;

  constructor(
    private managerService: ManagerService,
    private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if(user != null) {
      this.getManagerById(user.id);
    }
  }

  public async getManagerById(id: string) {
    const manager$ = this.managerService.getManager(id);
    this.manager = await lastValueFrom(manager$);
  }
}
