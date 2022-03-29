import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LoginFormComponent } from 'src/app/modules/login/login-form/login-form.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  breadcrump: string[] = []

  user:string|null="user"; //This user is a mockup to be replaced with a real user object when that exists
  constructor(
    private modalService: NgbModal, 
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private bc: CommonService
  ) {}

  ngOnInit(): void {
    this.user ? this.auth.setUserLogged(true) : this.auth.setUserLogged(false)   // To be replaced when user login works
    this.breadcrump = this.bc.breadcrump
  }

  // This function opens login component modal service
  public openLoginForm() {
    const modalRef = this.modalService.open(LoginFormComponent, {
      windowClass: 'modal-holder',
      modalDialogClass:'modal-sizer',
      centered: true,
    });
  }

  logout(){
    this.auth.setUserLogged(false)
    this.user=null;
  }

  changeBc(value: string){
    if(this.breadcrump.includes(value)){
      this.breadcrump.find((route, i) => {
        if(route == value){
          this.breadcrump.splice(1+i,this.breadcrump.length)
        }
      })
    }
  }


}
