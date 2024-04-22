export interface MaintenanceInfo {
  end_at?: number;
  message?: string;
  short_message?: string;
  title?: string;
  type?: 'scheduled_maintenance';
}

export interface MaintenanceState {
  isMaintenance: boolean;
  maintenanceInfo: MaintenanceInfo;
}
