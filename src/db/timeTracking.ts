
export interface TimeEntry {
  id: string;
  userId: string;
  userName: string;
  timestamp: string;
  action: 'login' | 'logout';
  date: string;
  explanation?: string; // For breaks >= 1 hour
}

export interface DaySummary {
  totalWorkTime: number;
  totalBreakTime: number;
  entries: TimeEntry[];
  currentStatus: 'out' | 'logged';
  needsExplanation?: boolean;
  lastLogoutTime?: string;
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
    let currentStatus: 'out' | 'logged' = 'out';
    let needsExplanation = false;
    let lastLogoutTime: string | undefined;
    
    const sortedEntries = [...entries].sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    
    let lastLoginTime: Date | null = null;
    
    for (let i = 0; i < sortedEntries.length; i++) {
      const entry = sortedEntries[i];
      const timestamp = new Date(entry.timestamp);
      
      if (entry.action === 'login') {
        // Check if there was a previous logout for break calculation
        if (i > 0 && sortedEntries[i - 1].action === 'logout') {
          const prevLogout = new Date(sortedEntries[i - 1].timestamp);
          const breakDuration = (timestamp.getTime() - prevLogout.getTime()) / (1000 * 60);
          
          // Only count as break if less than 1 hour
          if (breakDuration < 60) {
            totalBreakTime += breakDuration;
          }
        }
        
        lastLoginTime = timestamp;
        currentStatus = 'logged';
      } else if (entry.action === 'logout') {
        if (lastLoginTime) {
          totalWorkTime += (timestamp.getTime() - lastLoginTime.getTime()) / (1000 * 60);
          lastLoginTime = null;
        }
        currentStatus = 'out';
        lastLogoutTime = entry.timestamp;
      }
    }

    // Calculate current ongoing work time if logged in
    const now = new Date().getTime();
    if (lastLoginTime && currentStatus === 'logged') {
      totalWorkTime += (now - lastLoginTime.getTime()) / (1000 * 60);
    }

    // Check if explanation is needed for next login
    if (currentStatus === 'out' && lastLogoutTime) {
      const lastLogout = new Date(lastLogoutTime);
      const timeSinceLogout = (now - lastLogout.getTime()) / (1000 * 60);
      needsExplanation = timeSinceLogout >= 60;
    }

    return {
      totalWorkTime: Math.round(totalWorkTime),
      totalBreakTime: Math.round(totalBreakTime),
      entries: sortedEntries,
      currentStatus,
      needsExplanation,
      lastLogoutTime
    };
  }

  static canPerformAction(
    action: 'login' | 'logout',
    currentStatus: 'out' | 'logged'
  ): boolean {
    if (action === 'login') {
      return currentStatus === 'out';
    } else if (action === 'logout') {
      return currentStatus === 'logged';
    }
    return false;
  }
}
