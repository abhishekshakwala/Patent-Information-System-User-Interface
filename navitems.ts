export interface NavItems {
  displayName: string;
  disabled?: boolean;
  route?: string;
  children?: NavItems[];
}
