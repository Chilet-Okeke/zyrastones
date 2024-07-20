import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import moment from "moment";
import { addDays, format } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";
import { BiMinus, BiPlus, BiCheck } from "react-icons/bi";
import styled from "styled-components";
import { RxCross2 } from "react-icons/rx";
import Loader from "../../home/loader";
import { useDispatch, useSelector } from "react-redux";
import AnimateText from "@/animations/AnimateText";
import {
  DeleteReservation,
  UpdateReservation,
} from "@/features/reservation/reservationReducer";

import RoomModalSelection from "./RoomModalSelection";
import UserListSelection from "./UserListSelection";
import CreateRoomTab from "./CreateRoomTab";
import CreateGuestTab from "./CreateGuestTab";
export default function CreateReservationModal({ setModal }) {
  // const { deleteRoomisLoading, deleteRoomisSuccess } = useSelector(
  //   (store) => store.room
  // );
  const { updateReservationisLoading, deleteReservationisLoading } =
    useSelector((store) => store.reservation);
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState(0);
  const [discountprice, setDiscountPrice] = useState(0);
  const [room, setRoom] = useState(null);
  const [guests, setGuests] = useState(1);
  const [reservationtab, setReservationTab] = useState(1);
  const [user, setUser] = useState(null);

  // new guests data form
  const [newguest, setNewGuests] = useState({
    newguestname: "",
    newgueststreet: "",
    newguesthousenumber: "",
    newguestapartmentnumber: "",
    newguestcity: "",
    newguestpostcode: "",
    newguestphone: "",
    newguestemail: "",
  })


  const today = new Date();
  const [date, setDate] = React.useState({
    from: today,
    to: addDays(today, 3),
  });
  const [statustab, setStatusTab] = useState(null);
  // const dispatch = useDispatch();
  const handleClearAlert = () => {
    // setStatus("");
    // setStatusTab(null);
    // setModal({
    //   modal: false,
    // });
  };
  // const room = {}
  const HandleStatus = ({ stat, tab }) => {
    // console.log({ stat, tab });
    setStatus(stat);
    setStatusTab(tab);
  };
  const handleDeleteRoom = useCallback(() => { }, []);
  useEffect(() => {
    // dispatch(handleClearRoomAl());
    setStatus(room?.status);
  }, [setStatus]);

  const startdate = date?.from;
  const enddate = date?.to;
  let date1 = moment(startdate);
  let date2 = moment(enddate);
  const differenceInDays = date2?.diff(date1, "days");
  // console.log(room);

  const handleRoomId = (value) => {
    setRoom(value)
    // console.log(value)
  }

  const handleUserSelection = (value) => {
    setUser(value)
  }

  const totalPrice = (room?.price - discountprice) < 0 ? 0 : room?.price - discountprice
  const totalBookingPrice = totalPrice * differenceInDays

  return (
    <ReservationModalStyles
      as={motion.div}
      initial={{ opacity: 0 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
      }}
      animate={{
        opacity: 1,
        transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      <motion.div
        initial={{
          y: "100vh",
        }}
        animate={{
          y: "0",
          transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
        }}
        exit={{
          y: "100vh",
          transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
        }}
        className={"deleteCard gap-2"}
      >
        <div className="cross" onClick={handleClearAlert}>
          <RxCross2 />
        </div>
        <div className="deleteCardTop w-full sticky top-0 left-0 border-b p-4 pb-0 px-4 flex flex-col gap-1">
          <h3 className="text-2xl md:text-2xl font-semibold font-booking_font_bold">
            Add a Reservation
          </h3>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className={`p-2 px-4 capitalize font-booking_font_bold rounded-[4px] 
              text-center ${room?.status !== "PENDING" ? "bg-[#f9d955] text-[#000]" : "bg-[#0e7b10] text-[#fff]"}  
               text-xs font-bold`}>
                {/* {room?.status === "PENDING" ? "Pending Payment" : "Paid Payment"} */}
                Pending Payment
              </span>
            </div>

            <button
              disabled={updateReservationisLoading}
              onClick={() =>
                dispatch(
                  UpdateReservation({
                    reservationId: room?.id,
                    reservation: { status: status },
                  })
                )
              }
              className="btn px-4 text-white py-2 rounded-[10px] family1 font-booking_font font-bold flex items-center justify-center text-sm"
            // onClick={() => dispatch(AdminDeleteUserProfile({ Detailsdata: id }))}
            >
              {updateReservationisLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader type="dots" />
                  Update in progress
                </span>
              ) : (
                <AnimateText children={`Save `} />
              )}
            </button>
          </div>
          <div className="grid pt-4 w-full gap-4 md:grid-cols-4">
            <div onClick={() => setReservationTab(1)} className={`w-full cursor-pointer ${reservationtab === 1 ? "border-b-4 border-[#0e7b10]" : ""} text-[#000]
             pb-3 text-base font-booking_font_bold font-bold`}>
              Booking Details
            </div>

            <div onClick={() => setReservationTab(2)} className={`w-full cursor-pointer ${reservationtab === 2 ? "border-b-4 border-[#0e7b10]" : ""}
            text-[#000] pb-3 text-base font-booking_font_bold font-bold`}>
              Client Profile
            </div>
          </div>
        </div>
        {
          reservationtab === 1 ? <CreateRoomTab
            handleRoomId={handleRoomId}
            room={room}
            setDiscountPrice={setDiscountPrice}
            totalPrice={totalPrice}
            totalBookingPrice={totalBookingPrice}
            setGuests={setGuests}
            guests={guests}
            date={date}
            setDate={setDate}
            differenceInDays={differenceInDays}
          />
            : <CreateGuestTab
              handleUserSelection={handleUserSelection}
              newguest={newguest}
              setNewGuests={setNewGuests}
            />
        }



        <div className="deleteCardBottom py-2 w-full flex flex-row gap-2 items-center md:justify-end px-4">
          <button
            className="family1 font-booking_font font-bold flex items-center justify-center text-sm"
            onClick={handleClearAlert}
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </ReservationModalStyles>
  );
}

const ReservationModalStyles = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  display: flex;
  z-index: 20;
  align-items: center;
  justify-content: center;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  padding: 2rem 0;
  .deleteCard {
    max-width: 1250px;
    min-width: 1250px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2rem 3rem rgba(0, 0, 0, 0.4);
    position: relative;
    @media (max-width: 980px) {
      max-width: 90%;
      min-width: 90%;
    }
    .cross {
      position: absolute;
      right: 15px;
      top: 2%;
      width: 2.4rem;
      height: 2.4rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 40000;
      &:hover {
        background: #eee;
      }
      svg {
        font-size: 20px;
      }
    }
    .deleteCardBottom {
      display: flex;
      gap: 1.5rem;
      button {
        padding: 0.5rem 2rem;
        min-height: 46px;
        border: none;
        font-weight: 600;
        background: #eee;
        color: #000;
        outline: none;
        border-radius: 10px;
        cursor: pointer;
        &:hover {
          background: #c4c4c4;
        }
        &.deleteBtn {
          background: var(--red);
          color: #fff;
          &:hover {
            opacity: 0.8;
            color: #fff;
          }
        }
      }
    }
    .deleteCardCenter {
      padding: 2rem 0;
      width: 100%;
      background: var(--grey-3);
      border-left: 5px solid var(--red);
      display: flex;
      align-items: center;
      svg {
        font-size: 2rem;
        color: var(--red);
      }
    }

    .deleteCardTop {
      display: flex;
      flex-direction: column;
    }
  }
`;
