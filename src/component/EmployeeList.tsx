import { Modal, ModalBody, ModalHeader } from "reactstrap";
import "../component/EmployeeList.style.css";
import { IEmployee } from "./Employee.type";
import { useState } from "react";
import swal from "sweetalert";


type Props = {
  list: IEmployee[];
  deleteEmp: (data: IEmployee) => void;
  viewEmployee: (data: IEmployee) => void;
  employeeDetail: IEmployee;
  shownUpdatePage: (data: IEmployee) => void;
  updatedIndex: (index: number) => void;
};



const EmployeeList = (props: Props) => {
  const {
    list,
    deleteEmp,
    viewEmployee,
    employeeDetail,
    shownUpdatePage,
    updatedIndex,
  } = props;
  console.log(list, "list555");

  const [modal, setModal] = useState<boolean>(false);

  const toggle = () => setModal(!modal);
  console.log(modal, "modal7878");

  const onDltHandler = (data: IEmployee) => {
    console.log(data, "deleteITem");
  
    swal({
      title: "Are you sure to delete?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteEmp(data);
        swal("Your file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your file is safe!");
      }
    });
  };

  const onViewHnd = (data: IEmployee) => {
    console.log(data, "hghgi");
    viewEmployee(data);
    toggle();
  };

  const onUpdateHnd = (data: IEmployee, index: number) => {
    console.log(index, "iiii");
    shownUpdatePage(data);
    updatedIndex(index);
  };

  return (
    <div>
      <h3 className="list-header">Employee List </h3>
      <>
        <Modal
          isOpen={modal}
          toggle={toggle}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "300px",
          }}
        >
          <ModalHeader toggle={toggle}>Employee Details</ModalHeader>
          <ModalBody>
            <ul>
              <li>
                <h2>
                  Name:{" "}
                  {`${employeeDetail?.firstName} ${employeeDetail?.lastName}`}
                </h2>
              </li>
              <li>
                <h2>Email: {employeeDetail?.email}</h2>
              </li>
            </ul>
          </ModalBody>
        </Modal>
      </>

      {/* This is employee list page */}
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
        {list &&
          list.map((employee, index) => {
            return (
              <tr key={employee.id}>
                <td>{`${employee.firstName} ${employee.lastName}`}</td>
                <td>{employee.email}</td>
                <td>
                  <input
                    type="button"
                    value="View"
                    onClick={() => onViewHnd(employee)}
                  />
                  <input
                    type="button"
                    value="Edit"
                    onClick={() => onUpdateHnd(employee, index)}
                  />
                  <input
                    type="button"
                    value="Delete"
                    onClick={() => onDltHandler(employee)}
                  />
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default EmployeeList;
