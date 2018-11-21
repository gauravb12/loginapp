import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	loggedData;

  players = [
    'player1',
    'player2',
    'player3',
    'player4',
    'player5'
  ];

  team1 = ['player6'];
  team2 = ['player7'];
  team3 = ['player8'];

  drop(event: CdkDragDrop<string[]>) {
    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

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
