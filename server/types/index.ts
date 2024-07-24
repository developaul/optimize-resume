import { keyBy } from "es-toolkit";
import { z } from "zod";

import ReaderAPI from "../services/ReaderAPI";
import UserProfileSchema from "../schemas/userProfles";
import JobPostingSchema from "../schemas/job";
import CompatibilityAssessmentSchema from "../schemas/compatibilityAssessment";

export type IContext = {
  headers: {
    apikey: string;
    keytype: string;
  };
  dataSources: {
    readerApi: ReaderAPI;
  };
};


export type UserProfile = z.infer<typeof UserProfileSchema>
export type Job = z.infer<typeof JobPostingSchema>
export type CompatibilityAssessment = z.infer<typeof CompatibilityAssessmentSchema>

export enum SkillType {
  TECHNICAL_SKILLS = 'TECHNICAL_SKILLS',
  SOFT_SKILLS = 'SOFT_SKILLS',
  MANAGEMENT_SKILLS = 'MANAGEMENT_SKILLS', 
  LEARNING_SKILLS = 'LEARNING_SKILLS',
  COMMUNICATION_SKILLS = 'COMMUNICATION_SKILLS',
  CREATIVE_SKILLS = 'CREATIVE_SKILLS',
  DIGITAL_SKILLS = 'DIGITAL_SKILLS',
  ANALYTICAL_SKILLS = 'ANALYTICAL_SKILLS',
  CUSTOMER_SERVICE_SKILLS = 'CUSTOMER_SERVICE_SKILLS',
  ADAPTABILITY_SKILLS = 'ADAPTABILITY_SKILLS'
}

export const SkillConfigs = [
  {
    type: SkillType.TECHNICAL_SKILLS,
    name: 'Habilidades Técnicas'
  },
  {
    type: SkillType.SOFT_SKILLS,
    name: 'Habilidades Blandas'
  },
  {
    type: SkillType.MANAGEMENT_SKILLS,
    name: 'Habilidades Administrativas'
  },
  {
    type: SkillType.LEARNING_SKILLS,
    name: 'Habilidades de Aprendizaje'
  },
  {
    type: SkillType.COMMUNICATION_SKILLS,
    name: 'Habilidades de Comunicación'
  },
  {
    type: SkillType.CREATIVE_SKILLS,
    name: 'Habilidades Creativas'
  },
  {
    type: SkillType.DIGITAL_SKILLS,
    name: 'Habilidades Dígitales'
  },
  {
    type: SkillType.ANALYTICAL_SKILLS,
    name: 'Habilidades Analíticas'
  },
  {
    type: SkillType.CUSTOMER_SERVICE_SKILLS,
    name: 'Habilidades Servicio Al Cliente'
  },
  {
    type: SkillType.ADAPTABILITY_SKILLS,
    name: 'Habilidades de Adapatabilidad'
  }
]

export const skillConfigBy = keyBy(SkillConfigs, ({ type }) => type)