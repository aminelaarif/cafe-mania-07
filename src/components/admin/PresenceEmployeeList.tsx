
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PresenceEmployeeCard } from './PresenceEmployeeCard';
import { User } from '@/db/mockdata';

interface PresenceEmployeeListProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  filteredUsers: User[];
  getUserDaySummary: (userId: string, date: string) => any;
  getFirstLogin: (userId: string, date: string) => string;
  getLastLogout: (userId: string, date: string) => string;
  calculateWorkingHours: (userId: string, date: string) => string;
  getUserStatus: (userId: string) => string;
}

export const PresenceEmployeeList = ({
  selectedDate,
  onDateChange,
  filteredUsers,
  getUserDaySummary,
  getFirstLogin,
  getLastLogout,
  calculateWorkingHours,
  getUserStatus
}: PresenceEmployeeListProps) => {
  const getStatusBadge = (userId: string, date: string) => {
    const status = getUserStatus(userId);
    switch (status) {
      case 'logged':
        return <Badge className="bg-green-100 text-green-800">En service</Badge>;
      case 'out':
        const hasWorked = getUserDaySummary(userId, date).totalWorkTime > 0;
        return hasWorked 
          ? <Badge className="bg-gray-100 text-gray-800">Terminé</Badge>
          : <Badge variant="outline">Non pointé</Badge>;
      case 'not-started':
        return <Badge variant="outline">Non pointé</Badge>;
      default:
        return <Badge variant="outline">Non pointé</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Pointages du Personnel</CardTitle>
          <div className="flex items-center gap-2">
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-auto"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredUsers.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Aucun employé trouvé avec les filtres appliqués
            </p>
          ) : (
            filteredUsers.map((user) => (
              <PresenceEmployeeCard
                key={user.id}
                user={user}
                selectedDate={selectedDate}
                getFirstLogin={getFirstLogin}
                getLastLogout={getLastLogout}
                calculateWorkingHours={calculateWorkingHours}
                getStatusBadge={getStatusBadge}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
