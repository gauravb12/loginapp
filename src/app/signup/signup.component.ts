import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public dialog: MatDialog, private http: HttpClient, private router: Router) { }

  ngOnInit() {
  	const httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  	this.http.post('/checkSession', {headers: httpHeaders})
  		.subscribe(data => {
  			if(data)
  				this.router.navigateByUrl('dashboard');
  		});
  }

  openSignupModal(): void { 
  	const dialogBox = this.dialog.open(SignupDialog);
  }

}


@Component({
	selector: 'signup-dialog',
	templateUrl: 'dialog.html',
})
export class SignupDialog {

	errMsg = "";

	constructor(public dialogBox: MatDialogRef<SignupDialog>, private http: HttpClient, private router: Router) { }

	signupForm = new FormGroup({
		firstName: new FormControl('', [Validators.required]),
		lastName: new FormControl('', [Validators.required]),
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required]),
	});

	submitSignup(): void {

		this.errMsg = "";

		const httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

		this.http.post('/signup', JSON.stringify(this.signupForm.value), {headers: httpHeaders})
			.subscribe(data => {
				console.log(data);
				if(data){
					this.onCloseClick();
					this.router.navigateByUrl('dashboard');
				}
				else
					this.errMsg = "This email is already registered.";
			});	
	}

	onCloseClick(): void {
		this.dialogBox.close();
	}
}