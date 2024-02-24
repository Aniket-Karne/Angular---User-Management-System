import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userdata } from '../user.model'; 
import { DataServiceService } from 'src/app/shared/data-service.service';
@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrls: ['./user-upsert.component.css']
})
export class UserUpsertComponent implements OnInit {
  
  showadd!:boolean;
  showupdate!:boolean;

  usermodelobj:userdata = new userdata;

  alluserdata:any;

  formValue!:FormGroup;
  constructor(private formBuilder:FormBuilder, private dataservice:DataServiceService){}
  
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      fname:['', Validators.required],
      lname:['', Validators.required],
      address:['', Validators.required],
      email:['', Validators.required],
      phone:['', Validators.required]
    })
    this.getData()
  }

  add(){
    this.showadd = true;
    this.showupdate = false;
  }
  
  edit(data:any){
    this.showadd = false;
    this.showupdate = true;
    this.usermodelobj.id = data.id
    this.formValue.controls['fname'].setValue(data.fname)
    this.formValue.controls['lname'].setValue(data.lname)
    this.formValue.controls['address'].setValue(data.address)
    this.formValue.controls['email'].setValue(data.email)
    this.formValue.controls['phone'].setValue(data.phone)
  }

  update(){
    this.usermodelobj.fname = this.formValue.value.fname;
    this.usermodelobj.lname = this.formValue.value.lname;
    this.usermodelobj.address = this.formValue.value.address;
    this.usermodelobj.email = this.formValue.value.email;
    this.usermodelobj.phone = this.formValue.value.phone;
    
    this.dataservice.updateuser(this.usermodelobj, this.usermodelobj.id).subscribe(res=>{
      this.formValue.reset()
      this.getData()
      alert("Record Updated Successfully..!")
    },
    err=>{
      alert("Something Went Wrong..")
    }
    )
  }

  adduser(){
    this.usermodelobj.fname = this.formValue.value.fname;
    this.usermodelobj.lname = this.formValue.value.lname;
    this.usermodelobj.address = this.formValue.value.address;
    this.usermodelobj.email = this.formValue.value.email;
    this.usermodelobj.phone = this.formValue.value.phone;

    this.dataservice.postuser(this.usermodelobj).subscribe(res=>{
      this.formValue.reset();
      this.getData()
      alert("Record Updated Successfully !");
    },
  err=>{
    alert("Something Went Wrong")
  }  
    )
  }
  getData(){
    this.dataservice.getuser().subscribe(res=>{
      this.alluserdata = res;
    })
  }

  deleteuser(data:any){
    if(confirm("Are you sure to delete?"))
    this.dataservice.deleteuser(data.id).subscribe(res=>{
      alert("Data Deleted Successfully..")
      this.getData()
    })
  }
}
