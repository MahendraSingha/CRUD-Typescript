import { useState } from 'react';
import '../component/EmployeeForm.style.css'
import '../component/Employee.type'
import { IEmployee } from '../component/Employee.type';
import swal from "sweetalert";
import { v4 as uuidv4 } from 'uuid';


type Props = {
  backBtnClicked: () => void;
  addEmployee: (data: IEmployee) => void
};

const AddEmployee = (props: Props) => {
  const { backBtnClicked, addEmployee} = props;

  const [info, setInfo] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setInfo({...info, [event.target.name] : event.target.value})
  }

  const onSubmitData = (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    const data: IEmployee = {
        id: uuidv4(),
        firstName: info.firstName,
        lastName: info.lastName,
        email: info.email
    }
    console.log(data, 'dataIdCheck')
    addEmployee(data)
    swal("Done!", "Employee added successfully", "success");
  }

  return (
    <div className='form-container'>
      <div>
        <h3>Add Employee Form</h3>
      </div>
      <form onSubmit={onSubmitData}>
        <div>
          <label>First Name : </label>
          <input type="text" name='firstName' onChange={handleChange} />
        </div>
        <div>
          <label>Last Name : </label>
          <input type="text" name='lastName' onChange={handleChange}/>
        </div>
        <div>
          <label>Email Address : </label>
          <input type="text" name='email' onChange={handleChange} />
        </div>
        <div>
          <input type="button" value="Back" onClick={backBtnClicked} />
          <input type="submit" value="Add Employee"  />
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
