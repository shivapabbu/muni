import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any;
  error: string = '';

  constructor(private authService: MsalService, private http: HttpClient) {}

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.http.get('https://graph.microsoft.com/v1.0/me').subscribe({
      next: (profile) => {
        this.profile = profile;
        this.error = '';
      },
      error: (err) => {
        this.error = 'Error loading profile: ' + err.message;
        console.error('Profile error:', err);
      }
    });
  }

  logout() {
    this.authService.logoutRedirect();
  }
}
