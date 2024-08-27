import { Form, Input, message, Modal } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { HideLoading, ReloadData, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";

function Experiences() {
  const dispatch = useDispatch();

  const { portfolioData } = useSelector((state) => state.root);

  const { experiences } = portfolioData;
  // console.log(portfolioData);

  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  // When we click on Edit button it has to perform two statements at the same time:-
  // 1) It has to set the data into setSelectedModel for edit
  // 2) And we have to make the model true
  // so both are happning at the same time thats why we could not retrieve
  // the exact data in the model,
  // For the we created a fleg of usState add
  const [type, setType] = React.useState("add");

  //   To Reset the Entity Form When click on diff certificate or add Certificate
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;
      // Here we are checking if the opration we are doing is Adding Exp or Updating it
      if (selectedItemForEdit) {
        response = await axios.post(
          "http://localhost:5000/api/portfolio/update-experience",
          {
            ...values,
            _id: selectedItemForEdit._id,
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:5000/api/portfolio/add-experience",
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
        "http://localhost:5000/api/portfolio/delete-experience",
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
            form.resetFields();
            // setType("add");
          }}
        >
          Add Experience
        </button>
      </div>

      <div className="grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1">
        {experiences.map((experience) => (
          <div className="shadow border p-5 border-gray-400 flex flex-col">
            <h1 className="text-primary text-xl font-bold">
              {experience.period}
            </h1>
            <hr />
            <h1>
              <span className="font-bold">Company :</span> {experience.company}
            </h1>
            <h1>
              <span className="font-bold">Role :</span> {experience.title}
            </h1>
            <h1>
              <span className="font-bold">Description :</span>{" "}
              {experience.description}
            </h1>

            <div className="flex justify-end gap-5 mt-5">
              <button
                className="bg-red-500 text-white px-5 py-2 "
                onClick={() => {
                  onDelete(experience);
                }}
              >
                Delete
              </button>
              <button
                className="bg-primary text-white px-5 py-2 "
                onClick={() => {
                  setSelectedItemForEdit(experience);
                  form.setFieldsValue(experience);
                  setShowAddEditModal(true);
                  // setType("edit");
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Here we added the condition to show the modal */}
      {/* {(type === "add" || selectedItemForEdit) && ( */}
      <Modal
        open={showAddEditModal}
        title={selectedItemForEdit ? "Edit Experience" : "Add Experience"}
        footer={null}
        onCancel={() => {
          setShowAddEditModal(false);
          form.resetFields();
          setSelectedItemForEdit(null);
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          // initialValues={selectedItemForEdit || {}}
        >
          <Form.Item name="period" label="Period">
            <Input placeholder="Period" />
          </Form.Item>
          <Form.Item name="company" label="Company">
            <Input placeholder="Company" />
          </Form.Item>
          <Form.Item name="title" label="Title">
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input placeholder="Description" />
          </Form.Item>

          <div className="flex justify-end">
            {/* <button
                className="border-primary text-primary px-5 py-2"
                onClick={() => {
                  setShowAddEditModal(false);
                  setSelectedItemForEdit(null);
                }}
              >
                Cancel
              </button> */}
            <button className="bg-primary text-white px-5 py-2" type="submit">
              {selectedItemForEdit ? "Update" : "Add"}
            </button>
          </div>
        </Form>
      </Modal>
      {/* )} */}
    </div>
  );
}

export default Experiences;
