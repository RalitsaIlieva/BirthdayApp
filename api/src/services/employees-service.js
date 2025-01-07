import bcrypt from 'bcrypt';

const signInEmployee = (employeesData) => async (username, password) => {
    const employee = await employeesData.getBy('username', username);
    const employeePass = await employeesData.getUserPassword(username);

    if (!employee || !(await bcrypt.compare(password, employeePass.password))) {
        return null;
    } else {
        return employee;
    }
};

const getEmployees = (employeesData) => async (username) => {

    const result = await employeesData.getAllEmployees('username', username);
  
    if (!result[0]) {
      return null;
    }
    return result;
  };

  const getEmployeesWithActiveVotes = (employeesData) => async (username) => {

    const result = await employeesData.getEmployeesWithActiveVotes(username);
  
    if (!result[0]) {
      return null;
    }
    return result;
  };
  
  const getEmployeesByAuthorId = (employeesData) => async (username, authorId) => {

    const result = await employeesData.getEmployeesByAuthorId(username, authorId);
  
    if (!result[0]) {
      return null;
    }
    return result;
  };

export default {
    signInEmployee,
    getEmployees,
    getEmployeesWithActiveVotes,
    getEmployeesByAuthorId
};
