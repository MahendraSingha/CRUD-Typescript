import "../component/EmployeeList.style.css";
import { IEmployee } from "./Employee.type";

type Props = {
  list: IEmployee[];
  deleteEmp: (data: IEmployee) => void
};

const EmployeeList = (props: Props) => {
  const { list, deleteEmp } = props;
  console.log(list, "list555");

  const onDltHandler = (data: IEmployee) =>{
    console.log(data, 'deleteITem')
    deleteEmp(data)

  }

  return (
    <div>
      <h3 className="list-header">Employee List </h3>
      {/* This is employee list page */}
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
        {list &&
          list.map((employee) => {
            return (
              <tr key={employee.id}>
                <td>{`${employee.firstName} ${employee.lastName}`}</td>
                <td>{employee.email}</td>
                <td>
                    <input type="button" value='View' />
                    <input type="button" value='Edit' />
                    <input type="button" value='Delete' onClick={() => onDltHandler(employee)} />
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default EmployeeList;
