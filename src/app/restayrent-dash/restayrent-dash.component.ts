import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { subscribeOn } from 'rxjs/operators';
import { ApiService } from '../shared/api.service';
import { RestaurentData } from './restaurent.model';

@Component({
  selector: 'app-restayrent-dash',
  templateUrl: './restayrent-dash.component.html',
  styleUrls: ['./restayrent-dash.component.css']
})
export class RestayrentDashComponent implements OnInit {
  formValue!:FormGroup
  restaurentModelObj :RestaurentData= new RestaurentData;
  allRestaurentData : any;
  showAdd!:boolean;
  showbtn!:boolean;

  constructor(private formBuilder:FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name:[''],
      email:[''],
      mobile:[''],
      address:[''],
      services:[''],

    })
    this.getAllData()
  }
  clickAddResto(){
    this.formValue.reset();
    this.showAdd=true;
    this.showbtn=false;
  }
  addResto(){
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;
  
    this.api.postRestaurent(this.restaurentModelObj).subscribe(res=>{
      console.log(res);
      alert("Your Restaurant details has been added Successfully");
      let ref=document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.getAllData();
    },
    err=>{
      alert("Process Failed.")
    })
  }
  getAllData(){
    this.api.getRestaurent().subscribe(res=>{
      this.allRestaurentData = res; 
    })
  }
  deleteResto(data:any){
    this.api.deleteRestaurent(data.id).subscribe(res=>{
      alert("Your Restaurant Record has been Deleted Successfully")
      this.getAllData();
    }
    )
  } 

  onEditResto(data:any){
      this.showAdd=false;
      this.showbtn=true;
    this.restaurentModelObj.id=data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }
  updateResto(){
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;
  
    this.api.updateRestaurent(this.restaurentModelObj,this.restaurentModelObj.id).subscribe(res=>{
      alert("Restaurant Details has been Updated.");
      let ref=document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.getAllData();
    })
  }
}
