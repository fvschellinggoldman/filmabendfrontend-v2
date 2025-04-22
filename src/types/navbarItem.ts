export type NavbarItem = {
  label: string;
  url: string;
  icon?: React.ReactNode;
  dropDownItems?: NavbarItem[]; // Internal links shouldn't have dropdowns again
};
