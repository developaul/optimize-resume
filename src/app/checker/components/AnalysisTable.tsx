import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AnalysisTable() {
  return (
    <div className="flex flex-col items-center">
      <Table>
        <TableHeader className="bg-green">
          <TableRow>
            <TableHead className="p font-bold">Anuncio</TableHead>
            <TableHead className="p font-bold">cv</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="p font-bold">Habilidades Técnicas</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Test de usabilidad</TableCell>
            <TableCell>✅</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="p font-bold">Blandas</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Comunicación efectiva</TableCell>
            <TableCell>✅</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="p font-bold">Software</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Figma*</TableCell>
            <TableCell>✅</TableCell>
          </TableRow>
        </TableBody>

        <TableFooter className="bg-none m-4">
          <TableRow>
            <TableCell>
              <small className="small text-muted-foreground">
                *Requisito excluyente
              </small>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
