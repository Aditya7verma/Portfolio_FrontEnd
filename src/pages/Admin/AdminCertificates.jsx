import { Form, Input, message, Modal } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { HideLoading, ReloadData, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";

function Admincertificates() {
  const dispatch = useDispatch();

  const { portfolioData } = useSelector((state) => state.root);

  const { certificates } = portfolioData;

  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  const [type, setType] = React.useState("add");
  //   To Reset the Entity Form When click on diff certificate or add Certificate
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    // This is for as Technologies is in string to convert it in Array
    // Here due to in  technologies and values i didnot applied ? so AddCertificate is not working
    const tempTechnologies = values?.technologies?.split(",") || [];
    values.technologies = tempTechnologies;
    try {
      dispatch(ShowLoading());
      let response;

      if (selectedItemForEdit) {
        response = await axios.post(
          "https://portfolio-mern-1-78st.onrender.com/api/portfolio/update-certificate",
          {
            ...values,
            _id: selectedItemForEdit._id,
          }
        );
      } else {
        response = await axios.post(
          "https://portfolio-mern-1-78st.onrender.com/api/portfolio/add-certificate",
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
        // To Reset the Form
        // form.resetFields();
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
        "https://portfolio-mern-1-78st.onrender.com/api/portfolio/delete-certificate",
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
          Add certificate
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5 mt-5 sm:grid-cols-1">
        {certificates.map((certificate) => (
          <div className="shadow border p-5 border-gray-400 flex flex-col gap-5">
            <h1 className="text-primary text-xl font-bold">
              {certificate.title}
            </h1>
            <hr />
            <h1>
              <img
                src={certificate.image}
                alt=""
                className="h-60 2-80 rounded"
              />
            </h1>
            {/* <h1>
              <span className="font-bold">Title :</span> {certificate.title}
            </h1> */}
            <h1>
              <span className="font-bold">Duration :</span>{" "}
              {certificate.duration}
            </h1>
            <h1>
              <span className="font-bold">Description :</span>{" "}
              {certificate.description}
            </h1>

            <div className="flex justify-end gap-5 mt-5">
              <button
                className="bg-red-500 text-white px-5 py-2 "
                onClick={() => {
                  onDelete(certificate);
                }}
              >
                Delete
              </button>
              <button
                className="bg-primary text-white px-5 py-2 "
                onClick={() => {
                  setSelectedItemForEdit(certificate);
                  form.setFieldsValue(certificate);
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

      {/* {(type === "add" || selectedItemForEdit) && ( */}
      <Modal
        open={showAddEditModal}
        title={selectedItemForEdit ? "Edit Certificate" : "Add Certificate"}
        footer={null}
        onCancel={() => {
          setShowAddEditModal(false);
          form.resetFields();
          setSelectedItemForEdit(null);
        }}
      >
        <Form
          //   To Reset the Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          // initialValues={selectedItemForEdit}
        >
          <Form.Item name="title" label="Title">
            <Input placeholder="Title" />
          </Form.Item>

          <Form.Item name="image" label="Image URL">
            <Input placeholder="Image" />
          </Form.Item>

          <Form.Item name="duration" label="Duration">
            <textarea placeholder="Duration" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <textarea placeholder="Description" />
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

export default Admincertificates;
