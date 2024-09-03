import { useState } from 'react';
import '../component/EmployeeForm.style.css'
import '../component/Employee.type'
import { IEmployee } from '../component/Employee.type';
import swal from 'sweetalert'
import { v4 as uuidv4 } from 'uuid';


type Props = {
  backBtnClicked: () => void;
  addEmployee: (data: IEmployee) => void
  dataForUpdate ?: IEmployee
  targetIndex: number
  updateEmployee: (data: IEmployee) => void
};

const UpdateEmployee = (props: Props) => {
  const { backBtnClicked, addEmployee, dataForUpdate, targetIndex, updateEmployee} = props;
  console.log(dataForUpdate, 'dataForUpdate')

  const [info, setInfo] = useState<any>(dataForUpdate)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setInfo({...info, [event.target.name] : event.target.value})
  }

  const onUpdateData = (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    console.log(info, 'infoUpdate')

    const data: IEmployee = {
        id: uuidv4(),
        firstName: info.firstName,
        lastName: info.lastName,
        email: info.email
    }

    console.log(data, 'updatedData')
    updateEmployee(data)
    swal("Done!", "Employee details updated successfully", "success");
  }

  
  return (
    <div className='form-container'>
      <div>
        <h3>Add Employee Form</h3>
      </div>
      <form onSubmit={onUpdateData}>
        <div>
          <label>First Name : </label>
          <input type="text" name='firstName' value={info.firstName} onChange={handleChange} />
        </div>
        <div>
          <label>Last Name : </label>
          <input type="text" name='lastName' value={info.lastName} onChange={handleChange}/>
        </div>
        <div>
          <label>Email Address : </label>
          <input type="text" name='email' value={info.email} onChange={handleChange} />
        </div>
        <div>
          <input type="button" value="Back" onClick={backBtnClicked} />
          <input type="submit" value="Update Employee"  />
        </div>
      </form>
    </div>
  );
};

export default UpdateEmployee;
