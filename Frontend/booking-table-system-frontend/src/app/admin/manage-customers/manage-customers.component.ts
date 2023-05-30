import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.css']
})
export class ManageCustomersComponent {
  public customers!: Customer[];
  public fullName: string = "";
  closeResult?: string;
  editForm!: FormGroup;

  constructor(
    private customerService: CustomerService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.getCustomers();
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

  public getCustomers(): void {
    this.customerService.getCustomers().subscribe(
      (response: Customer[]) => {
        this.customers = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public async searchCustomersByFullName(name: string): Promise<void> {
    this.customers = [];
    if(name == "") {
      this.getCustomers();
    } else {
      const customers$ = this.customerService.getCustomersByFullName(name);
      this.customers = await lastValueFrom(customers$);
    }
  }

  public onAddCustomer({ value }: { value: Customer}): void {
    //document.getElementById('add-admin-form')?.click();
    this.customerService.saveCustomer(value).subscribe(
      (response: Customer) => {
        this.getCustomers();
        //addForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        alert(error.message);
        //addForm.reset();
      }
    );
  }

  public onEditCustomer(targetModal:any, customer: Customer) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm?.patchValue( {
      id: customer.id,
      username: customer.username,
      password: customer.password,
      fullName: customer.fullName,
      email: customer.email,
      phoneNo: customer.phoneNo,
      country: customer.country,
      city: customer.city
    });
  }

  public onUpdateCustomer() {
    this.customerService.updateCustomer(this.editForm?.getRawValue()).subscribe(
      (response: Customer) => {
        this.getCustomers();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        alert(error.message);
      }
    );
  }

  public onDeleteCustomer(cusromerId: string): void {
    this.customerService.deleteCustomer(cusromerId).subscribe(
      (response: void) => {
        this.getCustomers();
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

  public exportCustomersToXML() {
    this.getCustomers();
    this.customerService.saveCustomersXML(this.customers).subscribe(
      (response: void) => {
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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
