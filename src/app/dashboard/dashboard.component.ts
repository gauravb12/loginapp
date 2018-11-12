import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	loggedData;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {

  	const httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  	this.http.post('/checkSession', {headers: httpHeaders})
  		.subscribe(data => {
  			if(data)
  				this.loggedData = data;
  			else
  				this.router.navigateByUrl('');
  		});

  }

  logout(): void {

  	const httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  	this.http.post('/logout', {headers: httpHeaders})
  		.subscribe( data => {
  			this.router.navigateByUrl(''); 
  		});
  }

}
