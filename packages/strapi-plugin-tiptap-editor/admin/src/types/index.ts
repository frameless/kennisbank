import strapiTheme from '../components/theme.json'

export type Theme = typeof strapiTheme;

export interface TableAction {
  label: string;
  command: string;
  icon: React.ReactNode;
  destructive?: boolean;
}

export interface ActionGroup {
  label: string;
  icon: React.ReactNode;
  actions: TableAction[];
}