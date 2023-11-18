import React from 'react';

type Props = {
  value?: string;
  placeholder: string;
  onChange?: (e: any) => void;
};

const TextInput = (props: Props) => {
  return (
    <input
      className="focus:outline-none border-b-black border-b-2"
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

export default TextInput;
