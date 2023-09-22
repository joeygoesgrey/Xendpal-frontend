import React from "react";
import Datatables from "../components/Datatables/Table";
import TableCell from "../components/Datatables/TableCell";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  API_BASE_URL,
  getUserItems,
  bytesToMBorGB,
  deleteUpload,
  shareUpload,
} from "../utils/utils";
import moment from "moment";
import { ApplicationContext } from "../context/ApplicationContext";

function UserTable({ loading }) {
  const { userItems, searchTerm, dispatch } =
    React.useContext(ApplicationContext);
  const [email, setEmail] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [fileIdToDelete, setFileIdToDelete] = React.useState(null);
  const [refresh, setRefresh] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showActionModal, setShowActionModal] = React.useState(false);

  const handleDeleteClick = (fileId) => {
    // Set the file ID to delete and show the modal
    setFileIdToDelete(fileId);
    setShowDeleteModal(true);
  };

  const handleActionClick = (fileId) => {
    // Set the file ID for the action and show the modal
    setFileIdToDelete(fileId);
    setShowActionModal(true);
  };

  const handleDeleteConfirm = () => {
    // Perform the delete action here
    deleteUpload(fileIdToDelete);
    setRefresh(true);
    setShowDeleteModal(false);
  };

  React.useEffect(() => {
    getUserItems().then((userItemsFromServer) => {
      console.log(userItems);
      dispatch({ type: "SET_USERITEMS", payload: userItemsFromServer });
      setRefresh(false); // Reset the refresh state after data is fetched
    });
  }, [refresh]);

  const handleAddClick = async (fileId, e) => {
    e.preventDefault();
    // Email validation using a regular expression
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    const payload = {
      recipient_email: email,
      description: description,
      upload_id: fileId, // Now dynamic
      permission: "read", // This can be dynamic too
    };

    const response = await shareUpload(payload);
    alert(response);

    setRefresh(true);
    setShowActionModal(false);
  };

  const dataHeader = [
    {
      key: "type",
      label: "type",
    },
    {
      key: "size",
      label: "size",
    },
    {
      key: "name",
      label: "Name",
    },
    {
      key: "created_at",
      label: "created at",
    },
    {
      key: "action",
      label: "Action",
    },
  ];
  const filteredUserItems = userItems
    ? userItems.files.filter((file) =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const highlightText = (text, highlight) => {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === highlight.toLowerCase()
                ? { backgroundColor: "#73E7B7" }
                : {}
            }
          >
            {part}
          </span>
        ))}
      </span>
    );
  };

  return (
    <>
      <Datatables loading={loading} dataHeader={dataHeader}>
        {filteredUserItems.map((file, index) => (
          <tr
            key={index}
            className="bg-white border md:border-b block md:table-row rounded-md shadow-md md:rounded-none md:shadow-none mb-5"
          >
            <TableCell dataLabel="Type" showLabel={true}>
              {highlightText(file.type, searchTerm)}
            </TableCell>

            <TableCell dataLabel="Size" showLabel={true}>
              <small className="truncate">
                {highlightText(bytesToMBorGB(file.size), searchTerm)}
                {/* {file.id} */}
              </small>
            </TableCell>

            <TableCell dataLabel="Name" showLabel={true}>
              <a
                href={`${API_BASE_URL}/${file.path}`}
                target="_blank"
                download
                className="inline-flex items-center"
              >
                <small className="truncate">
                  {" "}
                  {highlightText(file.name, searchTerm)}
                </small>
              </a>
            </TableCell>

            <TableCell dataLabel="Created" showLabel={true}>
              <span className="space-x-1">
                <span className="rounded-full py-1 px-3 text-xs font-semibold bg-emerald-200 text-green-900">
                  {moment(file?.created_at).fromNow()}
                </span>
              </span>
            </TableCell>

            <TableCell>
              <FontAwesomeIcon
                onClick={() => handleActionClick(file.id)}
                icon={faPerson}
                className={`text-sky-700 inline-flex py-1 px-1 cursor-pointer text-sm`}
              />
              <FontAwesomeIcon
                onClick={() => handleDeleteClick(file.id)}
                icon={faTrash}
                className={`text-sky-700 inline-flex py-1 px-1 cursor-pointer text-sm`}
              />
              {showDeleteModal && (
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                          Confirm Deletion
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowDeleteModal(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                        <p className="mt-4 mb-1 text-slate-500 text-lg leading-relaxed">
                          Are you sure you wanna permanently delete this?
                        </p>
                        <em className="text-center text-red-500 text-sm  ">
                          Shared items cannot be deleted!
                        </em>
                      </div>

                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowDeleteModal(false)}
                        >
                          Close
                        </button>
                        <button
                          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={handleDeleteConfirm}
                        >
                          yes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {showActionModal && (
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                          File Share through Email
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowDeleteModal(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      {/* <div className="relative p-6 flex-auto"> */}
                      <div className="form-control w-full max-w-xs md:p-7">
                        <input
                          type="text"
                          placeholder="Email"
                          className="input border-emerald-200 border w-full max-w-xs mb-6"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        <textarea
                          className="textarea border-emerald-200 border h-24"
                          placeholder="Leave a description(optional)"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <label className="label flex justify-end">
                          <span className="label-text-alt text-gray-300">
                            {" "}
                            Max 100 words{" "}
                          </span>
                        </label>
                      </div>
                      {/* </div> */}
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowActionModal(false)}
                        >
                          Close
                        </button>
                        <button
                          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={(e) => handleAddClick(fileIdToDelete, e)}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </TableCell>
          </tr>
        ))}
      </Datatables>
    </>
  );
}

export default UserTable;
