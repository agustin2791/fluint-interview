import { FC } from "react";
import { DataType } from "../types";

type TableProps = {
    dataList: DataType[],
    toEdit: Function,
    toDelete: Function
}

const DisplayTable: FC<TableProps> = (props: TableProps) => {
    const { dataList, toEdit, toDelete } = props
    return (
        <table>
            <th>
                <td colSpan={3}>DATA</td>
                <td></td>
                <td></td>
            </th>
            {dataList.map(d => {
                return (
                    <tr>
                        <td colSpan={3}>{d.data}</td>
                        <td><button onClick={() => toEdit(d)}>Edit</button></td>
                        <td><button onClick={() => toDelete(d._id)}>Delete</button></td>
                    </tr>
                )
            })}
        </table>
    )
}

export default DisplayTable;