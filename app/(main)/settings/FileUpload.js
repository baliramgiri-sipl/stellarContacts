import React from 'react';

const FileUpload = ({ setFileData }) => {
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1];
                setFileData(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-sm border mt-1 cursor-pointer rounded-lg p-2">
            <label htmlFor="file-upload" className="block text-xs cursor-pointer font-medium text-gray-700 ">
                Upload Avatar
            </label>
            <input
                id="file-upload"
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileInputChange}
                className="hidden"
            />
        </div>
    );
};

export default FileUpload;
