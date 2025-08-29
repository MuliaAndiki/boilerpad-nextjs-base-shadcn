import { useRef } from 'react';
import { UploadsTriggerProps } from '../types/utils';

const UploadsTrigger = ({ children, onChange, accept, multiple }: UploadsTriggerProps) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleTrigger = () => {
    fileRef.current?.click();
  };
  return (
    <>
      <div onClick={handleTrigger}>{children}</div>
      <input
        type="file"
        ref={fileRef}
        className="hidden"
        onChange={onChange}
        accept={accept}
        multiple={multiple}
      />
    </>
  );
};

export default UploadsTrigger;
