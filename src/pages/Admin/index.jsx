import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import { Tabs } from "antd";
import AdminIntro from "./AdminIntro";
import AdminAbout from "./AdminAbout";
import { useSelector } from "react-redux";
import Experiences from "./AdminExperiences";
import AdminProjects from "./AdminProjects";
import Admincertificates from "./AdminCertificates";
import AdminContact from "./AdminContact";

const items = [
  {
    key: "1",
    label: "Intro",
    children: <AdminIntro />,
  },
  {
    key: "2",
    label: "About",
    children: <AdminAbout />,
  },
  {
    key: "3",
    label: "Experience",
    children: <Experiences />,
  },
  {
    key: "4",
    label: "Projects",
    children: <AdminProjects />,
  },
  {
    key: "5",
    label: "Certificates",
    children: <Admincertificates />,
  },
  {
    key: "6",
    label: "Contact",
    children: <AdminContact />,
  },
];

function Admin() {
  const { portfolioData } = useSelector((state) => state.root);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/admin-login";
    }
  }, []);

  return (
    <div>
      <Header />
      {/* <h1 className="text-2xl px-5 py-2 text-primary">Portfolio Admin</h1> */}
      <div className="flex items-center justify-between bg-gray-100 rounded-md shadow-md py-4 px-6">
        <h1 className="text-primary font-bold text-3xl">Portfolio Admin</h1>
        <h1
          className="underline text-primary cursor-pointer"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/admin-login";
          }}
        >
          Logout
        </h1>
      </div>
      {portfolioData && (
        <Tabs
          defaultActiveKey="1"
          items={items}
          // style={{  padding: "20px" }}
          className="px-5 pb-10"
        />
      )}
    </div>
  );
}

export default Admin;
