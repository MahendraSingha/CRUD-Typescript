import { useEffect, useState } from "react";
import "../component/Home.style.css";
import {IEmployee, PageEnum } from "./Employee.type";
import EmployeeList from "./EmployeeList";
import AddEmployee from "./AddEmployee";
import UpdateEmployee from "./UpdateEmployee";

const Home: React.FC = () => {
  // const [employeeList, setEmployeeList] = useState(dummyEmployeeList as IEmployee[])
  const [employeeList, setEmployeeList] = useState<IEmployee[]>([]);
  console.log(employeeList, 'employeeList')
  const [employeeDetail, setEmployeeDetail] = useState<any>()
  const [dataForUpdate, setDataForUpdate] = useState<IEmployee>()
  const [targetIndex, setTargetIndex] = useState<any>()
  console.log(targetIndex, 'ttttt')

  const [shownPage, setShownPage] = useState(PageEnum.list);
  

  const addEmployeeHandler = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) =>{
    console.log(event)
    console.log(PageEnum.add, 'addded')
    setShownPage(PageEnum.add)
  }

  const shownListPage = () =>{
    setShownPage(PageEnum.list)
    console.log(PageEnum.list, 'listt')
  }



  const addEmployee = (data: IEmployee) =>{
    setEmployeeList([...employeeList, data])
    localStorage.setItem('info', JSON.stringify([...employeeList, data]))
    setShownPage(PageEnum.list)
  }

  const updateEmployee = (data: any) =>{
    console.log(targetIndex, 'gjgjgjgj')
    const arr = [...employeeList]
    arr.splice(targetIndex, 1, data)
    setEmployeeList(arr)
    localStorage.setItem('info', JSON.stringify(arr))
    setShownPage(PageEnum.list)
  }

  const deleteEmp = (data: IEmployee) =>{
    const arr = employeeList.filter((employee) => employee.id !== data.id)
    setEmployeeList(arr)
    localStorage.setItem('info', JSON.stringify(arr))
  }

  const viewEmployee = (data: IEmployee) =>{
    console.log(data, 'homeView')
    const singleEmployee = employeeList.find((emp) =>emp.id === data.id)
    setEmployeeDetail(singleEmployee)
  }

  const updatedIndex = (index: number) =>{
    setTargetIndex(index)
  }

  useEffect(() => {
  const storedInfo = localStorage.getItem('info');
  console.log(storedInfo, 'storedInfo')
  if (storedInfo) {
    try {
      const parsedInfo: IEmployee[] = JSON.parse(storedInfo);
      if (Array.isArray(parsedInfo)) {
        setEmployeeList(parsedInfo);
      }
    } catch (error) {
      console.error('Error parsing local storage item', error)
    }
  }
}, []);

const shownUpdatePage = (data: IEmployee) =>{
    setShownPage(PageEnum.update)
    const singleEmployeeData = employeeList.find((emp) => emp.id === data.id)
    setDataForUpdate(singleEmployeeData)
  }

  return (
    <>
      <article className="article-header">
        <header>
          <h1>React(Typescript): Simple CRUD Application</h1>
        </header>
      </article>

      <section className="section-content">

        {/* FOR LISTING PAGE */}
        {shownPage === PageEnum.list && (
          <>
            <input className="add-employee-btn" type="button" value="Add Employee" onClick={addEmployeeHandler} />
            <EmployeeList list={employeeList} deleteEmp={deleteEmp} viewEmployee={viewEmployee} employeeDetail={employeeDetail} shownUpdatePage={shownUpdatePage} updatedIndex={updatedIndex} />
          </>
        )}

        {/* FOR ADD PAGE */}
        {shownPage === PageEnum.add && <AddEmployee  backBtnClicked={shownListPage} addEmployee={addEmployee}  />}

        {/* FOR UPDATE PAGE */}
        {shownPage === PageEnum.update && <UpdateEmployee dataForUpdate={dataForUpdate} backBtnClicked={shownListPage} addEmployee={addEmployee} targetIndex={targetIndex} updateEmployee ={updateEmployee}   />}

      </section>
    </>
  );
};

export default Home;
