import React from "react";
import Datatables from "../components/Datatables/Table";
import TableCell from "../components/Datatables/TableCell";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faPerson, faTrash } from "@fortawesome/free-solid-svg-icons";
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

  const actionModalRef = React.useRef(null);
  const deleteModalRef = React.useRef(null);
  const [email, setEmail] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [fileIdToDelete, setFileIdToDelete] = React.useState(null);

  const handleDeleteClick = (fileId) => {
    // Set the file ID somewhere in the component's state
    setFileIdToDelete(fileId);

    // Show the modal
    deleteModalRef.current.showModal();
  };

  const handleActionClick = (fileId) => {
    // Set the file ID somewhere in the component's state
    setFileIdToDelete(fileId);

    // Show the modal
    actionModalRef.current.showModal();
  };

  React.useEffect(() => {
    getUserItems().then((userItemsFromServer) => {
      dispatch({ type: "SET_USERITEMS", payload: userItemsFromServer });
    });
  }, [userItems]);

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

    actionModalRef.current.close(); // Close the dialog
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

              <dialog id="my_modal_3" ref={deleteModalRef} className="modal">
                <form method="dialog" className="modal-box">
                  <button className="btn btn-sm btn-circle btn-ghost outline-none absolute right-2 top-2">
                    ✕
                  </button>
                  <h3 className="font-bold text-lg">Deletion Confirmation</h3>
                  <p className="mt-4 mb-2">
                    Are you sure you wanna permanently delete this?
                  </p>

                  <div className="mt-3 flex justify-end items-end">
                    <button
                      className="btn bg-green-400 px-5"
                      type="submit"
                      onClick={() => {
                        deleteUpload(fileIdToDelete);
                      }}
                    >
                      yes
                    </button>
                  </div>
                </form>
              </dialog>

              <dialog id="my_modal_1" ref={actionModalRef} className="modal">
                <form method="dialog" className="modal-box">
                  <div className="flex flex-col justify-center items-center p-0 m-0">
                    <div className="text-sm text-lg mb-3 flex flex-col text-center">
                      Add Email to share item with
                      <small>
                        Email user will have read permissions by default
                      </small>
                    </div>

                    <div className="form-control w-full max-w-xs ">
                      <input
                        type="text"
                        placeholder="Email"
                        className="input border-emerald-200 border w-full max-w-xs mb-6"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />

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

                    <div className="modal-action">
                      <span
                        className="btn"
                        onClick={(e) => handleAddClick(fileIdToDelete, e)}
                      >
                        Add
                      </span>
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn">Close</button>
                    </div>
                  </div>
                </form>
              </dialog>
            </TableCell>
          </tr>
        ))}
      </Datatables>
    </>
  );
}

export default UserTable;
