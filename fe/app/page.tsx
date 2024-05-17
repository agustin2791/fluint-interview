"use client";

import { useEffect, useState } from "react"
import DataForm from "./components/dataForm";
import { DataType } from "./types";
import DisplayTable from "./components/displayTable";
export default () => {

  const revalidatedData = async () => {
    const result = await fetch(`http://127.0.0.1:3000/data`, {
        method: 'GET',
        mode: 'no-cors',
    });

    console.log(result.json());
    return result;
  }
  
  const [state, setState] = useState<Response>();
  const [loadData, setLoadData] = useState(true);
  const [allData, setAllData] = useState<DataType[]>([] as DataType[])
  const [isEditData, setIsEditData] = useState(false)
  const [dataToEdit, setDataToEdit] = useState<DataType | null>()


  useEffect(()=>{

    if (!loadData)
      return;

    setLoadData(false)

    revalidatedData()
    .then(res=>{
      setState(res)
      console.log(res)
    })
  })

  const getDataDetails = async (id: string) => {
    const result = await fetch(`http://127.0.0.1:3000/data/${id}`, {
        method: 'GET',
        mode: 'no-cors',
        body: id
    });

    console.log(result);
  }

  const createData = async (details: DataType) => {
    console.log('Create details ', details)
    const result = await fetch(`http://127.0.0.1:3000/data`, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(details)
    });

    console.log(result);
    await revalidatedData().then(res=>{
      setState(res)
      console.log(res)
    })
  }

  const updateSetup = (d: DataType) => {
    setDataToEdit(d)
    setIsEditData(true)
  }

  const updateData = async (details: DataType) => {
    const result = await fetch(`http://127.0.0.1:3000/data`, {
        method: 'PUT',
        mode: 'no-cors',
        body: JSON.stringify(details)
    });

    console.log(result);
    await revalidatedData().then(res=>{
      setState(res)
      console.log(res)
    })
  }

  const deleteData = async (details_id: string) => {
    const result = await fetch(`http://127.0.0.1:3000/data`, {
        method: 'DELETE',
        mode: 'no-cors',
        body: details_id
    });

    console.log(result);
    await revalidatedData().then(res=>{
      setState(res)
      console.log(res)
    })
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <DataForm data={{data: ''}} isNew={!isEditData} submitData={createData} updateData={updateData} />
        </p>
         {state && <p>{JSON.stringify(state)}</p>}
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <DisplayTable dataList={allData} toEdit={updateSetup} toDelete={deleteData} />
      </div>
    </main>
  )
}
