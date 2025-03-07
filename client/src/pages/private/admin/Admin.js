import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import "./Admin.css";
import { fetchAllEvent } from "../../../reducer/eventReducer";
import { apiCreateEvent, apiDeleteEvent } from "../../../apis/event/event";
import { toast } from "react-toastify";
import { fetchDataSpeaker } from "../../../reducer/speakerReducer";

const Admin = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const [beforeBackGroundImage, setBeforeBackGroundImage] = useState(null);
  const [afterBackgroundImage, setAfterBackgroundImage] = useState(null);
  const [afterLogoImage, setAfterLogoImage] = useState(null);

  const { dataSpeakerAll } = useSelector((state) => state.speakerList);

  useEffect(() => {
    dispatch(fetchDataSpeaker());
  }, [dispatch]);

  const { eventAll, errorEventAll, loadingEventAll } = useSelector(
    (state) => state.event
  );
  const handleModalToggle = () => {
    setShowModal(!showModal);
  };
  useEffect(() => {
    dispatch(fetchAllEvent());
  }, [dispatch]);
  const [selectedOption, setSelectedOption] = useState(""); // Dropdown Admin
  const [eventStatusFilter, setEventStatusFilter] = useState(""); // Lọc theo trạng thái sự kiện
  const [userStatusFilter, setUserStatusFilter] = useState(""); // Lọc theo trạng thái người dùng
  const [titleFilter, setTitleFilter] = useState(""); // Lọc theo tiêu đề sự kiện

  const [isUsersMenuOpen, setIsUsersMenuOpen] = useState(false);
  const [isEventMenuOpen, setIsEventMenuOpen] = useState(false);
  const [updEventMenu,setUpdEventMenu] = useState(false)

  const [isEventDetail, setIsEventDetail] = useState(false);
  const [isEventList, setIsEventList] = useState(false);

  const [formAdd, setFormAdd] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    capacity: "",
    category: "",
    speaker: "",
    backgroundImage: "",
    logoImage: "",
  });

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "logout") {
      alert("Logging out...");
    }
  };

  // Lọc dữ liệu dựa trên bộ lọc

  const handleSelectEvent = (view) => {
    if (view === "list") {
      setIsEventList(true);
      setIsEventDetail(false);
    } else if (view === "detail") {
      setIsEventList(false);
      setIsEventDetail(true);
    }
  };

  const categoriesEvent = [
    "Technology",
    "Business",
    "Design",
    "Education",
    "Science",
    "Health",
    "Entertainment",
    "Cuisine",
  ];

  const handleDeletedEvent = async (eid) => {
    const alert = 'Are you delete this event'
    if (window.confirm(alert)) {
      try {
        const response = await apiDeleteEvent(eid);

        if (response?.success) {
          toast.success("Remove successfully", { icon: "🚀" });
          dispatch(fetchAllEvent());
        }
      } catch (error) {
        toast.success(`Remove Failed`, { icon: "🚀" });
      }
    }
  };

  const handleInputAdd = (e) => {
    const { name, value } = e.target;
    setFormAdd(() => ({
      ...formAdd,
      [name]: value,
    }));
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", formAdd.title);
    formData.append("description", formAdd.description);
    formData.append("date", formAdd.date);
    formData.append("location", formAdd.location);
    formData.append("capacity", formAdd.capacity);
    formData.append("category", formAdd.category);
    formData.append("speaker", formAdd.speaker);

    if (afterLogoImage) formData.append("logoImage", afterLogoImage);
    if (afterBackgroundImage)
      formData.append("backgroundImage", afterBackgroundImage);
    try {
      const response = await apiCreateEvent(formData);
      if (response?.success) {
        toast.success("Create event successfully!");
        setFormAdd({
          title: "",
          description: "",
          date: "",
          location: "",
          capacity: "",
          category: "",
          speaker: "",
          backgroundImage: "",
          logoImage: "",
        });  
        dispatch(fetchAllEvent());
      }
      // Bạn có thể xử lý thêm nếu muốn, ví dụ reset form hoặc đóng modal
    } catch (error) {
      console.error(error);
      // Xử lý lỗi tại đây (ví dụ: thông báo lỗi cho người dùng)
    }
  };

  const handleChooseImgBackGround = (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error("Please choose image to create event");
      return;
    }

    const validFormImage = ["image/jpeg", "image/png"];

    if (!validFormImage.includes(file.type)) {
      toast.error("Please choose image file must be jpeg or png");
      return;
    }

    // Gửi tệp hình ảnh thay vì đọc và lưu dưới dạng base64
    setAfterBackgroundImage(file); // Lưu tệp gốc để gửi đi
  };

  const handleChooseImgLogo = (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error("Please choose image to create event");
      return;
    }

    const validFormImage = ["image/jpeg", "image/png"];

    if (!validFormImage.includes(file.type)) {
      toast.error("Please choose image file must be jpeg or png");
      return;
    }

    // Gửi tệp hình ảnh thay vì đọc và lưu dưới dạng base64
    setAfterLogoImage(file); // Lưu tệp gốc để gửi đi
  };

  
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="sidebar border-end p-3">
        <h4 className="text-center mb-4">Event Go</h4>
        <nav className="nav flex-column">
          {/* Users Dropdown */}
          <div className="nav-item">
            <a
              href="#"
              className="nav-link fw-bold d-flex justify-content-between align-items-center"
              onClick={() => setIsUsersMenuOpen(!isUsersMenuOpen)}
            >
              <span>Users</span>
              <span>{isUsersMenuOpen ? "▼" : "▶"}</span>
            </a>
            {isUsersMenuOpen && (
              <div className="submenu">
                <a href="#" className="nav-link">
                  User Grid
                </a>
                <a href="#" className="nav-link">
                  User List
                </a>
                <a href="#" className="nav-link">
                  Users Profile
                </a>
              </div>
            )}
          </div>
          <div className="nav-item">
            <a
              href="#"
              className="nav-link fw-bold d-flex justify-content-between align-items-center"
              onClick={() => setIsEventMenuOpen(!isEventMenuOpen)}
            >
              <span>Event</span>
              <span>{isEventMenuOpen ? "▼" : "▶"}</span>
            </a>
            {isEventMenuOpen && (
              <div className="submenu">
                <a
                  className="nav-link"
                  onClick={() => handleSelectEvent("list")}
                >
                  Event List
                </a>
                <a
                  className="nav-link"
                  onClick={() => handleSelectEvent("detail")}
                >
                  Event Detail
                </a>
              </div>
            )}
          </div>
        </nav>
      </div>

      <div className="content p-4 flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3></h3>

          <div className="d-flex align-items-center">
            <select
              className="form-select"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="" disabled hidden>
                Admin
              </option>
              <option value="profile">Profile</option>
              <option value="settings">Settings</option>
              <option value="logout" className="text-danger">
                Logout
              </option>
            </select>
          </div>
        </div>

        {isEventList && (
          <div>
            <h3>Event List</h3>
            <div className="d-flex gap-2 mb-3 mt-5">
              <select
                className="form-select w-auto"
                value={eventStatusFilter}
                onChange={(e) => setEventStatusFilter(e.target.value)}
              >
                <option value="">All Event Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <select
                className="form-select w-auto"
                value={userStatusFilter}
                onChange={(e) => setUserStatusFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                {categoriesEvent.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {/* <input
                type="text"
                className="form-control w-25"
                placeholder="Filter by Title"
                value={titleFilter}
                onChange={(e) => setTitleFilter(e.target.value)}
              /> */}
            </div>

            {/* Table */}
            {showModal && (
              <div
                className="modal fade show"
                tabIndex="-1"
                style={{ display: "block" }}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Add Event
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => setShowModal(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleSubmitAdd}>
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">
                            Title
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="title"
                            onChange={handleInputAdd}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="description" className="form-label">
                            Description
                          </label>
                          <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            onChange={handleInputAdd}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="date" className="form-label">
                            Date
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id="date"
                            name="date"
                            onChange={handleInputAdd}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="location" className="form-label">
                            Location
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="location"
                            name="location"
                            required
                            onChange={handleInputAdd}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="category" className="form-label">
                            Category
                          </label>
                          <select
                            onChange={handleInputAdd}
                            name="category"
                            className="form-select"
                          >
                            {categoriesEvent?.map((item, index) => (
                              <option value={item} key={index}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="capacity" className="form-label">
                            Capacity
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="capacity"
                            name="capacity"
                            onChange={handleInputAdd}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="backgroundImage"
                            className="form-label"
                          >
                            BackgroundImage
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            id="backgroundImage"
                            name="backgroundImage"
                            onChange={handleChooseImgBackGround}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="logoImage" className="form-label">
                            Logo Image
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            id="logoImage"
                            name="logoImage"
                            onChange={handleChooseImgLogo}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="speaker" className="form-label">
                            Speakers
                          </label>
                          <select
                            onChange={handleInputAdd}
                            name="speaker"
                            className="form-select"
                          >
                            {dataSpeakerAll?.map((item, index) => (
                              <option value={item?._id} key={index}>
                                {item?.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Save Event
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <button
              className="btn btn-primary mb-3"
              onClick={handleModalToggle}
            >
              Add Event
            </button>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>EndDate</th>
                  <th>Location</th>
                  <th>OrganizerUnit</th>
                  <th>Capacity</th>
                  <th>Attendees</th>
                  <th>EventStatus</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {eventAll?.mess?.length > 0 ? (
                  eventAll?.mess?.map((event, index) => (
                    <tr key={index}>
                      <td>{event?.title}</td>
                      <td>{new Date(event?.date).toDateString()}</td>
                      <td>{event?.endDate || "N/A"}</td>
                      <td>{event?.location || "N/A"}</td>

                      <td>
                        <div>
                          <strong>{event?.organizerUnit?.name || "N/A"}</strong>
                          <br />
                          📍 {event?.organizerUnit?.address || "No Address"}
                          <br />
                          📞{" "}
                          {event?.organizerUnit?.contactInfo?.phone ||
                            "No Phone"}
                          <br />
                          📧{" "}
                          {event?.organizerUnit?.contactInfo?.email ||
                            "No Email"}
                        </div>
                      </td>
                      <td>{event?.capacity}</td>
                      <td>{event?.attendees?.length || 0}</td>
                      <td>
                        <span
                          className={`badge bg-${
                            event.status === "upcoming"
                              ? "warning"
                              : event.status === "ongoing"
                              ? "primary"
                              : event.status === "completed"
                              ? "success"
                              : "danger"
                          }`}
                        >
                          {event?.status}
                        </span>
                      </td>
                      <td>
                        {/* Dùng d-flex để hiển thị nút ngang hàng */}
                        <div className="d-flex gap-2">
                          <button className="btn btn-primary btn-sm">
                            Update
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeletedEvent(event?._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center text-muted">
                      No events found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* EventDetail */}
        {isEventDetail && (
          <div>
            <h3>Event Detail</h3>
            <div className="d-flex gap-2 mb-3 mt-5">
              <select
                className="form-select w-auto"
                value={eventStatusFilter}
                onChange={(e) => setEventStatusFilter(e.target.value)}
              >
                <option value="">All Event Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <select
                className="form-select w-auto"
                value={userStatusFilter}
                onChange={(e) => setUserStatusFilter(e.target.value)}
              >
                <option value="">All User Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              {/* 
          <input
            type="text"
            className="form-control w-25"
            placeholder="Filter by Title"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
          /> */}
            </div>

            {/* Table */}
            <button className="btn btn-primary mb-3">Add Event</button>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>End Date</th>
                  <th>Capacity</th>
                  <th>Attendees</th>
                  <th>Event Status</th>
                  <th>User Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {eventAll.length > 0 ? (
                  eventAll.map((event) => (
                    <tr key={event.id}>
                      <td>{event.name}</td>
                      <td>{event.email}</td>
                      <td>{event.phone}</td>
                      <td>{event.title}</td>
                      <td>{event.date}</td>
                      <td>{event.endDate}</td>
                      <td>{event.capacity}</td>
                      <td>{event.attendees}</td>
                      <td>
                        <span
                          className={`badge bg-${
                            event.status === "upcoming"
                              ? "warning"
                              : event.status === "ongoing"
                              ? "primary"
                              : event.status === "completed"
                              ? "success"
                              : "danger"
                          }`}
                        >
                          {event.status}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge bg-${
                            event.userStatus === "pending"
                              ? "secondary"
                              : event.userStatus === "confirmed"
                              ? "success"
                              : "danger"
                          }`}
                        >
                          {event.userStatus}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-info btn-sm">Update</button>
                        <button className="btn btn-info btn-sm">Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="text-center text-muted">
                      No events found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
