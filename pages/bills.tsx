import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { Post, Put } from '../helpers/ApiConfig';

const bills = ({ data }: any) => {
  const [index, setIndex] = useState(0);
  const [newCounter, setNewCounter] = useState('0');
  const [member, setMember] = useState({
    name: data[index]?.name,
    phone_number: data[index]?.phone_number,
    box_name: data[index]?.box_name,
    amperage: data[index]?.amperage,
    old_counter: '0',
    new_counter: '0',
    total: '0',
    lebanese: data[index]?.lebanese,
  });

  const updateMember = async (id: string) => {
    console.log('Updating member with ID:', id);
    console.log('Member data:', member);

    // Ensure that newCounter is updated before calling updateMember
    setMember((prevMember) => ({
      ...prevMember,
      old_counter: newCounter,
    }));

    const url = `${process.env.baseURL}/${id}`;

    try {
      const response = await Post(url, await member);
      console.log('Response:', response);
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

  useEffect(() => {}, [newCounter]);

  useEffect(() => {
    updateMember(data[index]._id);
  }, [index, data, member.old_counter]);

  return (
    <>
      <div className="p-10 w-full flex flex-col">
        <div className="flex items-center gap-2 mt-3">
          <div className="font-semibold">Name: </div>
          <div>{data[index].name}</div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <div className="font-semibold">Phone Number: </div>
          <div>{data[index].phone_number}</div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <div className="font-semibold">Amperage: </div>
          <div>{data[index].amperage}amp</div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <div className="font-semibold">Old Counter: </div>
          <div>{data[index].old_counter}</div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <div className="font-semibold">Please add the new Counter: </div>
          <TextInput
            value={newCounter}
            placeholder="new counter"
            onChange={(e) => setNewCounter(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 mt-3">
          <div className="font-semibold">Total will be: </div>
          <div>
            {newCounter != '0' &&
              parseInt(newCounter) - data[index].old_counter + 'USD'}
          </div>
        </div>

        <div className="mt-10 w-full flex gap-5 self-end">
          <Button
            wtsp
            title="Send Whatsapp"
            onClick={() => setIndex(index + 1)}
            number={data[index].phone_number}
            // @ts-ignore
            total={newCounter - data[index].old_counter}
          />
          {/* <Button
            title="Next Member"
            onClick={() => {
              updateMember(data[index]._id);
              setIndex((prevIndex) => prevIndex + 1);
            }}
          /> */}

          <Button
            title="Next Member"
            onClick={async () => {
              await setMember({ ...member, old_counter: await newCounter });
              setIndex(index + 1);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default bills;

export async function getServerSideProps(context: any) {
  const res = await fetch(`${process.env.baseURL}`);
  const data = await res.json();

  return {
    props: { data }, // will be passed to the page component as props
  };
}
