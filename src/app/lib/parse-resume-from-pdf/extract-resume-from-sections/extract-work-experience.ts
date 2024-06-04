import type { ResumeWorkExperience } from "lib/redux/types";
import type { TextItem, FeatureSet, ResumeSectionToLines } from "lib/parse-resume-from-pdf/types";
import { getSectionLinesByKeywords } from "lib/parse-resume-from-pdf/extract-resume-from-sections/lib/get-section-lines";
import { DATE_FEATURE_SETS, hasNumber, getHasText, isBold } from "lib/parse-resume-from-pdf/extract-resume-from-sections/lib/common-features";
import { divideSectionIntoSubsections } from "lib/parse-resume-from-pdf/extract-resume-from-sections/lib/subsections";
import { getTextWithHighestFeatureScore } from "lib/parse-resume-from-pdf/extract-resume-from-sections/lib/feature-scoring-system";
import { getBulletPointsFromLines, getDescriptionsLineIdx } from "lib/parse-resume-from-pdf/extract-resume-from-sections/lib/bullet-points";

// Keywords for detecting work experience sections in French resumes
const WORK_EXPERIENCE_KEYWORDS_LOWERCASE = ['expérience', 'professionnelle', 'emploi', 'historique', 'poste'];
const JOB_TITLES = ['Ingénieur', 'Développeur', 'Technicien', 'Analyste', 'Consultant', 'Manager', 'Chef de projet', 'Architecte', 'Administrateur', 'Responsable', 'Directeur', 'Stagiaire'];

const hasJobTitle = (item: TextItem) =>
  JOB_TITLES.some((jobTitle) =>
    item.text.split(/\s+/).some((word) => word.toLowerCase() === jobTitle.toLowerCase())
  );

const hasMoreThan5Words = (item: TextItem) => item.text.split(/\s+/).length > 5;

const JOB_TITLE_FEATURE_SET: FeatureSet[] = [
  [hasJobTitle, 4],
  [hasNumber, -4],
  [hasMoreThan5Words, -2],
];

const COMPANY_FEATURE_SET: FeatureSet[] = [
  [isBold, 2],
  [hasJobTitle, -4],
  [hasNumber, -3],
];

export const extractWorkExperience = (sections: ResumeSectionToLines) => {
  const workExperiences: ResumeWorkExperience[] = [];
  const workExperiencesScores = [];

  const lines = getSectionLinesByKeywords(sections, WORK_EXPERIENCE_KEYWORDS_LOWERCASE);
  const subsections = divideSectionIntoSubsections(lines);

  for (const subsectionLines of subsections) {
    const descriptionsLineIdx = getDescriptionsLineIdx(subsectionLines) ?? 2;

    const subsectionInfoTextItems = subsectionLines.slice(0, descriptionsLineIdx).flat();
    const [date, dateScores] = getTextWithHighestFeatureScore(subsectionInfoTextItems, DATE_FEATURE_SETS);
    const [jobTitle, jobTitleScores] = getTextWithHighestFeatureScore(subsectionInfoTextItems, JOB_TITLE_FEATURE_SET);
    const [company, companyScores] = getTextWithHighestFeatureScore(subsectionInfoTextItems, COMPANY_FEATURE_SET, false);

    const subsectionDescriptionsLines = subsectionLines.slice(descriptionsLineIdx);
    const descriptions = getBulletPointsFromLines(subsectionDescriptionsLines);

    const environments = subsectionLines
      .flat()
      .filter(item => item.text.toLowerCase().includes('environnements') || item.text.toLowerCase().includes('environments'))
      .map(item => item.text.replace('Environnements:', '').replace('Environments:', '').trim())
      .join(', ');

    workExperiences.push({
      company, jobTitle, date, descriptions, environments
    });
    workExperiencesScores.push({
      companyScores,
      jobTitleScores,
      dateScores,
    });
  }
  return { workExperiences, workExperiencesScores };
};
