import React, { useEffect, useState } from 'react';

type Props = {
  open: boolean;
  children: any;
};

const Model = (props: Props) => {
  return (
    <>
      {props.open && (
        <div className="w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.75)] backdrop-blur-sm fixed inset-0">
          <div className="w-2/3 bg-white rounded-md p-5 flex flex-col items-center justify-center">
            {props.children}
          </div>
        </div>
      )}
    </>
  );
};

export default Model;
