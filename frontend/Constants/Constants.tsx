import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
  FaFileImage,
  FaFileAlt,
} from "react-icons/fa";

export const fileTypes = [
  {
    value: "all",
    label: "All",
    icon: <FaFileAlt className="inline-block w-4 h-4 mr-2 text-gray-600" />,
  },
  {
    value: "pdf",
    label: "PDF",
    icon: <FaFilePdf className="inline-block w-4 h-4 mr-2 text-red-600" />,
  },
  {
    value: "doc",
    label: "DOC",
    icon: <FaFileWord className="inline-block w-4 h-4 mr-2 text-blue-600" />,
  },
  {
    value: "xls",
    label: "XLS",
    icon: <FaFileExcel className="inline-block w-4 h-4 mr-2 text-green-600" />,
  },
  {
    value: "ppt",
    label: "PPT",
    icon: (
      <FaFilePowerpoint className="inline-block w-4 h-4 mr-2 text-orange-600" />
    ),
  },
  {
    value: "jpeg",
    label: "JPEG",
    icon: <FaFileImage className="inline-block w-4 h-4 mr-2 text-yellow-600" />,
  },
  {
    value: "png",
    label: "PNG",
    icon: <FaFileImage className="inline-block w-4 h-4 mr-2 text-blue-300" />,
  },
];
