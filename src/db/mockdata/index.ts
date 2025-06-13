
export * from './users';
export * from './stores';
export * from './menu';
export * from './content';
export * from './personnel';
export * from './types';

// Re-export specific items for easier imports
export { mockUsers, type User } from './users';
export { mockStores, type Store } from './stores';
export { mockMenu, type MenuItem, type MenuCategory } from './menu';
export { mockHistoryContent, mockEvents, type HistoryContent, type Event } from './content';
export { 
  mockTimeEntries, 
  mockPersonnelPayments, 
  mockUserPermissions,
  mockPersonalInfo,
  mockBankInfo,
  mockWorkSchedules,
  mockAccessCodes,
  availableModules,
  type TimeEntry, 
  type PersonnelPayment, 
  type UserPermission,
  type PersonalInfo,
  type BankInfo,
  type WorkSchedule,
  type AccessCode
} from './personnel';
