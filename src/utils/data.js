import { AiFillHome, AiOutlineCompass, AiOutlineLike } from "react-icons/ai";
import {
  MdOutlineSubscriptions,
  MdOutlineLibraryAddCheck,
} from "react-icons/md";
import { RiHistoryFill, RiVideoLine, RiChatHistoryLine } from "react-icons/ri";

export const publics = [
  { icons: <AiFillHome fontSize={24} />, name: "Home" },
  { icons: <AiOutlineCompass fontSize={24} />, name: "Khám phá" },
  { icons: <MdOutlineSubscriptions fontSize={24} />, name: "Kênh đăng ký" },
  { c: true },
  { icons: <MdOutlineLibraryAddCheck fontSize={24} />, name: "Thư viện" },
  {
    icons: <RiHistoryFill fontSize={24} fontWeight={1000} />,
    name: "Video đã xem",
  },
  { icons: <RiVideoLine fontSize={24} />, name: "Video của bạn" },
  { icons: <RiChatHistoryLine fontSize={24} />, name: "Xem sau" },
  { icons: <AiOutlineLike fontSize={24} />, name: "Video đã thích" },
];
