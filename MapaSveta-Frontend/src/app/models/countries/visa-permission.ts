export class VisaPermissionCountry {
  cca2: string;
  cca3: string;
  ccn3: string;
  csvc: string;
  jurisdiction: string;
  name: string;
  requirements: object;
}

export class VisaPermission {
  conflict: object[];
  note: string;
  permission: string;
  required: VisaPermissionRequirement;

}

export class VisaPermissionRequirement {
  passport_blank_pages: number;
  passport_expiry: number;
}
