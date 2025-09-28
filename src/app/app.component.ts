import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, AuthenticationResult } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loginDisplay = false;

  constructor(
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) { }

  async ngOnInit(): Promise<void> {
    console.log('🚀 AppComponent: Initializing authentication...');
    alert('App is initializing authentication system...');
    
    // Initialize MSAL first
    try {
      await this.authService.instance.initialize();
      console.log('✅ MSAL initialized successfully');
      alert('✅ Authentication system initialized successfully!');
    } catch (error) {
      console.error('❌ MSAL initialization failed:', error);
      alert('❌ Authentication system initialization failed: ' + error);
      return;
    }
    
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
        console.log('✅ AppComponent: Login successful!', result);
        alert('✅ Login successful! Welcome to the app!');
        const payload = result.payload as AuthenticationResult;
        this.authService.instance.setActiveAccount(payload.account);
        this.setLoginDisplay();
      });

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_FAILURE),
      )
      .subscribe((result: EventMessage) => {
        console.error('❌ AppComponent: Login failed!', result);
        alert('❌ Login failed: ' + (result.error?.message || 'Unknown error'));
      });

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGOUT_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
        console.log('👋 AppComponent: Logout successful!', result);
        alert('👋 Logout successful! You have been signed out.');
        this.setLoginDisplay();
      });

    this.setLoginDisplay();
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
    console.log('🔍 AppComponent: Login display status:', this.loginDisplay);
    console.log('👤 AppComponent: Active accounts:', this.authService.instance.getAllAccounts());
  }

  async login() {
    console.log('🔐 AppComponent: Initiating login redirect...');
    alert('🔐 Redirecting to Microsoft Entra ID for authentication...');
    
    try {
      // Ensure MSAL is initialized before login
      if (!this.authService.instance.getConfiguration()) {
        await this.authService.instance.initialize();
      }
      this.authService.loginRedirect();
    } catch (error) {
      console.error('❌ Login failed:', error);
      alert('❌ Login failed: ' + error);
    }
  }

  logout() {
    console.log('AppComponent: Initiating logout redirect...');
    alert('Signing you out...');
    this.authService.logoutRedirect();
  }
}
