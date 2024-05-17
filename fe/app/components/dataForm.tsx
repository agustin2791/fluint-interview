import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { DataType } from "../types";



type FormProps = {
    data: DataType,
    submitData: Function,
    updateData: Function,
    isNew: boolean
}

const defaultData: DataType = {
    data: ''
}
const btn_style = {
    minWidth: '40px',
    color: '#fff',
    bg: '#097969',
    borderRadius: '5px',
    padding: '5px'
}
const DataForm: FC<FormProps> = (props: FormProps) => {
    const {data, submitData, updateData, isNew} = props
    const [dataDetails, setDataDetails] = useState<DataType>(defaultData)
    useEffect(() => {
        if (!isNew)
            setDataDetails(data)
    }, [data])

    const handleInputUpdates = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target

        setDataDetails({...dataDetails, [name]: value})
    }

    const submitForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (isNew)
            await submitData(dataDetails)
        else
            await updateData(dataDetails)
        setDataDetails(defaultData)
    }
    return (<>
    <form onSubmit={e => submitForm(e)}>
        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
            Data
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
        <input
          type="text"
          name="data"
          id="data"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={e => handleInputUpdates(e)}
        />
        </div>
        <button type="submit" style={btn_style}>{isNew ? 'Create' : 'Update'}</button>
    </form></>)
}

export default DataForm;