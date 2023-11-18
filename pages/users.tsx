import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Model from '../components/Model';
import Table from '../components/table/Table';
import TextInput from '../components/TextInput';
import { Post } from '../helpers/ApiConfig';

type Props = {};

const Users = ({ data }: any) => {
  const [member, setMember] = useState({
    name: '',
    phone_number: '',
    box_name: '',
    amperage: '0',
    old_counter: '0',
    new_counter: 0,
    total: 0,
    lebanese: false,
  });
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const addMember = async () => {
    const response = await Post(`${process.env.baseURL}/`, member);
    setOpen(false);
  };

  const deleteMember = async (id: any) => {
    const response = await Post(`${process.env.baseURL}/delete`, id);

    console.log(response);
  };

  useEffect(() => {}, [data]);

  return (
    <>
      <div className="p-10 w-full flex flex-col">
        <div className="mb-5 flex items-center gap-5 self-end">
          <Button onClick={() => setOpen(true)} title="Add Member" />
          <Button onClick={() => router.push('/bills')} title="Start Bills" />
        </div>
        {/* @ts-ignore */}
        <Table onDelete={(e) => deleteMember(e)} data={data} />
      </div>

      <Model open={open}>
        <>
          <div className="font-bold underline uppercase text-lg">
            Add Member
          </div>

          <div className="w-full flex flex-wrap my-10">
            <div className="flex items-center gap-5 w-1/3 my-5">
              <div>Name</div>
              <TextInput
                placeholder="Enter Name"
                value={member.name}
                onChange={(e) => setMember({ ...member, name: e.target.value })}
              />
            </div>

            <div className="flex items-center gap-5 w-1/3 my-5">
              <div>Phone</div>
              <TextInput
                placeholder="Enter Phone"
                value={member.phone_number}
                onChange={(e) =>
                  setMember({ ...member, phone_number: e.target.value })
                }
              />
            </div>

            <div className="flex items-center gap-5 w-1/3 my-5">
              <div>Amperage</div>
              <select
                className="focus:outline-none"
                name="amperage"
                id="amperage"
                onChange={(e) =>
                  setMember({ ...member, amperage: e.target.value })
                }
              >
                <option selected disabled>
                  Select
                </option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>

            <div className="flex items-center gap-5 w-1/3 my-5">
              <div>Lebanese</div>
              <select
                className="focus:outline-none"
                name="lebanese"
                id="lebanese"
                onChange={(e) =>
                  setMember({
                    ...member,
                    lebanese: e.target.value == 'true' ? true : false,
                  })
                }
              >
                <option selected disabled>
                  Select
                </option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>

            <div className="flex items-center gap-5 w-1/3 my-5">
              <div>Old Counter</div>
              <TextInput
                placeholder="Enter old counter"
                value={member.old_counter}
                onChange={(e) =>
                  setMember({ ...member, old_counter: e.target.value })
                }
              />
            </div>

            <div className="flex items-center gap-5 w-1/3 my-5">
              <div>Box Name</div>
              <TextInput
                placeholder="Enter box name"
                value={member.box_name}
                onChange={(e) =>
                  setMember({ ...member, box_name: e.target.value })
                }
              />
            </div>
          </div>

          <Button title="Add User" onClick={addMember} />
        </>
      </Model>
    </>
  );
};

export default Users;

export async function getServerSideProps(context: any) {
  const res = await fetch(`${process.env.baseURL}`);
  const data = await res.json();

  return {
    props: { data }, // will be passed to the page component as props
  };
}
