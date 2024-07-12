import React from "react";
import IconHamburger from "./IconHamburger";
import IconClose from "./IconClose";

interface FrontendMentorHeaderProps {
  sidebarIsOpen: boolean;
  setSidebarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FrontendMentorHeader: React.FC<FrontendMentorHeaderProps> = ({
  sidebarIsOpen,
  setSidebarIsOpen,
}) => {
  const handleClick = () => {
    setSidebarIsOpen((sidebarIsOpen) => !sidebarIsOpen);
  };
  return (
    <div className="flex h-[72px] w-screen items-center justify-between bg-[url('src/assets/suggestions/mobile/background-header.png')] bg-cover px-[24px] py-[15px] md:h-[178px] md:w-[223px] md:items-end md:rounded-xl md:bg-[url('src/assets/suggestions/tablet/background-header.png')] xl:h-[137px] xl:w-[255px] xl:bg-[url('src/assets/suggestions/desktop/background-header.png')] xl:p-[24px]">
      <div className="flex flex-col">
        <p className="text-body-4 text-bt-white_def md:text-h2">
          Frontend Mentor
        </p>
        <p className="text-body-3 text-feedback-board md:text-body-2">
          Feedback Board
        </p>
      </div>
      <div onClick={handleClick} className="md:hidden">
        {sidebarIsOpen ? <IconClose /> : <IconHamburger />}
      </div>
    </div>
  );
};

export default FrontendMentorHeader;
