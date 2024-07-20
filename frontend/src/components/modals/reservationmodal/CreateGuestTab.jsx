import React from 'react'
import UserListSelection from './UserListSelection';
import { DashboardGuestsInputData } from '@/constants/data/formdata';
export default function CreateGuestTab({
  handleUserSelection,
  newguest,
  setNewGuests,
}) {
  const handleFormChange = (e) => {
    setNewGuests({
      ...newguest,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="p-4 h-[450px] md:h-[450px] overflow-auto  px-4 md:px-8 grid w-full gap-8 md:grid-cols-custom_5">
      <div className="w-full flex flex-col gap-4 pt-3">
        <h3 className="text-base font-bold w-full pb-4 border-b family1">
          Client profile
        </h3>
        <div className="flex flex-col gap-2 w-full">
          <span className="font-semibold text-sm"> Guest:</span>
          <UserListSelection handleUserSelection={handleUserSelection} />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <span className="font-semibold text-sm">Add New Guest:</span>
          <div className="w-full flex flex-col gap-3">
          <form
              // onSubmit={handleFormSubmision}
              className="grid md:grid-cols-2 gap-8"
            >
              {DashboardGuestsInputData?.map((input, index) => {
                return (
                  <label
                    key={index}
                    htmlFor={input.label}
                    className="text-xs font-booking_font rounded-[10px] flex flex-col gap-2 text-dark"
                  >
                    <span className="text-dark ">{input.text}</span>
                    <input
                      className="w-full input rounded-2xl text-dark
                           font-normal text-sm"
                      required={true}
                      name={input?.name}
                      id={input.label}
                      value={newguest[input.name]}
                      type={input.type}
                      placeholder={input.label}
                      onChange={handleFormChange}
                    ></input>
                  </label>
                );
              })}
            </form>
          </div>
        </div>
      </div>
      <div className="w-[250px]"></div>
    </div>
  )
}
