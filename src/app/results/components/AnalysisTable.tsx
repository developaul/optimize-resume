import { FC, Fragment } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CompatibilityAssessment, PartialObject, skillConfigBy, SkillType } from "@/server/types";
import { groupBy } from 'es-toolkit';

interface AnalysisTableProps {
  skills: PartialObject<CompatibilityAssessment['skills']>
}

const AnalysisTable: FC<AnalysisTableProps> = ({ skills }) => {
  const skillsGroupBySkillType = groupBy(skills, (skill) => skill!.type!)

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
          {Object.entries(skillsGroupBySkillType).map(([ skillType, skills ]) => {
            return (
              <Fragment key={`SectionSkillType-${skillType}`}>
                <TableRow>
                  <TableCell className="p font-bold">{skillConfigBy[skillType as unknown as SkillType]?.name}</TableCell>
                </TableRow>
                {skills.map((skill) => {
                  return (
                  <TableRow key={`Skill-${skill?.name}`}>
                    <TableCell>{skill?.name}</TableCell>
                    <TableCell>{skill?.inCv ? '✅': ' '}</TableCell>
                  </TableRow>
                  )
                })}
              </Fragment>
            )
          })}
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

export default AnalysisTable