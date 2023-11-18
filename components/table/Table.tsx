import clsx from 'clsx';
import React from 'react';
import { FaTrashCan } from 'react-icons/fa6';

type Props = {
  data: Array<any>;
  onDelete: () => void;
};

const Table = (props: Props) => {
  return (
    <div>
      <div className="px-5 py-2 flex items-center bg-black text-white font-bold">
        <div className="w-[14.285714%] text-center">Name</div>
        <div className="w-[14.285714%] text-center">Phone Number</div>
        <div className="w-[14.285714%] text-center">Lebanese</div>
        <div className="w-[14.285714%] text-center">Box Name</div>
        <div className="w-[14.285714%] text-center">Amperage</div>
        <div className="w-[14.285714%] text-center">Old Counter</div>
        <div className="w-[14.285714%] text-center">...</div>
      </div>

      {props.data.map((row, idx) => (
        <div
          key={idx}
          className={clsx('px-5 py-2 flex items-center', {
            'bg-gray-200': idx % 2 !== 0,
          })}
        >
          <div className="w-[14.285714%] text-center">{row.name}</div>
          <div className="w-[14.285714%] text-center">{row.phone_number}</div>
          <div className="w-[14.285714%] text-center">
            {row.lebanese ? 'True' : 'False'}
          </div>
          <div className="w-[14.285714%] text-center">{row.box_name}</div>
          <div className="w-[14.285714%] text-center">{row.amperage}</div>
          <div className="w-[14.285714%] text-center">{row.old_counter}</div>
          <div className="w-[14.285714%] flex justify-center items-center">
            <FaTrashCan
              onClick={() => props.onDelete(row._id)}
              className="cursor-pointer"
              color="#c70000"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
