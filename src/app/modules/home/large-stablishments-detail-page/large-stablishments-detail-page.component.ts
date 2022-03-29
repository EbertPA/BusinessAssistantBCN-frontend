import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LargeStablishmentsService } from 'src/app/services/large-stablishments.service'
import { LargeStablishmentModel } from '../../../models/large-stablishment.model';
import { LoginFormComponent } from 'src/app/modules/login/login-form/login-form.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-large-stablishments-detail-page',
  templateUrl: './large-stablishments-detail-page.component.html',
  styleUrls: ['./large-stablishments-detail-page.component.css'],
})
export class LargeStablishmentsDetailPageComponent implements OnInit {
  LargeEstablishmentsData: LargeStablishmentModel[] = []

  constructor(
    private LargeEstablishmentService: LargeStablishmentsService,
    private auth: AuthenticationService,
    private modalService: NgbModal, 
    private fb:FormBuilder,
    private _bc: CommonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.LargeEstablishmentService.sendSelectedData()
      .subscribe((resp: any) => {
        this.LargeEstablishmentsData = resp.results;
        console.log("resp desde detail page: ",resp.results)
      });

    //breadcrump
    let path = this.route.routeConfig?.path
    if(!this._bc.breadcrump.includes(path!)){
      this._bc.breadcrump.push(path!)
    }
    
  }

  ngOnDestroy() {
    // if( this.zones$ != undefined ) this.zones$.unsubscribe();
  }

  // This function opens login component modal service
  public openLoginForm() {
    const modalRef = this.modalService.open(LoginFormComponent, {
      windowClass: 'modal-holder',
      modalDialogClass:'modal-sizer',
      centered: true,
    });
  }

  // Save Search Modal Form
  saveSearchForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    detalles: ['', Validators.required]
  })
  private submitted: boolean = false;

  // Save Search Modal Behavior
  open( modal: any ){
    if( !this.userLogged() ){ return }   // To be replaced when user login works
    this.submitted = false;
    this.saveSearchForm.reset()
    this.modalService.open(modal, { centered: true,})
  }

  // To be replaced when user login works
  userLogged():boolean {
    if( !this.auth.userLogged ){
      this.openLoginForm()
      return false;
    }
    return true
  }

  closeModal(){
    this.modalService.dismissAll();
  }

  inputInvalid( input: string ): boolean {
    return  this.saveSearchForm.controls[input].invalid && this.submitted
  }

  onSubmit(){
    if( this.saveSearchForm.invalid ){
      this.submitted = true
      return
    }
    console.log( this.saveSearchForm.value );
    this.closeModal()
  }
}