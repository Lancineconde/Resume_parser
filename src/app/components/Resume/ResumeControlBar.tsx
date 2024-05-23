"use client";
import { useEffect } from "react";
import { useSetDefaultScale } from "components/Resume/hooks";
import {
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { usePDF } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, ImageRun } from 'docx';
import { generateWordProfileSection } from "./ResumeWord/ResumeWordProfile";
import { generateWordWorkExperienceSection } from "./ResumeWord/ResumeWordWorkExperience";
import { generateWordEducationSection } from "./ResumeWord/ResumeWordEducation";

// Define the props interface
interface ResumeControlBarProps {
  scale: number;
  setScale: (scale: number) => void;
  documentSize: string;
  document: JSX.Element;
  fileName: string;
}

const generateWordDocument = (documentData: any, fileName: string) => {
  const { profile, workExperiences, educations } = documentData;

  const profileSection = generateWordProfileSection(profile, "#FF0000");
  const workExperienceSection = generateWordWorkExperienceSection(
    "EXPERIENCE PROFESSIONNELLE",
    workExperiences || [],
    "#FF0000",
    true
  );
  const educationSection = generateWordEducationSection(
    "EDUCATION",
    educations || [],
    "#FF0000",
    true
  );

  const doc = new Document({
    sections: [
      {
        children: [
          ...profileSection,
          ...workExperienceSection,
          ...educationSection,
        ],
      },
    ],
  });

  Packer.toBlob(doc).then(blob => {
    saveAs(blob, fileName);
  });
};


const ResumeControlBar = ({
  scale,
  setScale,
  documentSize,
  document,
  fileName,
}: ResumeControlBarProps) => {
  const { scaleOnResize, setScaleOnResize } = useSetDefaultScale({
    setScale,
    documentSize,
  });

  const [instance, update] = usePDF({ document });

  useEffect(() => {
    update();
  }, [update, document]);

  const handleWordDownload = () => {
    const documentData = {
      profile: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "123-456-7890",
        url: "https://example.com",
        summary: "Experienced software engineer...",
        location: "City, Country",
      },
      workExperiences: [
        {
          company: "Company A",
          jobTitle: "Software Engineer",
          date: "2021 - Present",
          descriptions: ["Developed web applications", "Collaborated with team"],
        },
      ],
      educations: [
        {
          school: "University A",
          degree: "B.Sc. Computer Science",
          date: "2015 - 2019",
          gpa: "3.8",
          descriptions: ["Dean's List", "Graduated with Honors"],
        },
      ],
    };
  
    generateWordDocument(documentData, fileName);
  };
  

  return (
    <div className="sticky bottom-0 left-0 right-0 flex h-[var(--resume-control-bar-height)] items-center justify-center px-[var(--resume-padding)] text-gray-600 lg:justify-between">
      <div className="flex items-center gap-2">
        <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
        <input
          type="range"
          min={0.5}
          max={1.5}
          step={0.01}
          value={scale}
          onChange={(e) => {
            setScaleOnResize(false);
            setScale(Number(e.target.value));
          }}
        />
        <div className="w-10">{`${Math.round(scale * 100)}%`}</div>
        <label className="hidden items-center gap-1 lg:flex">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4"
            checked={scaleOnResize}
            onChange={() => setScaleOnResize((prev) => !prev)}
          />
          <span className="select-none">Autoscale</span>
        </label>
      </div>
      <div className="flex items-center gap-2">
        <a
          className="ml-1 flex items-center gap-1 rounded-md border border-gray-300 px-3 py-0.5 hover:bg-gray-100 lg:ml-8"
          href={instance.url!}
          download={fileName}
        >
          <ArrowDownTrayIcon className="h-4 w-4" />
          <span className="whitespace-nowrap">Download Resume (PDF)</span>
        </a>
        <button
          className="ml-1 flex items-center gap-1 rounded-md border border-gray-300 px-3 py-0.5 hover:bg-gray-100 lg:ml-2"
          onClick={handleWordDownload}
        >
          <DocumentTextIcon className="h-4 w-4" />
          <span className="whitespace-nowrap">Download Resume (Word)</span>
        </button>
      </div>
    </div>
  );
};

/**
 * Load ResumeControlBar client side since it uses usePDF, which is a web specific API
 */
export const ResumeControlBarCSR = dynamic(
  () => Promise.resolve(ResumeControlBar),
  {
    ssr: false,
  }
);

export const ResumeControlBarBorder = () => (
  <div className="absolute bottom-[var(--resume-control-bar-height)] w-full border-t-2 bg-gray-50" />
);
