import React, { useState, useEffect } from "react";
import "../App.css";
import { useSelector } from "react-redux";
import { Pagination } from "antd";
import axios from "axios";
import "./Rides.css";
import { Menu, Dropdown, Modal } from "antd";
import moment from "moment";
const Rides = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const places = useSelector((state) => state.filters.places);
  const time = useSelector((state) => state.filters.time);
  const date = useSelector((state) => state.filters.date);
  const departure = useSelector((state) => state.filters.departure);
  const arrival = useSelector((state) => state.filters.arrival);
  const rating = useSelector((state) => state.filters.rating);
  const currency = useSelector((state) => state.filters.currency);

  const viewProfilePicture = (image) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  // const reportUser = (id) => {
  //   const data = new FormData();
  //   data.append("action", "report");
  //   data.append("id", id);
  //   data.append("reported_id", id);
  //   axios
  //     .get("http://localhost:8000/api/rides", data)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         if (response.status === 200) {
  //           const responseData = response.data;
  //           console.log(responseData);
  //           if (responseData === "[]null") {
  //             setOffers([]);
  //           } else {
  //             setOffers(responseData);
  //             console.log(responseData);
  //           }
  //
  //           alert("User has been reported.");
  //         } else {
  //           alert("An error occurred. Please try again later.");
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       alert("An error occurred. Please try again later.");
  //     });
  // };

  const menu = (image, id) => (
    <Menu>
      {/*<Menu.Item key="1" onClick={() => reportUser(id)}>*/}
      {/*  Report User*/}
      {/*</Menu.Item>*/}
      <Menu.Item key="2" onClick={() => viewProfilePicture(image)}>
        View Profile Picture
      </Menu.Item>
    </Menu>
  );
  const filters = useSelector((state) => state.filters);
  const [offers, setOffers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [subOffers, setSubOffers] = useState(offers.slice(0, 9));
  useEffect(() => {
    async function fetchData() {
      const formattedDate = moment(date).format("YYYY-MM-DD");

      try {
        const response = await axios.get(
          "http://localhost:8000/api/rides"
        );
        console.log(response);
        if (response.status === 200) {
          const responseData = response.data;
         console.log(responseData);
          if (responseData === "[]null") {
         console.log("inn");
            setOffers([]);
          } else {
            setOffers(responseData);
          }
        }
      } catch (error) {
      //  console.error(error);
        alert("An error occurred. Please try again later.");
      }
    }

    // Call fetchData only once when component mounts
    fetchData();
  }, [places, time, date, departure, arrival, rating, currency]);
  useEffect(() => {
    setSubOffers(offers.slice((currentPage - 1) * 9, currentPage * 9));
    //console.log("hereeeee");
    //console.log(subOffers);
  }, [currentPage, offers]);

  const buttonPressed = (offer) => {
    console.log("button pressed");
    let buttonOn = localStorage.getItem("buttonOn");
   // console.log(buttonOn);
    if (buttonOn == 0) {
      localStorage.setItem("buttonOn", 1);
      localStorage.setItem("rideId", offer.id);
      const associatedRide = localStorage.getItem("rideId");
      const user = localStorage.getItem("userId");
      const data = {
        userId: user
      };
    //  console.log(data.get("id"));
   //   console.log(data.get("ride_id"));
      axios
        .post("http://localhost:8000/join-ride/"+offer.id, data)
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            alert("Ride joined successfully.");
          } else {
            alert("An error occurred. Please try again later.");
          }
        })
        .catch((error) => {
          console.error(error);
          alert("An error occurred. Please try again later.");
        });
    } else {
      console.log(offer.id);
        console.log(localStorage.getItem("rideId"));
      if (offer.id != localStorage.getItem("rideId"))
        alert(
          "You have already joined a ride. You can only join one ride at a time."
        );
      else {
        const user = localStorage.getItem("userId");
        const data = {
          userId: user
        };
        axios
          .post("http://localhost:8000/leave-ride/"+offer.id, data)
          .then((response) => {
            console.log(response.data);
            if (response.status === 200) {
              alert("Ride left successfully.");
              localStorage.setItem("buttonOn", 0);
            } else {
              alert("An error occurred. Please try again later.");
            }
          })
          .catch((error) => {
            console.error(error);
            alert("An error occurred. Please try again later.");
          });
        localStorage.setItem("buttonOn", 0);
        localStorage.setItem("rideId", 0);
      }
    }
  };

  return (
    <div className="offers flex flex-col">
      <table className="tab">
        <thead>
          <tr>
            <th>Profile Picture</th>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Price</th>
            <th>From</th>
            <th>To</th>
            <th>Rating</th>
            <th>Places</th>
            <th></th>
          </tr>
        </thead>
        {subOffers.map((offer) => {
          return (
            <tr key={offer.id}>
              <td>
                <Dropdown
                  overlay={menu(
                    `data:image/png;base64,${offer.pfp_path}`,
                    offer.id
                  )}
                  trigger={["click"]}
                >
                  <img
                    src={`data:image/png;base64,${offer.pfp_path}`}
                    alt="Profile Picture"
                    className="pfp"
                  />
                </Dropdown>
              </td>
              <td>{offer.driver.firstname}</td>
              <td>{offer.departure_date}</td>
              <td>{offer.departure_time}</td>
              <td>{offer.price}</td>
              <td>{offer.departure}</td>
              <td>{offer.arrival}</td>
              <td>{offer.driver.rating}</td>
              <td>
                {offer.user_count}/{offer.places}
              </td>
              <td>
                <button
                  type="submit"
                  className={"button"}
                onClick={() => buttonPressed(offer)}
                >
                  Join/Leave
                </button>
              </td>
            </tr>
          );
        })}
      </table>
      <Pagination
        defaultCurrent={1}
        total={50}
        onChange={(page) => setCurrentPage(page)}
        className="pag"
      />
      <Modal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
      >
        <img
          src={selectedImage}
          alt="Profile"
          style={{ width: "100%", height: "auto" }}
        />
      </Modal>
    </div>
  );
};
export default Rides;
