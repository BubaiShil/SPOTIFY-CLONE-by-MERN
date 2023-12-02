import {openUploadWidget} from "../../utils/CloudinaryService";
const cloudName = process.env.cloudinary_upload_name;
const uploadPreset = process.env.cloudinary_upload_presettion;
// import {cloudinary_upload_presettion} from "../../config";
// import { cloudinary_upload_name } from "../../config";

const CloudinaryUpload = ({setUrl, setName}) => {
    const uploadImageWidget = () => {
        let myUploadWidget = openUploadWidget(
            {
                cloudName: cloudName ,
                uploadPreset: uploadPreset ,
                sources: ["local"],
            },
            function (error, result) {
                if (!error && result.event === "success") {
                    setUrl(result.info.secure_url);
                    setName(result.info.original_filename);
                } else {
                    if (error) {
                        console.log(error);
                    }
                }
            }
        );
        myUploadWidget.open();
    };

    return (
        <button
            className="bg-white text-black  rounded-full p-4 font-semibold"
            onClick={uploadImageWidget}
        >
            Select Track
        </button>
    );
};

export default CloudinaryUpload;