// Required for Angular
import { Component, OnInit } from '@angular/core';
// Required for the HTTP GET request to Graph
import { HttpClient } from '@angular/common/http';

type ProfileType = {
  businessPhones?: string,
  displayName?: string,
  givenName?: string,
  jobTitle?: string,
  mail?: string,
  mobilePhone?: string,
  officeLocation?: string,
  preferredLanguage?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  profile!: ProfileType;
  tokenExpiration!: string;

  constructor(
    private http: HttpClient
  ) { }

  // When the page loads, perform an HTTP GET request from the Graph /me endpoint
  ngOnInit() {
    console.log('🔍 ProfileComponent: Starting to fetch user profile data...');
    alert('🔍 Fetching your profile data from Microsoft Graph API...');
    
    this.http.get('https://graph.microsoft.com/v1.0/me')
      .subscribe({
        next: (profile) => {
          console.log('✅ ProfileComponent: Successfully fetched profile data:', profile);
          alert('✅ Profile data loaded successfully!');
          this.profile = profile;
        },
        error: (error) => {
          console.error('❌ ProfileComponent: Error fetching profile:', error);
          alert('❌ Error loading profile: ' + error.message);
        }
      });
    
    this.tokenExpiration = localStorage.getItem('tokenExpiration')!;
    console.log('🔑 ProfileComponent: Token expiration:', this.tokenExpiration);
  }
}
