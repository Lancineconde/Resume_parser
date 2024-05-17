import type { ResumeKey } from "lib/redux/types";
import type { Line, Lines, ResumeSectionToLines } from "lib/parse-resume-from-pdf/types";
import {
  hasLetterAndIsAllUpperCase,
  hasOnlyLettersSpacesAmpersands,
  isBold,
} from "lib/parse-resume-from-pdf/extract-resume-from-sections/lib/common-features";

export const PROFILE_SECTION: ResumeKey = "profile";

/**
 * Step 3. Group lines into sections
 *
 * Every section (except the profile section) starts with a section title that
 * takes up the entire line. This is a common pattern not just in resumes but
 * also in books and blogs. The resume parser uses this pattern to group lines
 * into the closest section title above these lines.
 */
export const groupLinesIntoSections = (lines: Lines) => {
  let sections: ResumeSectionToLines = {};
  let sectionName: string = PROFILE_SECTION;
  let sectionLines: Lines = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const text = line[0]?.text.trim();
    if (isSectionTitle(line, i)) {
      if (sectionLines.length > 0) {
        sections[sectionName] = [...sectionLines];
      }
      sectionName = text;
      sectionLines = [];
    } else {
      sectionLines.push(line);
    }
  }
  if (sectionLines.length > 0) {
    sections[sectionName] = [...sectionLines];
  }
  return integrateSubsections(sections);
};

// Primary section title keywords in English and French
const SECTION_TITLE_PRIMARY_KEYWORDS = [
  "experience", "expérience",
  "education", "éducation",
  "project", "projet",
  "skill", "compétence",
  "formation", "savoir faire", "compétences techniques"
];

// Secondary section title keywords in English and French
const SECTION_TITLE_SECONDARY_KEYWORDS = [
  "job", "emploi",
  "course", "cours",
  "extracurricular", "extrascolaire",
  "objective", "objectif",
  "summary", "résumé", // LinkedIn generated resume has a summary section
  "award", "récompense",
  "honor", "honneur",
  "project", "projet",
];

// Subsection keywords specific to "EXPERIENCES PROFESSIONNELLES"
const SUBSECTION_KEYWORDS = ["contexte", "activites", "environnement", "activités"];

// Combined section title keywords
const SECTION_TITLE_KEYWORDS = [
  ...SECTION_TITLE_PRIMARY_KEYWORDS,
  ...SECTION_TITLE_SECONDARY_KEYWORDS,
];

const isSectionTitle = (line: Line, lineNumber: number) => {
  const isFirstTwoLines = lineNumber < 2;
  const hasMoreThanOneItemInLine = line.length > 1;
  const hasNoItemInLine = line.length === 0;
  if (isFirstTwoLines || hasMoreThanOneItemInLine || hasNoItemInLine) {
    return false;
  }

  const textItem = line[0];

  // The main heuristic to determine a section title is to check if the text is double emphasized
  // to be both bold and all uppercase, which is generally true for a well formatted resume
  if (isBold(textItem) && hasLetterAndIsAllUpperCase(textItem)) {
    return true;
  }

  // The following is a fallback heuristic to detect section title if it includes a keyword match
  // (This heuristics is not well tested and may not work well)
  const text = textItem.text.trim();
  const textHasAtMost2Words =
    text.split(" ").filter((s) => s !== "&").length <= 2;
  const startsWithCapitalLetter = /[A-ZÀ-ÖØ-Þ]/.test(text.slice(0, 1)); // Updated for French capital letters

  if (
    textHasAtMost2Words &&
    hasOnlyLettersSpacesAmpersands(textItem) &&
    startsWithCapitalLetter &&
    SECTION_TITLE_KEYWORDS.some((keyword) =>
      text.toLowerCase().includes(keyword)
    )
  ) {
    return true;
  }

  return false;
};

const isSubsectionTitle = (line: Line) => {
  const textItem = line[0];
  const text = textItem.text.trim().toLowerCase();
  return SUBSECTION_KEYWORDS.some((keyword) => text.includes(keyword));
};

// Function to integrate subsections within a main section
const integrateSubsections = (sections: ResumeSectionToLines) => {
  const integratedSections: ResumeSectionToLines = {};
  let currentMainSection = "";

  Object.keys(sections).forEach((sectionName) => {
    if (SECTION_TITLE_KEYWORDS.some((keyword) => sectionName.toLowerCase().includes(keyword))) {
      currentMainSection = sectionName;
      integratedSections[currentMainSection] = sections[sectionName];
    } else if (isSubsectionTitle([{ text: sectionName }] as Line)) {
      if (currentMainSection) {
        integratedSections[currentMainSection] = [
          ...integratedSections[currentMainSection],
          ...sections[sectionName],
        ];
      }
    } else {
      integratedSections[sectionName] = sections[sectionName];
    }
  });

  return integratedSections;
};

// Modified groupLinesIntoSections to use integrateSubsections
export const groupLinesIntoSectionsWithSubsections = (lines: Lines) => {
  const sections = groupLinesIntoSections(lines);
  return integrateSubsections(sections);
};
