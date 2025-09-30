import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

// MSAL imports
import { MsalModule, MsalInterceptor, MsalGuard, MsalService, MsalBroadcastService, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalInterceptorConfiguration } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';

// MSAL configuration
export function MSALInstanceFactory() {
  return new PublicClientApplication({
    auth: {
      
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: false
    },
    system: {
      loggerOptions: {
        loggerCallback: (level, message, containsPii) => {
          if (containsPii) {
            return;
          }
          switch (level) {
            case 0: // LogLevel.Error
              console.error(message);
              return;
            case 1: // LogLevel.Warning
              console.warn(message);
              return;
            case 2: // LogLevel.Info
              console.info(message);
              return;
            case 3: // LogLevel.Verbose
              console.debug(message);
              return;
          }
        }
      }
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  // No protected resources needed; app does not call Graph or any API
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
    MsalBroadcastService,
    MsalGuard,
    MsalInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
