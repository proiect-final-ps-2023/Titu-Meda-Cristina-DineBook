import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { Manager } from 'src/app/models/manager.model';
import { ManagerService } from 'src/app/services/manager/manager.service';

@Component({
  selector: 'app-manage-managers',
  templateUrl: './manage-managers.component.html',
  styleUrls: ['./manage-managers.component.css']
})
export class ManageManagersComponent implements OnInit {
  public managers!: Manager[];
  public fullName: string = "";
  closeResult?: string;
  editForm!: FormGroup;

  constructor(
    private managerService: ManagerService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.getManagers();
    this.editForm = this.formBuilder.group({
      id: [''],
      username: [''],
      password: [''],
      fullName: [''],
      email: [''],
      phoneNo: [''],
      country: [''],
      city: ['']
    });
  }

  public getManagers(): void {
    this.managerService.getManagers().subscribe(
      (response: Manager[]) => {
        this.managers = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public async searchManagersByFullName(name: string): Promise<void> {
    this.managers = [];
    if(name == "") {
      this.getManagers();
    } else {
      const managers$ = this.managerService.getManagersByFullName(name);
      this.managers = await lastValueFrom(managers$);
    }
  }

  public onAddManager({ value }: { value: Manager}): void {
    //document.getElementById('add-admin-form')?.click();
    this.managerService.saveManager(value).subscribe(
      (response: Customer) => {
        this.getManagers();
        //addForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        alert(error.message);
        //addForm.reset();
      }
    );
  }

  public onEditManager(targetModal:any, manager: Manager) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm?.patchValue( {
      id: manager.id,
      username: manager.username,
      password: manager.password,
      fullName: manager.fullName,
      email: manager.email,
      phoneNo: manager.phoneNo,
      country: manager.country,
      city: manager.city
    });
  }

  public onUpdateManager() {
    this.managerService.updateManager(this.editForm?.getRawValue()).subscribe(
      (response: Manager) => {
        this.getManagers();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        alert(error.message);
      }
    );
  }

  public onDeleteManager(managerId: string): void {
    this.managerService.deleteManager(managerId).subscribe(
      (response: void) => {
        this.getManagers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public open(content: any) {
    this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
