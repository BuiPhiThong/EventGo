import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import "./Admin.css";
import { fetchAllEvent } from "../../../reducer/eventReducer";
import { apiDeleteEvent } from "../../../apis/event/event";
import {toast} from 'react-toastify'

const Admin = () => {
  const dispatch = useDispatch();
  const { eventAll, errorEventAll, loadingEventAll } = useSelector(
    (state) => state.event
  );

  useEffect(() => {
    dispatch(fetchAllEvent());
  }, [dispatch]);
  const [selectedOption, setSelectedOption] = useState(""); // Dropdown Admin
  const [eventStatusFilter, setEventStatusFilter] = useState(""); // Lọc theo trạng thái sự kiện
  const [userStatusFilter, setUserStatusFilter] = useState(""); // Lọc theo trạng thái người dùng
  const [titleFilter, setTitleFilter] = useState(""); // Lọc theo tiêu đề sự kiện

  const [isUsersMenuOpen, setIsUsersMenuOpen] = useState(false);
  const [isEventMenuOpen, setIsEventMenuOpen] = useState(false);

  const [isEventDetail, setIsEventDetail] = useState(false);
  const [isEventList, setIsEventList] = useState(false);
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


 const handleDeletedEvent =async(eid)=>{
    try {
      const response = await apiDeleteEvent(eid)

      if(response?.success){
        toast.success('Remove successfully',{ icon: "🚀" })
        dispatch(fetchAllEvent())
      }
    } catch (error) {
      toast.success(`Remove Failed`, { icon: "🚀" });
    }
 }
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

            <button className="btn btn-primary mb-3">Add Event</button>
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
                  eventAll?.mess?.map((event) => (
                    <tr key={event?.id}>
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
                          <button className="btn btn-danger btn-sm" onClick={()=>handleDeletedEvent(event?._id)}>
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
