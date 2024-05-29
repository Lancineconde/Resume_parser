import { Form } from "components/ResumeForm/Form";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeCustom, selectCustom } from "lib/redux/resumeSlice";
import { selectShowBulletPoints, changeShowBulletPoints } from "lib/redux/settingsSlice";

export const CustomForm = () => {
  const custom = useAppSelector(selectCustom);
  const dispatch = useAppDispatch();
  const { selectedCertifications } = custom;
  const form = "custom";
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));

  const handleCustomChange = (field: 'selectedCertifications', value: any) => {
    dispatch(changeCustom({ field, value }));
  };

  const handleShowBulletPoints = (value: boolean) => {
    dispatch(changeShowBulletPoints({ field: form, value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          handleCustomChange('selectedCertifications', [...selectedCertifications, base64String]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedCertifications = selectedCertifications.filter((_, i) => i !== index);
    handleCustomChange('selectedCertifications', updatedCertifications);
  };

  return (
    <Form form={form}>
      <div className="col-span-full grid grid-cols-6 gap-3">
        <div className="relative col-span-full">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            style={{ marginBottom: '8px' }}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {selectedCertifications.map((cert, index) => (
              <div key={index} style={{ position: 'relative', margin: '8px' }}>
                <img
                  src={cert}
                  alt={`Certification ${index}`}
                  style={{ width: '100px', height: '100px' }}
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  style={{
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    background: 'rgba(255, 0, 0, 0.7)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Form>
  );
};
