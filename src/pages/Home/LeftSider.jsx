import React from "react";

function LeftSider() {
  return (
    <div className="fixed left-0 bottom-0 px-10  sm:static">
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="/">
            <i class="ri-facebook-box-fill text-gray-500 "></i>
          </a>
          <i class="ri-mail-send-fill text-gray-500 "></i>
          <i class="ri-linkedin-box-fill text-gray-500 "></i>
          <i class="ri-github-fill text-gray-500 "></i>
        </div>

        <div className="w-[1px] h-32 bg-[#048f6786] sm:hidden"></div>
      </div>
    </div>
  );
}

export default LeftSider;
