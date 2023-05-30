import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/admin.model';
import { AdminService } from 'src/app/services/admin/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-manage-admins',
  templateUrl: './manage-admins.component.html',
  styleUrls: ['./manage-admins.component.css']
})
export class ManageAdminsComponent implements OnInit {

  public admins!: Admin[];
  public fullName: string = "";
  closeResult?: string;
  editForm!: FormGroup;

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.getAdmins();
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

  public getAdmins(): void {
    this.adminService.getAdmins().subscribe(
      (response: Admin[]) => {
        this.admins = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public async searchAdminsByFullName(name: string): Promise<void> {
    this.admins = [];
    if(name == "") {
      this.getAdmins();
    } else {
      const admins$ = this.adminService.getAdminsbyFullName(name);
      this.admins = await lastValueFrom(admins$);
    }
  }

  public onAddAdmin({ value }: { value: Admin}): void {
    //document.getElementById('add-admin-form')?.click();
    this.adminService.saveAdmin(value).subscribe(
      (response: Admin) => {
        this.getAdmins();
        //addForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        alert(error.message);
        //addForm.reset();
      }
    );
  }

  onEditAdmin(targetModal:any, admin: Admin) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm?.patchValue( {
      id: admin.id,
      username: admin.username,
      password: admin.password,
      fullName: admin.fullName,
      email: admin.email,
      phoneNo: admin.phoneNo,
      country: admin.country,
      city: admin.city
    });
  }

  onUpdateAdmin() {
    this.adminService.updateAdmin(this.editForm?.getRawValue()).subscribe(
      (response: Admin) => {
        this.getAdmins();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        alert(error.message);
      }
    );
  }

  public onDeleteAdmin(adminId: string): void {
    this.adminService.deleteAdmin(adminId).subscribe(
      (response: void) => {
        this.getAdmins();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  open(content: any) {
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
