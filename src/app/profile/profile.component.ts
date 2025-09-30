// Required for Angular
import { Component, OnInit } from '@angular/core';
// Use MSAL to read the signed-in account without calling any API
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  welcomeMessage = '';

  constructor(private authService: MsalService) { }

  // Do NOT call any API here. Just show a welcome message.
  ngOnInit() {
    const account = this.authService.instance.getActiveAccount();
    const displayName = account?.name || account?.username || 'there';
    this.welcomeMessage = `You are signed in, ${displayName}.`;
  }
}
