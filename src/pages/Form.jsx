import React, { useState } from "react";
import Navbar from "../components/Navbar/Index";
import { useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"; // Make sure to install axios
import { token, API_BASE_URL, getuserinfo } from "../utils/utils";
import { ApplicationContext } from "../context/ApplicationContext";
import JSZip from "jszip";

function Form() {
  const [sidebarToggle] = useOutletContext();

  return (
    <>
      <main className="h-full">
        <Navbar toggle={sidebarToggle} />
        {/* Main Content */}
        <div className="mainCard">
          <FileUploadForm />
        </div>
      </main>
    </>
  );
}

const FileUploadForm = () => {
  // INITIALIZING THE GLOBAL STATES I WANNA USE
  const { userinfo, dispatch } = React.useContext(ApplicationContext);

  // INITIALISING LOCAL STATES
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [uploadedFileType, setuploadedfiletype] = useState(null);
  const [uploadType, setUploadType] = useState("File");
  const [loading, setLoading] = useState(false);

  // GETTING THE USER DATA FROM THE API
  React.useEffect(() => {
    getuserinfo().then((userInfoFromServer) => {
      dispatch({ type: "SET_USERINFO", payload: userInfoFromServer });
      sessionStorage.setItem("picture", userInfoFromServer?.picture);
    });
  }, []);

  // THIS FUNCTION DOES ALL THE FILE SETUP AND INITIALISATION BEFORE UPLOADING IT TO THE API
  const handleFileChange = async (e) => {
    setLoading(true);

    const selectedFile = e.target.files[0];
    const mimeType = selectedFile.type;
    setuploadedfiletype(mimeType);

    // Check if the selected file would exceed the user's maximum space
    if (userinfo.space + selectedFile.size > userinfo.max_space) {
      alert("You have exceeded your maximum allowed space.");
      return;
    }

    // Check if the selected file is already zipped
    const compressedExtensions = [
      ".zip",
      ".gz",
      ".rar",
      ".7z",
      ".tar.gz",
      ".tar.bz2",
      ".bz2",
    ];

    if (compressedExtensions.some((ext) => selectedFile.name.endsWith(ext))) {
      setFile(selectedFile);
    } else {
      // If it's not a zip file, zip it
      const zip = new JSZip();
      zip.file(selectedFile.name, selectedFile);

      // Generate the zip file and update progress as it's being generated
      const zippedFileBlob = await zip.generateAsync(
        { type: "blob" },
        (metadata) => {
          // Update the compression progress state
          const progress = Math.round(metadata.percent);
          setCompressionProgress(progress);
        }
      );

      // Reset the compression progress state
      setCompressionProgress(0);
      setLoading(false);

      // Set the zipped file
      setFile(new File([zippedFileBlob], `${selectedFile.name}.zip`));
    }
  };

  // THIS FUNCTION DOES ALL THE FOLDER SETUP AND INITIALISATION BEFORE UPLOADING IT TO THE API
  const handleFolderChange = async (e) => {
    setLoading(true);
    const selectedFolder = e.target.files; // Assuming the input allows directory selection
    let totalSize = 0;
    let folderName = "MyFolder"; // Initialize with a default name

    // If the folder name can be retrieved, update folderName
    if (selectedFolder[0] && selectedFolder[0].webkitRelativePath) {
      folderName = selectedFolder[0].webkitRelativePath.split("/")[0];
    }

    // Calculate the total size of all files in the folder
    for (let file of selectedFolder) {
      totalSize += file.size;
    }

    // Check space quota
    if (userinfo.space + totalSize > userinfo.max_space) {
      alert("You have exceeded your maximum allowed space.");
      return;
    }

    // Initialize a new zip object
    const zip = new JSZip();
    // Loop through each file and add it to the zip
    for (let file of selectedFolder) {
      zip.file(file.webkitRelativePath, file);
    }

    setuploadedfiletype("Folder");

    // Generate the zip file and update progress
    const zippedFolderBlob = await zip.generateAsync(
      { type: "blob" },
      (metadata) => {
        const progress = Math.round(metadata.percent);
        setCompressionProgress(progress);
      }
    );

    // Reset the compression progress state
    setCompressionProgress(0);
    setLoading(false);

    // Set the zipped folder with the original folder name
    setFile(new File([zippedFolderBlob], `${folderName}.zip`));
  };

  // Function to handle changes to the upload type
  const handleUploadTypeChange = (e) => {
    setUploadType(e.target.value);
  };

  // THIS FUNCTION DOES THE SENDING OF THE UPLOADED CONTENT TO THE API
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/file/upload?file_type=${uploadedFileType}`, // Add file_type as a query parameter
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      alert("File uploaded");
      setFile(null);
      setUploadProgress(0);
    } catch (error) {
      console.error("An error occurred while uploading the file:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md"
    >
      {compressionProgress !== 0 && (
        <div className="flex flex-col mt-3">
          <progress
            className="progress progress-success w-full"
            value={compressionProgress}
            max="100"
          />
          <small className="text-center text-xs">
            {compressionProgress}% Compression Complete
          </small>
        </div>
      )}

      <div className="flex justify-between">
        <select
          className="rounded-lg p-2 bg-gray-100 outline-none"
          onChange={handleUploadTypeChange}
        >
          <option value="File" selected>
            File (default)
          </option>
          <option value="Folder">Folder</option>
        </select>{" "}
        {loading && (
          <div className="flex inline-flex ">
            <span className="loading loading-ring loading-lg mx-4"></span>
            <strong className="p-2">
              Hold on while process is ongoing
            </strong>
          </div>
        )}
      </div>

      <div className="image-upload-wrap rounded-lg">
        {uploadType === "File" && (
          <input
            className="file-upload-input"
            multiple={false}
            type="file"
            accept="*"
            onChange={handleFileChange}
          />
        )}
        {uploadType === "Folder" && (
          <input
            className="file-upload-input"
            multiple={false}
            type="file"
            accept="*"
            webkitdirectory="true"
            onChange={handleFolderChange}
          />
        )}

        <div className="w-full flex justify-center items-center">
          <h3 className="text-gray-700 m-20">Click me</h3>
        </div>
        {/* Display selected file name */}
        <div className="flex flex-row justify-center">
          {file && <p className="truncate">{file.name}</p>}
        </div>
      </div>
      {uploadProgress !== 0 && (
        <div className="flex flex-col mt-3">
          <progress
            className="progress progress-success w-full"
            value={uploadProgress}
            max="100"
          />
          <small className="text-center text-xs">
            {uploadProgress}% Complete
          </small>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          className="text-emerald-600 border-gray-200 px-3 py-2 rounded-lg shadow-lg text-sm flex gap-2 items-center"
        >
          <div>
            <FontAwesomeIcon icon={faUpload} />
          </div>
          <span>
            Upload to <strong>Xendpal</strong>{" "}
          </span>
        </button>
      </div>
      <style jsx>
        {`
          .file-upload-input {
            position: absolute;
            margin: 0;
            padding: 0px;
            width: 100%;
            height: 100%;
            outline: none;
            opacity: 0;
            cursor: pointer;
          }

          .image-upload-wrap {
            margin-top: 20px;
            border: 4px dashed #1fb264;
            position: relative;
          }

          .image-upload-wrap:hover {
            background-color: #1fb264;
            border: 4px dashed #ffffff;
          }
        `}
      </style>
    </form>
  );
};

export default Form;

export { FileUploadForm };
