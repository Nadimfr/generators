import clsx from 'clsx';
import React from 'react';

type Props = {
  title: string;
  onClick?: () => void;
  wtsp?: boolean;
  number?: string;
  total?: string;
};

const Button = (props: Props) => {
  return (
    <>
      {!props.wtsp ? (
        <button
          onClick={props.onClick}
          className={clsx(' border-2 rounded-md p-4 font-bold duration-300', {
            'bg-[#075e54] text-white border-[#075e54] hover:bg-[#128c7e] hover:border-[#128c7e]':
              props.wtsp,
            'bg-white border-black text-black hover:text-white hover:bg-black':
              !props.wtsp,
          })}
        >
          {props.title}
        </button>
      ) : (
        <a
          target="_blank"
          href={`https://api.whatsapp.com/send?phone=${props.number}&text=${props.total}USD`}
          className={clsx(' border-2 rounded-md p-4 font-bold duration-300', {
            'bg-[#075e54] text-white border-[#075e54] hover:bg-[#128c7e] hover:border-[#128c7e]':
              props.wtsp,
            'bg-white border-black text-black hover:text-white hover:bg-black':
              !props.wtsp,
          })}
        >
          {props.title}
        </a>
      )}
    </>
  );
};

export default Button;
