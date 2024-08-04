import { FC, Fragment } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CompatibilityAssessment,
  PartialObject,
  skillConfigBy,
  SkillType,
} from "@/server/types";
import { groupBy } from "es-toolkit";
import { Skeleton } from "@/components/ui/skeleton";

const Loader = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <Skeleton className="w-[100%] h-5 rounded-full bg-gray-200" />
      <Skeleton className="w-[100%] h-5 rounded-full bg-gray-200" />
      <Skeleton className="w-[80%] h-5 rounded-full bg-gray-200" />
    </div>
  );
};

interface AnalysisTableProps {
  skills: PartialObject<CompatibilityAssessment["skills"]>;
  isLoading?: boolean;
}

export const AnalysisTable: FC<AnalysisTableProps> = ({
  skills,
  isLoading,
}) => {
  const skillsGroupBySkillType = groupBy(skills, (skill) => skill!.type!);

  return (
    <div className="flex flex-col items-center">
      {isLoading ? (
        <Loader />
      ) : (
        <Table>
          <TableHeader className="bg-green">
            <TableRow>
              <TableHead className="p font-bold">Anuncio</TableHead>
              <TableHead className="p font-bold">cv</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(skillsGroupBySkillType).map(
              ([skillType, skills]) => {
                return (
                  <Fragment key={`SectionSkillType-${skillType}`}>
                    <TableRow className="bg-gray-50">
                      <TableCell className="p font-bold">
                        {skillConfigBy[skillType as unknown as SkillType]?.name}
                      </TableCell>
                    </TableRow>
                    {skills.map((skill) => {
                      return (
                        <TableRow
                          key={`Skill-${skill?.name}`}
                          className="bg-white"
                        >
                          <TableCell>{skill?.name}</TableCell>
                          <TableCell>{skill?.inCv ? "✅" : " "}</TableCell>
                        </TableRow>
                      );
                    })}
                  </Fragment>
                );
              }
            )}
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
      )}
    </div>
  );
};
