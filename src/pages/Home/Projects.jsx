import React from "react";
import SectionTitel from "../../components/Header/SectionTitel";
// import { projects } from "../../resources/projects";
import { useSelector } from "react-redux";

function Projects() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const { projects } = portfolioData;

  return (
    <div>
      <SectionTitel title="Projects" />

      <div className="flex py-10 gap-32 sm:flex-col">
        {/* displaying the Projects title */}

        <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {projects.map((project, index) => (
            <div
              onClick={() => {
                setSelectedItemIndex(index);
              }}
              className="cursor-pointer"
            >
              <h1
                className={`text-xl px-10 ${
                  selectedItemIndex === index
                    ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#04645f5f] py-3"
                    : "text-white"
                }`}
              >
                {project.title}
              </h1>
            </div>
          ))}
        </div>

        {/* displaying the content of those projects title */}
        <div className="flex items-center justify-center gap-10 sm:flex-col">
          <img
            src={projects[selectedItemIndex].image}
            alt=""
            className="h-60 w-72"
          />
          <div className="flex flex-col gap-5">
            <h1 className="text-secondary text-xl">
              {projects[selectedItemIndex].title}
            </h1>

            <p className="text-white">
              {projects[selectedItemIndex].description}
            </p>
            <p className="text-white">
              ShopEase is a full-stack e-commerce platform featuring user
              authentication, product catalog, shopping cart, and secure
              checkout with payment integration. Built with React.js, Node.js,
              Express, and MongoDB, it includes user profiles, admin panel, and
              responsive design. The project demonstrates proficiency in modern
              web development, overcoming challenges in inventory management,
              data security, and performance optimization. ShopEase showcases
              the ability to create a secure, efficient, and user-friendly
              online shopping solution
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
