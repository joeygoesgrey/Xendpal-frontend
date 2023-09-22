import {
  faTachometer,
  faFolderTree,
  faUpload,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";

const initMenu = [

  {
    label: "Upload",
    path: "/upload",
    icon: faUpload,
  },

  {
    label: "My Items",
    path: "/items",
    icon: faFolderTree,
  },

  {
    label: "Dashboard",
    path: "/",
    icon: faTachometer,
  },
  {
    label: "History",
    path: "/history",
    icon: faHistory,
  },
];

export default initMenu