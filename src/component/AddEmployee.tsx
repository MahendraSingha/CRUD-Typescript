import { useState } from 'react';
import '../component/EmployeeForm.style.css'
import '../component/Employee.type'
import { IEmployee } from '../component/Employee.type';


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
        id: new Date().toJSON().toString(),
        firstName: info.firstName,
        lastName: info.lastName,
        email: info.email
    }
 
    // localStorage.setItem('info', JSON.stringify(data))
    // console.log(info, 'iiiinfo')
    // onSubmitData(data)
    addEmployee(data)
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
