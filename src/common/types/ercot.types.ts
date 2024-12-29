export interface AddressSuggestion {
  readonly address: string;
  readonly city: string;
  readonly state: string;
  readonly zip: string;
}

export interface AddressSearchParams {
  readonly search: string;
} 