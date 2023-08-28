import {
  faTachometer,
  faFolderTree,
  faUpload,
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
];

export default initMenu