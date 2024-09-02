import { useEffect, useState } from "react";
import "../component/Home.style.css";
import { dummyEmployeeList, IEmployee, PageEnum } from "./Employee.type";
import EmployeeList from "./EmployeeList";
import AddEmployee from "./AddEmployee";

const Home: React.FC = () => {
  // const [employeeList, setEmployeeList] = useState(dummyEmployeeList as IEmployee[])
  const [employeeList, setEmployeeList] = useState<IEmployee[]>([]);
  console.log(employeeList, 'employeeList')

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

  const deleteEmp = (data: IEmployee) =>{
    const arr = employeeList.filter((employee) => employee.id !== data.id)
    setEmployeeList(arr)
    localStorage.setItem('info', JSON.stringify(arr))
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

  return (
    <>
      <article className="article-header">
        <header>
          <h1>React: Simple CRUD Application</h1>
        </header>
      </article>

      <section className="section-content">

        {/* FOR LISTING PAGE */}
        {shownPage === PageEnum.list && (
          <>
            <input className="add-employee-btn" type="button" value="Add Employee" onClick={addEmployeeHandler} />
            <EmployeeList list={employeeList} deleteEmp={deleteEmp} />
          </>
        )}

        {/* FOR ADD PAGE */}
        {shownPage === PageEnum.add && <AddEmployee  backBtnClicked={shownListPage} addEmployee={addEmployee} />}
      </section>
    </>
  );
};

export default Home;
