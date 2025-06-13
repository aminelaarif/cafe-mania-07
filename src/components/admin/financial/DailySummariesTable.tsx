
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FinancialSummary } from '@/db/mockdata/payments';

interface DailySummariesTableProps {
  summaries: FinancialSummary[];
}

export const DailySummariesTable = ({ summaries }: DailySummariesTableProps) => {
  const formatCurrency = (amount: number) => `€${amount.toFixed(2)}`;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Ventes Totales</TableHead>
          <TableHead>Espèces</TableHead>
          <TableHead>Carte</TableHead>
          <TableHead>Remboursements</TableHead>
          <TableHead>Transactions</TableHead>
          <TableHead>Ticket Moyen</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {summaries.map((summary) => (
          <TableRow key={`${summary.storeId}-${summary.date}`}>
            <TableCell>
              {new Date(summary.date).toLocaleDateString('fr-FR')}
            </TableCell>
            <TableCell className="font-bold">
              {formatCurrency(summary.totalSales)}
            </TableCell>
            <TableCell>{formatCurrency(summary.totalCash)}</TableCell>
            <TableCell>{formatCurrency(summary.totalCard)}</TableCell>
            <TableCell className="text-red-600">
              {formatCurrency(summary.totalRefunds)}
            </TableCell>
            <TableCell>{summary.transactionCount}</TableCell>
            <TableCell>{formatCurrency(summary.averageTicket)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
