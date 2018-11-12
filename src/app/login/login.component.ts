import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	errMsg = "";

	loginForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required]),
	});

	loginUser(): void {
		this.errMsg = "";

		const httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

		this.http.post('/login', JSON.stringify(this.loginForm.value), {headers: httpHeaders})
			.subscribe(data => {
				if(data)
					this.router.navigateByUrl('dashboard');
				else
					this.errMsg = "Incorrect Details.";
			});
	} 

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {

  	const httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  	this.http.post('/checkSession', {headers: httpHeaders})
  		.subscribe(data => {
  			if(data)
  				this.router.navigateByUrl('dashboard');
  		});
  }

}
