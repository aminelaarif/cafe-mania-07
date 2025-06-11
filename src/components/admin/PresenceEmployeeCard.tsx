
import { Badge } from '@/components/ui/badge';
import { User } from '@/db/mockdata';

interface PresenceEmployeeCardProps {
  user: User;
  selectedDate: string;
  getFirstLogin: (userId: string, date: string) => string;
  getLastLogout: (userId: string, date: string) => string;
  calculateWorkingHours: (userId: string, date: string) => string;
  getStatusBadge: (userId: string, date: string) => JSX.Element;
}

export const PresenceEmployeeCard = ({
  user,
  selectedDate,
  getFirstLogin,
  getLastLogout,
  calculateWorkingHours,
  getStatusBadge
}: PresenceEmployeeCardProps) => {
  return (
    <div className="flex justify-between items-center p-4 border rounded-lg">
      <div>
        <h3 className="font-semibold">{user.name}</h3>
        <p className="text-sm text-muted-foreground">
          {new Date(selectedDate).toLocaleDateString('fr-FR')}
        </p>
      </div>
      <div className="text-center">
        <p className="text-sm">
          <span className="font-medium">Arrivée:</span> {getFirstLogin(user.id, selectedDate)}
        </p>
        <p className="text-sm">
          <span className="font-medium">Départ:</span> {getLastLogout(user.id, selectedDate)}
        </p>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium">{calculateWorkingHours(user.id, selectedDate)}</p>
        <p className="text-xs text-muted-foreground">Temps de travail</p>
      </div>
      <div>
        {getStatusBadge(user.id, selectedDate)}
      </div>
    </div>
  );
};
