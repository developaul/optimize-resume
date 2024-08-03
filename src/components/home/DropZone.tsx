import React, { FC, forwardRef, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

interface DropZoneProps {
  onChange: (files: FileList | null) => void;
  label: string;
  TxtHelper: JSX.Element;
  value: any;
}

const DropZone: FC<DropZoneProps> = forwardRef(
  ({ onChange, label, TxtHelper, value }, ref: React.ForwardedRef<any>) => {
    const sizeValidator = (file: any) => {
      if (file.size > 1000000) {
        return {
          code: "archivo muy pesado",
          message: `El archivo debe ser menor a 1mb`,
        };
      }
      return null;
    };

    const onDrop = useCallback(
      (acceptedFiles: any) => {
        onChange(acceptedFiles);
      },
      [onChange]
    );

    const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
      useDropzone({
        onDrop,
        accept: { "application/pdf": [".pdf"] },
        maxFiles: 1,
        validator: sizeValidator,
      });

    useEffect(() => {
      if (fileRejections.length > 0)
        console.error("🚀 ~ useEffect ~ fileRejections:", fileRejections);
    }, [fileRejections]);

    return (
      <div
        className="outline-dashed outline-2 outline-blue bg-gray-50 hover:bg-gray-100 rounded-md p-3 flex flex-col jutify-center items-center cursor-pointer"
        {...getRootProps()}
      >
        <input ref={ref} {...getInputProps()} />
        {acceptedFiles.length < 1 && (
          <label htmlFor="file-upload" className="text-center text-black h4">
            {label}
            {TxtHelper}
          </label>
        )}

        {acceptedFiles.length > 0 && <span>{acceptedFiles[0].name}</span>}
      </div>
    );
  }
);

DropZone.displayName = "DropZone";

export default DropZone;
