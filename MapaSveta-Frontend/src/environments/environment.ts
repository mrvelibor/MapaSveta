// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  googleClientId: '967367361769-37tqjbpm1q9b0b788tpi883dlpolft7d.apps.googleusercontent.com',
  googleScope: 'profile email https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.me',
  facebookAppId: '111838979568883',
  facebookGraphVersion: 'v2.11',
  facebookScope: 'public_profile, email, user_birthday, user_hometown, user_location'
};
