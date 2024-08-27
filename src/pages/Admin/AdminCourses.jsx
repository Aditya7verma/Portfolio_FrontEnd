import { Form, Input, message, Modal } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { HideLoading, ReloadData, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminCourses() {
  const dispatch = useDispatch();

  const { portfolioData } = useSelector((state) => state.root);

  const { courses } = portfolioData;

  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  const [type, setType] = React.useState("add");

  const onFinish = async (values) => {
    // This is for as Technologies is in string to convert it in Array
    const tempTechnologies = values.technologies.split(",");
    values.technologies = tempTechnologies;
    try {
      dispatch(ShowLoading());
      let response;

      if (selectedItemForEdit) {
        response = await axios.post(
          "http://localhost:5000/api/portfolio/update-course",
          {
            ...values,
            _id: selectedItemForEdit._id,
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:5000/api/portfolio/add-course",
          values
        );
      }

      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        setShowAddEditModal(false);
        setSelectedItemForEdit(null);
        dispatch(HideLoading());
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const onDelete = async (item) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "http://localhost:5000/api/portfolio/delete-course",
        {
          _id: item._id,
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(HideLoading());
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  return (
    <div>
      <div className="flex justify-end">
        <button
          className="bg-primary px-5 py-2 text-white"
          onClick={() => {
            setSelectedItemForEdit(null);
            setShowAddEditModal(true);
            setType("add");
          }}
        >
          Add course
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5 mt-5">
        {courses.map((course) => (
          <div className="shadow border p-5 border-gray-400 flex flex-col gap-5">
            <h1 className="text-primary text-xl font-bold">{course.title}</h1>
            <hr />
            <h1>
              <img src={course.image} alt="" className="h-60 2-80" />
            </h1>
            <h1>
              <span className="font-bold">Title :</span> {course.title}
            </h1>
            <h1>
              <span className="font-bold">Description :</span>{" "}
              {course.description}
            </h1>

            <div className="flex justify-end gap-5 mt-5">
              <button
                className="bg-red-500 text-white px-5 py-2 "
                onClick={() => {
                  onDelete(course);
                }}
              >
                Delete
              </button>
              <button
                className="bg-primary text-white px-5 py-2 "
                onClick={() => {
                  setSelectedItemForEdit(course);
                  setShowAddEditModal(true);
                  setType("edit");
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {(type === "add" || selectedItemForEdit) && (
        <Modal
          visible={showAddEditModal}
          title={selectedItemForEdit ? "Edit course" : "Add course"}
          footer={null}
          onCancel={() => {
            setShowAddEditModal(false);
            setSelectedItemForEdit(null);
          }}
        >
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={
              {
                ...selectedItemForEdit,
                technologies: selectedItemForEdit?.technologies.join(", "),
              } || {}
            }
          >
            <Form.Item name="title" label="Title">
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item name="image" label="Image URL">
              <Input placeholder="Image" />
            </Form.Item>

            <Form.Item name="description" label="Description">
              <textarea placeholder="Description" />
            </Form.Item>

            <Form.Item name="link" label="Link">
              <Input placeholder="Link" />
            </Form.Item>

            <Form.Item name="technologies" label="Technologies">
              <Input placeholder="Technologies" />
            </Form.Item>

            <div className="flex justify-end">
              <button
                className="border-primary text-primary px-5 py-2"
                onClick={() => {
                  setShowAddEditModal(false);
                  setSelectedItemForEdit(null);
                }}
              >
                Cancel
              </button>
              <button className="bg-primary text-white px-5 py-2" type="submit">
                {selectedItemForEdit ? "Update" : "Add"}
              </button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default AdminCourses;
