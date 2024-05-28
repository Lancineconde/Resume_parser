import { Form } from "components/ResumeForm/Form";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeCustom, selectCustom } from "lib/redux/resumeSlice";
import { selectShowBulletPoints, changeShowBulletPoints } from "lib/redux/settingsSlice";
import { certifications } from "components/Resume/certification"; // Ensure this path is correct

export const CustomForm = () => {
  const custom = useAppSelector(selectCustom);
  const dispatch = useAppDispatch();
  const { selectedCertifications } = custom;
  const form = "custom";
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));

  const handleCustomChange = (field: 'selectedCertifications', value: number[]) => {
    dispatch(changeCustom({ field, value }));
  };

  const handleShowBulletPoints = (value: boolean) => {
    dispatch(changeShowBulletPoints({ field: form, value }));
  };

  const handleCheckboxChange = (certId: number) => {
    const newSelectedCertifications = selectedCertifications.includes(certId)
      ? selectedCertifications.filter(id => id !== certId)
      : [...selectedCertifications, certId];
    handleCustomChange('selectedCertifications', newSelectedCertifications);
  };

  return (
    <Form form={form}>
      <div className="col-span-full grid grid-cols-6 gap-3">
        <div className="relative col-span-full">
          {certifications.map(cert => (
            <label key={cert.id} style={{ display: 'block', marginBottom: '8px' }}>
              <input
                type="checkbox"
                value={cert.id}
                checked={selectedCertifications.includes(cert.id)}
                onChange={() => handleCheckboxChange(cert.id)}
                style={{ marginRight: '8px' }} // Add space between the checkbox and the name
              />
              {cert.name}
            </label>
          ))}
        </div>
      </div>
    </Form>
  );
};
