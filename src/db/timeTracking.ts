
export interface TimeEntry {
  id: string;
  userId: string;
  userName: string;
  timestamp: string;
  action: 'login' | 'logout' | 'break-start' | 'break-end';
  date: string;
}

export interface DaySummary {
  totalWorkTime: number;
  totalBreakTime: number;
  entries: TimeEntry[];
  currentStatus: 'logged-out' | 'logged' | 'break';
}

export class TimeTrackingDB {
  private static readonly STORAGE_KEY = 'timeEntries';

  static saveTimeEntry(entry: TimeEntry): void {
    const allEntries = this.getAllEntries();
    allEntries.push(entry);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allEntries));
  }

  static getAllEntries(): TimeEntry[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }

  static getTodayEntries(userId: string): TimeEntry[] {
    const today = new Date().toISOString().split('T')[0];
    return this.getAllEntries().filter(e => 
      e.userId === userId && e.date === today
    );
  }

  static calculateDaySummary(entries: TimeEntry[]): DaySummary {
    let totalWorkTime = 0;
    let totalBreakTime = 0;
    let currentStatus: 'logged-out' | 'logged' | 'break' = 'logged-out';
    
    const sortedEntries = [...entries].sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    
    let lastLoginTime: Date | null = null;
    let lastBreakStartTime: Date | null = null;
    
    sortedEntries.forEach((entry) => {
      const timestamp = new Date(entry.timestamp);
      
      switch (entry.action) {
        case 'login':
          lastLoginTime = timestamp;
          currentStatus = 'logged';
          break;
          
        case 'logout':
          if (lastLoginTime) {
            totalWorkTime += (timestamp.getTime() - lastLoginTime.getTime()) / (1000 * 60);
            lastLoginTime = null;
          }
          currentStatus = 'logged-out';
          break;
          
        case 'break-start':
          lastBreakStartTime = timestamp;
          currentStatus = 'break';
          break;
          
        case 'break-end':
          if (lastBreakStartTime) {
            totalBreakTime += (timestamp.getTime() - lastBreakStartTime.getTime()) / (1000 * 60);
            lastBreakStartTime = null;
          }
          currentStatus = 'logged';
          break;
      }
    });

    // Calculate current ongoing times
    const now = new Date().getTime();
    if (lastLoginTime && (currentStatus === 'logged' || currentStatus === 'break')) {
      totalWorkTime += (now - lastLoginTime.getTime()) / (1000 * 60);
    }
    if (lastBreakStartTime && currentStatus === 'break') {
      totalBreakTime += (now - lastBreakStartTime.getTime()) / (1000 * 60);
    }

    return {
      totalWorkTime: Math.round(totalWorkTime),
      totalBreakTime: Math.round(totalBreakTime),
      entries: sortedEntries,
      currentStatus
    };
  }

  static canPerformAction(
    action: 'login' | 'logout' | 'break-start' | 'break-end',
    currentStatus: 'logged-out' | 'logged' | 'break'
  ): boolean {
    const stateTransitions: Record<string, Record<string, boolean>> = {
      'logged-out': {
        'login': true,
        'logout': false,
        'break-start': false,
        'break-end': false
      },
      'logged': {
        'login': false,
        'logout': true,
        'break-start': true,
        'break-end': false
      },
      'break': {
        'login': false,
        'logout': false,
        'break-start': false,
        'break-end': true
      }
    };
    
    return stateTransitions[currentStatus]?.[action] || false;
  }
}
