# MSAL Angular Tutorial

This is a sample Angular single-page application (SPA) that demonstrates Microsoft Authentication Library (MSAL) integration with Microsoft Entra ID (formerly Azure Active Directory).

## Prerequisites

- Node.js (version 16 or later)
- npm (version 6 or later)
- Angular CLI (version 17 or later)
- A Microsoft Entra ID tenant

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Register Application in Microsoft Entra ID

1. Navigate to the [Microsoft Entra admin center](https://entra.microsoft.com/)
2. Go to **Azure Active Directory** > **App registrations**
3. Click **New registration**
4. Configure the application:
   - **Name**: `msal-angular-tutorial`
   - **Supported account types**: Select "Accounts in this organizational directory only"
   - **Redirect URI**: Select "Single-page application (SPA)" and enter `http://localhost:4200/`
5. Click **Register**
6. Copy the **Application (client) ID** and **Directory (tenant) ID** from the Overview page

### 3. Configure the Application

1. Open `src/app/app.module.ts`
2. Replace `YOUR_APPLICATION_CLIENT_ID` with your Application (client) ID
3. Replace `YOUR_TENANT_ID` with your Directory (tenant) ID

### 4. Configure API Permissions

1. In the Microsoft Entra admin center, go to your app registration
2. Navigate to **API permissions**
3. Click **Add a permission**
4. Select **Microsoft Graph**
5. Choose **Delegated permissions**
6. Add the following permissions:
   - `User.Read` (to read user profile)
7. Click **Add permissions**
8. Click **Grant admin consent** (if you have admin rights)

### 5. Run the Application

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser.

## Features

- **Home Page**: Landing page with sign-in/sign-out functionality
- **Profile Page**: Displays user profile information from Microsoft Graph
- **Authentication**: Secure authentication using Microsoft Entra ID
- **Responsive Design**: Bootstrap-based UI that works on all devices

## Project Structure

```
src/
├── app/
│   ├── home/                 # Home component
│   │   ├── home.component.ts
│   │   ├── home.component.html
│   │   └── home.component.css
│   ├── profile/              # Profile component
│   │   ├── profile.component.ts
│   │   ├── profile.component.html
│   │   └── profile.component.css
│   ├── app.module.ts         # Main app module with MSAL configuration
│   ├── app-routing.module.ts # Routing configuration
│   ├── app.component.ts      # Root component
│   ├── app.component.html    # Root template
│   └── app.component.css     # Root styles
├── assets/                   # Static assets
├── index.html               # Main HTML file
├── main.ts                  # Application entry point
└── styles.css               # Global styles
```

## Key Components

### MSAL Configuration

The application uses MSAL for Angular with the following configuration:

- **Client ID**: Your registered application's client ID
- **Authority**: Microsoft Entra ID tenant endpoint
- **Redirect URI**: `http://localhost:4200/`
- **Cache Location**: Local storage
- **Interaction Type**: Redirect flow

### Authentication Flow

1. User clicks "Sign In" on the home page
2. User is redirected to Microsoft Entra ID login page
3. After successful authentication, user is redirected back to the application
4. User can access the profile page to view their information
5. User can sign out at any time

### API Integration

The profile component fetches user data from Microsoft Graph API using the `/me` endpoint, which requires the `User.Read` permission.

## Troubleshooting

### Common Issues

1. **"Invalid client" error**: Check that your client ID is correct in `app.module.ts`
2. **"Invalid redirect URI" error**: Ensure the redirect URI in your app registration matches `http://localhost:4200/`
3. **"Insufficient privileges" error**: Make sure you've granted the `User.Read` permission and admin consent
4. **CORS errors**: This is normal for SPA applications - MSAL handles CORS automatically

### Development Tips

- Use browser developer tools to inspect network requests and console errors
- Check the Microsoft Entra admin center for detailed error logs
- Ensure your tenant allows the application registration

## Next Steps

- Add more Microsoft Graph API calls
- Implement role-based access control
- Add error handling and loading states
- Customize the UI theme and branding
- Deploy to Azure Static Web Apps

## Resources

- [Microsoft Entra ID Documentation](https://docs.microsoft.com/en-us/azure/active-directory/)
- [MSAL for Angular Documentation](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-angular)
- [Microsoft Graph API Documentation](https://docs.microsoft.com/en-us/graph/)
