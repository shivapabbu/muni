import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

// MSAL imports
import { MsalModule, MsalInterceptor, MsalGuard, MsalService, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalInterceptorConfiguration } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';

// MSAL configuration
export function MSALInstanceFactory() {
  return new PublicClientApplication({
    auth: {
      clientId: 'YOUR_APPLICATION_CLIENT_ID', // Replace with your Application (client) ID
      authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID', // Replace with your Directory (tenant) ID
      redirectUri: 'http://localhost:4200/'
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: false
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MsalModule
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
