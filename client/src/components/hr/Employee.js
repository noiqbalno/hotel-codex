import {BiPlus} from "react-icons/bi";
import {useEffect, useState} from "react";
import {PiDotsThreeOutlineVerticalDuotone} from "react-icons/pi";
import {FiEdit, FiTrash} from "react-icons/fi";
import {TiTimes} from "react-icons/ti";
import {useDispatch, useSelector} from "react-redux";
import {
    DeleteDepartment,
    DeleteEmployee, GetDepartment,
    GetEmployee,
    GetJobRole, GetShift,
    PostDepartment, PostEmployee,
    UpdateDepartment, UpdateEmployee
} from "../../actions/hrAction";
import Swal from "sweetalert2";
import {MdHistory} from "react-icons/md";
import {useForm} from "react-hook-form";
import {getValue} from "@testing-library/user-event/dist/utils";

export const Employee = () => {
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: {errors}
    } = useForm({
        defaultValues: {
            emp_national_id: ''
        }
    })
    const {
        register: register2,
        handleSubmit: handleSubmit2,
        reset: reset2,
        setValue: setValue2,
        getValues: getValues2,
        formState: {errors: errors2}
    } = useForm()
    const [activeKeyword, setActiveKeyword] = useState('')
    const [formKeyword, setFormKeyword] = useState('')
    const [image, setImage] = useState("https://via.placeholder.com/100")
    const [imageEdit, setImageEdit] = useState("https://via.placeholder.com/100")
    const [imageSave, setImageSave] = useState(null)
    const [imageSaveEdit, setImageSaveEdit] = useState(null)
    const [isAddEmp, setIsAddEmp] = useState(false)
    const [isDelEmp, setIsDelEmp] = useState(false)
    const [isPutEmp, setIsPutEmp] = useState(false)
    const dispatch = useDispatch()
    const {
        getEmployeeResult,
        getJobRoleResult,
        getDepartmentResult,
        getShiftResult,
        postEmployeeResult,
        deleteEmployeeResult,
        updateEmployeeResult,
        getEmployeeLoading,
        getEmployeeError
    } = useSelector((state) => state.HrReducer)
    const postEmp = (data) => {
        const formData = new FormData()
        formData.append('emp_national_id', data.emp_national_id)
        formData.append('emp_fullname', data.emp_fullname)
        formData.append('emp_birth_date', data.emp_birth_date)
        formData.append('emp_hire_date', data.emp_hire_date)
        formData.append('emp_marital_status', data.emp_marital_status)
        formData.append('emp_gender', data.emp_gender)
        formData.append('emp_salaried_flag', data.emp_salaried_flag)
        formData.append('emp_vacation_hours', data.emp_vacation_hours)
        formData.append('emp_sickleave_hours', data.emp_sickleave_hours)
        formData.append('emp_current_flag', data.emp_current_flag)
        formData.append('emp_joro_id', data.emp_joro_id)
        formData.append('ephi_pay_frequence', data.ephi_pay_frequence)
        formData.append('ephi_rate_salary', data.ephi_rate_salary)
        formData.append('edhi_dept_id', data.edhi_dept_id)
        formData.append('edhi_start_date', data.edhi_start_date)
        formData.append('edhi_end_date', data.edhi_end_date)
        formData.append('edhi_shift_id', data.edhi_shift_id)
        formData.append('emp_photo', imageSave)
        dispatch(PostEmployee(formData))
        setIsAddEmp(true)
    }
    const updateEmp = (data) => {
        const formData2 = new FormData()
        formData2.append('emp_national_id', data.emp_national_id)
        formData2.append('emp_fullname', data.emp_fullname)
        formData2.append('emp_birth_date', data.emp_birth_date)
        formData2.append('emp_hire_date', data.emp_hire_date)
        formData2.append('emp_marital_status', data.emp_marital_status)
        formData2.append('emp_gender', data.emp_gender)
        formData2.append('emp_salaried_flag', data.emp_salaried_flag)
        formData2.append('emp_vacation_hours', data.emp_vacation_hours)
        formData2.append('emp_sickleave_hours', data.emp_sickleave_hours)
        formData2.append('emp_current_flag', data.emp_current_flag)
        formData2.append('emp_joro_id', data.emp_joro_id)
        formData2.append('ephi_pay_frequence', data.ephi_pay_frequence)
        formData2.append('ephi_rate_salary', data.ephi_rate_salary)
        formData2.append('edhi_dept_id', data.edhi_dept_id)
        formData2.append('edhi_start_date', data.edhi_start_date)
        formData2.append('edhi_end_date', data.edhi_end_date)
        formData2.append('edhi_shift_id', data.edhi_shift_id)
        formData2.append('oldImage', data.emp_photo)
        formData2.append('emp_photo', imageSaveEdit)
        setIsPutEmp(true)
        dispatch(UpdateEmployee(data.emp_id, formData2))
    }
    const deleteEmp = (id, event, name, oldImage) => {
        Swal.fire({
            title: `Delete Employee ${name}?`,
            showCancelButton: true,
            confirmButtonText: 'Sure',
            confirmButtonColor: '#EBAB2D'
        }).then((res) => {
            if (res.isConfirmed) {
                event.preventDefault()
                setIsDelEmp(true)
                dispatch(DeleteEmployee(id, oldImage))
            }
        })
    }
    const resetHandler = () => {
        reset()
        setImageSave(null)
        setImage("https://via.placeholder.com/100")
    }

    useEffect(() => {
        if (isDelEmp) {
            let timerInterval
            Swal.fire({
                title: 'Delete Employee success',
                html: 'Auto Close',
                timer: 1100,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval)
                }
            })
        } else if (isAddEmp) {
            let timerInterval
            Swal.fire({
                title: 'Add Employee success',
                html: 'Auto Close',
                timer: 1100,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then(result => {
                if (result.isDismissed) {
                    reset()
                    setImageSave(null)
                    setImage("https://via.placeholder.com/100")
                }
            })
        } else if (isPutEmp) {
            let timerInterval
            Swal.fire({
                title: 'Update Employee success',
                html: 'Auto Close',
                timer: 1100,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then(result => {
                if (result.isDismissed) {
                    reset2({dummy: ''})
                    setImageSaveEdit(null)
                }
            })
        }
        dispatch(GetEmployee({
            emp_fullname: formKeyword,
            emp_current_flag: activeKeyword,
        }))
        dispatch(GetJobRole())
        dispatch(GetShift())
        dispatch(GetDepartment({dept_name: ''}))
        setIsDelEmp(false)
        setIsAddEmp(false)
        setIsPutEmp(false)
    }, [deleteEmployeeResult, postEmployeeResult, updateEmployeeResult, formKeyword, activeKeyword]);
    return (
        <div>
            <h1>Employee</h1>
            <nav className='bread-separator' aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">Employee</li>
                </ol>
            </nav>
            <div className='row mb-4 justify-content-between'>
                <div className='col-sm-2 align-content-center mt-2'>
                    <button type="button" className="btn custom-btn-yellow" data-bs-toggle="modal"
                            data-bs-target="#addModal">
                        <BiPlus size='26'/> Add Employee
                    </button>
                </div>
                <div className='col-sm-8'>
                    <div className='row'>
                        <div className='col'>
                            <div className="form-floating">
                                <input type="text"
                                       onChange={(e) => setFormKeyword(e.target.value)}
                                       value={formKeyword}
                                       className="form-control text-dark form-control-sm" id="searchDept"
                                       placeholder="name@example.com" required/>
                                <label htmlFor="searchDept">Search Employee Name</label>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="form-floating">
                                <select className="form-select"
                                        onChange={(e) => {
                                            setActiveKeyword(e.target.value)
                                            console.log("Status", e.target.value)
                                        }}
                                        aria-label="Floating label select example">
                                    <option value="">Default</option>
                                    <option value="1">Active</option>
                                    <option value="0">InActive</option>
                                </select>
                                <label htmlFor="addEmp">Status Employee</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <table className="table table-striped table-hover align-middle">
                <caption>Jumlah data : {getEmployeeResult ? getEmployeeResult.length : 0}</caption>
                <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">National ID</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">Birth Date</th>
                    <th scope="col">Hire Date</th>
                    <th scope="col">Status</th>
                    <th scope="col" className='text-end'>

                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    getEmployeeResult ? (
                        getEmployeeResult.length !== 0 ? (
                            getEmployeeResult.map((value, index) => {
                                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                                let birthDate = new Date(value.emp_birth_date)
                                let hireDate = new Date(value.emp_hire_date)
                                return (
                                    <tr key={index}>
                                        <th scope="row">{value.emp_id}</th>
                                        <td>{value.emp_national_id}</td>
                                        <td>{value.emp_fullname}</td>
                                        <td>{(birthDate.getDate().toString().split('').length === 1 ? '0' + birthDate.getDate() : birthDate.getDate()) + " " + months[birthDate.getMonth()] + " " + birthDate.getFullYear()}</td>
                                        <td>{(hireDate.getDate().toString().split('').length === 1 ? '0' + hireDate.getDate() : hireDate.getDate()) + " " + months[hireDate.getMonth()] + " " + hireDate.getFullYear()}</td>
                                        <td>{value.emp_current_flag ? (
                                            <span className="badge bg-success">Active</span>) : (
                                            <span className="badge bg-danger">Inactive</span>)}</td>
                                        <td className='text-end pe-4'>
                                            <div className="dropstart">
                                                <button className='btn btn-light' data-bs-toggle="dropdown"
                                                        aria-expanded="false">
                                                    <PiDotsThreeOutlineVerticalDuotone size='24'/>
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <a className="dropdown-item custom-hover-yellow" href='#'
                                                           onClick={() => {
                                                               setImageEdit(value.emp_photo)
                                                               setValue2("emp_id", value.emp_id)
                                                               setValue2("emp_photo", value.emp_photo)
                                                               setValue2("emp_national_id", value.emp_national_id)
                                                               setValue2("emp_fullname", value.emp_fullname)
                                                               setValue2("emp_birth_date", value.emp_birth_date)
                                                               setValue2("emp_hire_date", value.emp_hire_date)
                                                               setValue2("emp_marital_status", value.emp_marital_status)
                                                               setValue2("emp_gender", value.emp_gender)
                                                               setValue2("emp_salaried_flag", value.emp_salaried_flag)
                                                               setValue2("emp_vacation_hours", value.emp_vacation_hours)
                                                               setValue2("emp_sickleave_hours", value.emp_sickleave_hours)
                                                               setValue2("emp_current_flag", value.emp_current_flag)
                                                               setValue2("emp_joro_id", value.emp_joro_id)
                                                               setValue2("ephi_rate_salary", value.employee_pay_histories[0].ephi_rate_salary)
                                                               setValue2("ephi_pay_frequence", value.employee_pay_histories[0].ephi_pay_frequence)
                                                               setValue2("edhi_dept_id", value.employee_department_histories[0].edhi_dept_id)
                                                               setValue2("edhi_start_date", value.employee_department_histories[0].edhi_start_date)
                                                               setValue2("edhi_end_date", value.employee_department_histories[0].edhi_end_date)
                                                               setValue2("edhi_shift_id", value.employee_department_histories[0].edhi_shift_id)
                                                               console.log(value)
                                                           }}
                                                           data-bs-toggle="modal"
                                                           data-bs-target="#editModal"><FiEdit
                                                            size='16'/> Edit</a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item custom-hover-yellow text-danger"
                                                           onClick={(e) => deleteEmp(value.emp_id, e, value.emp_fullname, value.emp_photo)}
                                                           href='#'><FiTrash size='16'/> Delete</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td colSpan='7' className='text-center'>Tidak ada data</td>
                            </tr>
                        )
                    ) : getEmployeeLoading ? (
                        <tr>
                            <td colSpan='3'>Loading...</td>
                        </tr>
                    ) : (
                        <tr>
                            <td colSpan='3'>{getEmployeeError}</td>
                        </tr>
                    )
                }

                </tbody>
            </table>
            <div className="modal fade modal-xl" id="addModal" data-bs-keyboard="false" data-bs-backdrop="static"
                 tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Employee</h5>
                            <TiTimes data-bs-dismiss="modal" aria-label="Close" color='#EBAB2D' size={26}
                                     onClick={() => resetHandler()}/>
                        </div>
                        <form key={1} onSubmit={handleSubmit(postEmp)}>
                            <div className="modal-body">
                                <h6>General</h6>
                                <hr/>
                                <div className='row'>
                                    <div className='col-sm-9'>
                                        <div className='row mb-4'>
                                            <div className='col'>
                                                <div className="form-floating">
                                                    <input
                                                        type="text" {...register('emp_national_id', {
                                                        required: "National ID (Wajib diisi)",
                                                        pattern:
                                                            {
                                                                value: /^[0-9]+$/,
                                                                message: "National ID (Hanya Angka)"
                                                            },
                                                        minLength:
                                                            {
                                                                value: 16,
                                                                message: "National ID (Minimal 16 Digit)"
                                                            },
                                                        maxLength:
                                                            {
                                                                value: 16,
                                                                message: "National ID (Maksimal 16 Digit)"
                                                            },
                                                    })}
                                                        className={`form-control text-dark ${errors.emp_national_id ? "is-invalid" : ''}`}
                                                        placeholder=''
                                                        id="emp_national_id"
                                                        aria-invalid={errors.emp_national_id ? "true" : "false"}/>
                                                    <label
                                                        htmlFor="emp_national_id">{errors.emp_national_id ? errors.emp_national_id.message !== '' ? errors.emp_national_id.message : "National ID" : "National ID"}</label>
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className="form-floating">
                                                    <input type="text" {...register('emp_fullname', {
                                                        required: "Fullname (Wajib diisi)",
                                                        pattern:
                                                            {
                                                                value: /^[a-zA-Z\s]+$/,
                                                                message: "Fullname (Hanya Huruf)"
                                                            },
                                                        minLength:
                                                            {
                                                                value: 3,
                                                                message: "Fullname (Minimal 3 Digit)"
                                                            },
                                                        maxLength:
                                                            {
                                                                value: 50,
                                                                message: "Fullname (Maksimal 50 Digit)"
                                                            },
                                                    })}
                                                           className={`form-control text-dark ${errors.emp_fullname ? "is-invalid" : ""}`}
                                                           placeholder=''
                                                           id="emp_fullname"
                                                           aria-invalid={errors.emp_fullname ? "true" : "false"}/>
                                                    <label
                                                        htmlFor="emp_fullname">{errors.emp_fullname ? errors.emp_fullname.message !== '' ? errors.emp_fullname.message : "Fullname" : "Fullname"}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row mb-4'>
                                            <div className='col'>
                                                <div className="form-floating">
                                                    <input type="date" {...register('emp_birth_date', {
                                                        required: "Birth Date (Wajib diisi)",
                                                    })}
                                                           className={`form-control text-dark ${errors.emp_birth_date ? "is-invalid" : ""}`}
                                                           placeholder=''
                                                           id="emp_birth_date"
                                                           aria-invalid={errors.emp_birth_date ? "true" : "false"}/>
                                                    <label
                                                        htmlFor="emp_birth_date">{errors.emp_birth_date ? errors.emp_birth_date.message !== '' ? errors.emp_birth_date.message : "Birth Date" : "Birth Date"}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className="form-floating">
                                                    <input type="date" {...register('emp_hire_date', {
                                                        required: "Hire Date (Wajib diisi)",
                                                    })}
                                                           className={`form-control text-dark ${errors.emp_hire_date ? "is-invalid" : ""}`}
                                                           placeholder=''
                                                           id="emp_hire_date"
                                                           aria-invalid={errors.emp_hire_date ? "true" : "false"}/>
                                                    <label
                                                        htmlFor="emp_hire_date">{errors.emp_hire_date ? errors.emp_hire_date.message !== '' ? errors.emp_hire_date.message : "Hire Date" : "Hire Date"}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row mb-4'>
                                            <div className='col'>
                                                <div className="form-floating">
                                                    <select className="form-select"
                                                            id="addEmp" {...register('emp_marital_status', {required: true})}
                                                            aria-label="Floating label select example">
                                                        <option value="S">Single</option>
                                                        <option value="M">Married</option>
                                                    </select>
                                                    <label htmlFor="addEmp">Marital Status</label>
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className="form-floating">
                                                    <select className="form-select"
                                                            id="addEmp" {...register('emp_gender', {required: true})}
                                                            aria-label="Floating label select example">
                                                        <option value="M">Male</option>
                                                        <option value="F">Female</option>
                                                    </select>
                                                    <label htmlFor="addEmp">Gender</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row mb-4'>
                                            <div className='col'>
                                                <div className="form-floating">
                                                    <select className="form-select"
                                                            id="addEmp" {...register('emp_salaried_flag', {required: true})}
                                                            aria-label="Floating label select example">
                                                        <option value="0">Hourly</option>
                                                        <option value="1">Monthly</option>
                                                    </select>
                                                    <label htmlFor="addEmp">Salaried Flag</label>
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className="form-floating">
                                                    <select className="form-select"
                                                            id="addEmp" {...register('emp_current_flag', {required: true})}
                                                            aria-label="Floating label select example">
                                                        <option value="1">Active</option>
                                                        <option value="0">InActive</option>
                                                    </select>
                                                    <label htmlFor="addEmp">Current Flag</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row mb-4'>
                                            <div className='col'>
                                                <div className="form-floating">
                                                    <input
                                                        type="text" {...register('emp_vacation_hours', {
                                                        required: "Vacation Hours (Wajib diisi)",
                                                        pattern:
                                                            {
                                                                value: /^[0-9]+$/,
                                                                message: "Vacation Hours (Hanya Angka)"
                                                            },
                                                    })}
                                                        className={`form-control text-dark ${errors.emp_vacation_hours ? "is-invalid" : ''}`}
                                                        placeholder=''
                                                        id="emp_vacation_hours"
                                                        aria-invalid={errors.emp_vacation_hours ? "true" : "false"}/>
                                                    <label
                                                        htmlFor="emp_vacation_hours">{errors.emp_vacation_hours ? errors.emp_vacation_hours.message !== '' ? errors.emp_vacation_hours.message : "Vacation Hours" : "Vacation Hours"}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className="form-floating">
                                                    <input
                                                        type="text" {...register('emp_sickleave_hours', {
                                                        required: "Sick Leave Hours (Wajib diisi)",
                                                        pattern:
                                                            {
                                                                value: /^[0-9]+$/,
                                                                message: "Sick Leave Hours (Hanya Angka)"
                                                            },
                                                    })}
                                                        className={`form-control text-dark ${errors.emp_sickleave_hours ? "is-invalid" : ''}`}
                                                        placeholder=''
                                                        id="emp_sickleave_hours"
                                                        aria-invalid={errors.emp_sickleave_hours ? "true" : "false"}/>
                                                    <label htmlFor="emp_sickleave_hours">
                                                        {errors.emp_sickleave_hours ? errors.emp_sickleave_hours.message !== '' ? errors.emp_sickleave_hours.message : "Sick Leave Hours" : "Sick Leave Hours"}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='col'>
                                                {
                                                    getJobRoleResult ? (
                                                        <div className="form-floating">
                                                            <select className="form-select"
                                                                    id="addEmp" {...register('emp_joro_id', {required: true})}
                                                                    aria-label="Floating label select example">
                                                                {getJobRoleResult.map((value) => {
                                                                    return (
                                                                        <option
                                                                            value={value.joro_id}>{value.joro_name}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                            <label htmlFor="addEmp">Job Role</label>
                                                        </div>

                                                    ) : (
                                                        <div>
                                                            Job Role tidak ada
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-sm-3'>
                                        <div>
                                            <img className='object-fit-contain' style={{width: "100%", height: "330px"}}
                                                 src={image} alt=''/>
                                        </div>
                                        <div className='mt-3'>
                                            <input type="file" className="form-control text-dark" id="addEmp"
                                                   onChange={(e) => {
                                                       setImageSave(e.target.files[0])
                                                       setImage(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : "https://via.placeholder.com/100")
                                                   }}
                                                   placeholder="name@example.com"/>
                                        </div>
                                    </div>
                                </div>
                                <h6>Salary</h6>
                                <hr/>
                                <div className='row mb-4'>
                                    <div className='col'>
                                        <div className="form-floating">
                                            <input
                                                type="text" {...register('ephi_rate_salary', {
                                                required: "Rate Salary (Wajib diisi)",
                                                pattern:
                                                    {
                                                        value: /^[0-9]+$/,
                                                        message: "Rate Salary (Hanya Angka)"
                                                    },
                                                minLength:
                                                    {
                                                        value: 6,
                                                        message: "Rate Salary (Minimal 16 Digit)"
                                                    },
                                                maxLength:
                                                    {
                                                        value: 12,
                                                        message: "Rate Salary (Maksimal 12 Digit)"
                                                    },
                                            })}
                                                className={`form-control text-dark ${errors.ephi_rate_salary ? "is-invalid" : ''}`}
                                                placeholder=''
                                                id="ephi_rate_salary"
                                                aria-invalid={errors.ephi_rate_salary ? "true" : "false"}/>
                                            <label htmlFor="ephi_rate_salary">
                                                {errors.ephi_rate_salary ? errors.ephi_rate_salary.message !== '' ? errors.ephi_rate_salary.message : "Rate Salary" : "Rate Salary"}
                                            </label>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="form-floating">
                                            <select className="form-select"
                                                    id="addEmp" {...register('ephi_pay_frequence', {required: true})}
                                                    aria-label="Floating label select example">
                                                <option value="0">Hourly</option>
                                                <option value="1">Monthly</option>
                                            </select>
                                            <label htmlFor="addEmp">Frequency</label>
                                        </div>
                                    </div>
                                </div>
                                <h6>Assignment</h6>
                                <hr/>
                                <div className='row mb-4'>
                                    <div className='col'>
                                        {
                                            getDepartmentResult ? (
                                                <div className="form-floating">
                                                    <select className="form-select"
                                                            id="addEmp" {...register('edhi_dept_id', {required: true})}
                                                            aria-label="Floating label select example">
                                                        {getDepartmentResult.data.map((value) => {
                                                            return (
                                                                <option
                                                                    value={value.dept_id}>{value.dept_name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                    <label htmlFor="addEmp">Department</label>
                                                </div>
                                            ) : (
                                                <div>
                                                    Department tidak ada
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className='col'>
                                        <div className="form-floating">
                                            <input type="date" {...register('edhi_start_date', {
                                                required: "Start Date (Wajib diisi)",
                                            })}
                                                   className={`form-control text-dark ${errors.edhi_start_date ? "is-invalid" : ""}`}
                                                   placeholder=''
                                                   id="edhi_start_date"
                                                   aria-invalid={errors.edhi_start_date ? "true" : "false"}/>
                                            <label htmlFor="edhi_start_date">
                                                {errors.edhi_start_date ? errors.edhi_start_date.message !== '' ? errors.edhi_start_date.message : "Start Date" : "Start Date"}
                                            </label>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="form-floating">
                                            <input type="date" {...register('edhi_end_date', {
                                                required: "End Date (Wajib diisi)",
                                            })}
                                                   className={`form-control text-dark ${errors.edhi_end_date ? "is-invalid" : ""}`}
                                                   placeholder=''
                                                   id="edhi_end_date"
                                                   aria-invalid={errors.edhi_end_date ? "true" : "false"}/>
                                            <label htmlFor="edhi_end_date">
                                                {errors.edhi_end_date ? errors.edhi_end_date.message !== '' ? errors.edhi_end_date.message : "End Date" : "End Date"}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <h6>Shift</h6>
                                <hr/>
                                {
                                    getShiftResult ? (
                                        <div className="form-floating">
                                            <select className="form-select" defaultValue='1'
                                                    id="addEmp" {...register('edhi_shift_id', {required: true})}
                                                    aria-label="Floating label select example">
                                                {getShiftResult.map((value) => {
                                                    return (
                                                        <option value={value.shift_id}>{value.shift_name}</option>
                                                    )
                                                })}
                                            </select>
                                            <label htmlFor="addEmp">Shift</label>
                                        </div>
                                    ) : (
                                        <div>
                                            Shift tidak ada
                                        </div>
                                    )
                                }
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" data-bs-dismiss="modal"
                                        onClick={() => reset()}>Close
                                </button>
                                <button type="submit" className="btn custom-btn-yellow">Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="modal fade modal-xl" id="editModal" data-bs-keyboard="false" data-bs-backdrop="static"
                 tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Employee</h5>
                            <TiTimes data-bs-dismiss="modal" aria-label="Close" color='#EBAB2D' size={26}
                                     onClick={() => resetHandler()}/>
                        </div>
                        <form key={2} onSubmit={handleSubmit2(updateEmp)}>
                            <div className="modal-body">
                                <h6 className="text-start">General</h6>
                                <hr/>
                                <div className='row'>
                                    <div className='col-sm-9'>
                                        <div className='row mb-4'>
                                            <div className='col'>
                                                <input type='text' {...register2('emp_id', {required: true})} hidden/>
                                                <input type='text' {...register2('emp_photo', {required: true})}
                                                       hidden/>
                                                <div className="form-floating">
                                                    <input
                                                        type="text" value={getValues2('emp_national_id')}
                                                        className={`form-control text-dark ${errors.emp_national_id ? "is-invalid" : ''}`}
                                                        placeholder=''
                                                        id="emp_national_id"
                                                        aria-invalid={errors.emp_national_id ? "true" : "false"}
                                                        disabled/>
                                                    <label
                                                        htmlFor="emp_national_id">{errors.emp_national_id ? errors.emp_national_id.message !== '' ? errors.emp_national_id.message : "National ID" : "National ID"}</label>
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className="form-floating">
                                                    <input type="text" {...register2('emp_fullname', {
                                                        required: "Fullname (Wajib diisi)",
                                                        pattern:
                                                            {
                                                                value: /^[a-zA-Z\s]+$/,
                                                                message: "Fullname (Hanya Huruf)"
                                                            },
                                                        minLength:
                                                            {
                                                                value: 3,
                                                                message: "Fullname (Minimal 3 Digit)"
                                                            },
                                                        maxLength:
                                                            {
                                                                value: 50,
                                                                message: "Fullname (Maksimal 50 Digit)"
                                                            },
                                                    })}
                                                           className={`form-control text-dark ${errors2.emp_fullname ? "is-invalid" : ""}`}
                                                           placeholder=''
                                                           id="emp_fullname"
                                                           aria-invalid={errors2.emp_fullname ? "true" : "false"}/>
                                                    <label
                                                        htmlFor="emp_fullname">{errors2.emp_fullname ? errors2.emp_fullname.message !== '' ? errors2.emp_fullname.message : "Fullname" : "Fullname"}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row mb-4'>
                                            <div className='col'>
                                                <div className="form-floating">
                                                    <input type="date" {...register2('emp_birth_date', {
                                                        required: "Birth Date (Wajib diisi)",
                                                    })}
                                                           className={`form-control text-dark ${errors2.emp_birth_date ? "is-invalid" : ""}`}
                                                           placeholder=''
                                                           id="emp_birth_date"
                                                           aria-invalid={errors2.emp_birth_date ? "true" : "false"}/>
                                                    <label
                                                        htmlFor="emp_birth_date">{errors2.emp_birth_date ? errors2.emp_birth_date.message !== '' ? errors2.emp_birth_date.message : "Birth Date" : "Birth Date"}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className="form-floating">
                                                    <input type="date" {...register2('emp_hire_date', {
                                                        required: "Hire Date (Wajib diisi)",
                                                    })}
                                                           className={`form-control text-dark ${errors2.emp_hire_date ? "is-invalid" : ""}`}
                                                           placeholder=''
                                                           id="emp_hire_date"
                                                           aria-invalid={errors2.emp_hire_date ? "true" : "false"}/>
                                                    <label
                                                        htmlFor="emp_hire_date">{errors2.emp_hire_date ? errors2.emp_hire_date.message !== '' ? errors2.emp_hire_date.message : "Hire Date" : "Hire Date"}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row mb-4'>
                                            <div className='col'>
                                                <div className="form-floating">
                                                    <select className="form-select"
                                                            id="addEmp" {...register2('emp_marital_status', {required: true})}
                                                            aria-label="Floating label select example">
                                                        <option value="S">Single</option>
                                                        <option value="M">Married</option>
                                                    </select>
                                                    <label htmlFor="addEmp">Marital Status</label>
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className="form-floating">
                                                    <select className="form-select"
                                                            id="addEmp" {...register2('emp_gender', {required: true})}
                                                            aria-label="Floating label select example">
                                                        <option value="M">Male</option>
                                                        <option value="F">Female</option>
                                                    </select>
                                                    <label htmlFor="addEmp">Gender</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row mb-4'>
                                            <div className='col'>
                                                <div className="form-floating">
                                                    <select className="form-select"
                                                            id="addEmp" {...register2('emp_salaried_flag', {required: true})}
                                                            aria-label="Floating label select example">
                                                        <option value="0">Hourly</option>
                                                        <option value="1">Monthly</option>
                                                    </select>
                                                    <label htmlFor="addEmp">Salaried Flag</label>
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className="form-floating">
                                                    <select className="form-select"
                                                            id="addEmp" {...register2('emp_current_flag', {required: true})}
                                                            aria-label="Floating label select example">
                                                        <option value="1">Active</option>
                                                        <option value="0">InActive</option>
                                                    </select>
                                                    <label htmlFor="addEmp">Current Flag</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row mb-4'>
                                            <div className='col'>
                                                <div className="form-floating">
                                                    <input
                                                        type="text" {...register2('emp_vacation_hours', {
                                                        required: "Vacation Hours (Wajib diisi)",
                                                        pattern:
                                                            {
                                                                value: /^[0-9]+$/,
                                                                message: "Vacation Hours (Hanya Angka)"
                                                            },
                                                    })}
                                                        className={`form-control text-dark ${errors2.emp_vacation_hours ? "is-invalid" : ''}`}
                                                        placeholder=''
                                                        id="emp_vacation_hours"
                                                        aria-invalid={errors2.emp_vacation_hours ? "true" : "false"}/>
                                                    <label
                                                        htmlFor="emp_vacation_hours">{errors2.emp_vacation_hours ? errors2.emp_vacation_hours.message !== '' ? errors2.emp_vacation_hours.message : "Vacation Hours" : "Vacation Hours"}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className="form-floating">
                                                    <input
                                                        type="text" {...register2('emp_sickleave_hours', {
                                                        required: "Sick Leave Hours (Wajib diisi)",
                                                        pattern:
                                                            {
                                                                value: /^[0-9]+$/,
                                                                message: "Sick Leave Hours (Hanya Angka)"
                                                            },
                                                    })}
                                                        className={`form-control text-dark ${errors2.emp_sickleave_hours ? "is-invalid" : ''}`}
                                                        placeholder=''
                                                        id="emp_sickleave_hours"
                                                        aria-invalid={errors2.emp_sickleave_hours ? "true" : "false"}/>
                                                    <label htmlFor="emp_sickleave_hours">
                                                        {errors2.emp_sickleave_hours ? errors2.emp_sickleave_hours.message !== '' ? errors2.emp_sickleave_hours.message : "Sick Leave Hours" : "Sick Leave Hours"}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='col'>
                                                {
                                                    getJobRoleResult ? (
                                                        <div className="form-floating">
                                                            <select className="form-select"
                                                                    id="addEmp" {...register2('emp_joro_id', {required: true})}
                                                                    aria-label="Floating label select example">
                                                                {getJobRoleResult.map((value) => {
                                                                    return (
                                                                        <option
                                                                            value={value.joro_id}>{value.joro_name}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                            <label htmlFor="addEmp">Job Role</label>
                                                        </div>

                                                    ) : (
                                                        <div>
                                                            Job Role tidak ada
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-sm-3'>
                                        <div>
                                            <img className='object-fit-contain' style={{width: "100%", height: "330px"}}
                                                 src={imageEdit} alt=''/>
                                        </div>
                                        <div className='mt-3'>
                                            <input type="file" className="form-control text-dark"
                                                   id="addEmp" {...register2('dummy')}
                                                   onChange={(e) => {
                                                       setImageSaveEdit(e.target.files[0])
                                                       setImageEdit(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : "https://via.placeholder.com/100")
                                                   }}
                                                   placeholder="name@example.com"/>
                                        </div>
                                    </div>
                                </div>
                                <h6 className="text-start">Salary</h6>
                                <hr/>
                                <div className='row mb-4'>
                                    <div className='col'>
                                        <div className="form-floating">
                                            <input
                                                type="text" {...register2('ephi_rate_salary', {
                                                required: "Rate Salary (Wajib diisi)",
                                                pattern:
                                                    {
                                                        value: /^[0-9]+$/,
                                                        message: "Rate Salary (Hanya Angka)"
                                                    },
                                                minLength:
                                                    {
                                                        value: 6,
                                                        message: "Rate Salary (Minimal 16 Digit)"
                                                    },
                                                maxLength:
                                                    {
                                                        value: 12,
                                                        message: "Rate Salary (Maksimal 12 Digit)"
                                                    },
                                            })}
                                                className={`form-control text-dark ${errors2.ephi_rate_salary ? "is-invalid" : ''}`}
                                                placeholder=''
                                                id="ephi_rate_salary"
                                                aria-invalid={errors2.ephi_rate_salary ? "true" : "false"}/>
                                            <label htmlFor="ephi_rate_salary">
                                                {errors2.ephi_rate_salary ? errors2.ephi_rate_salary.message !== '' ? errors2.ephi_rate_salary.message : "Rate Salary" : "Rate Salary"}
                                            </label>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="form-floating">
                                            <select className="form-select"
                                                    id="addEmp" {...register2('ephi_pay_frequence', {required: true})}
                                                    aria-label="Floating label select example">
                                                <option value="0">Hourly</option>
                                                <option value="1">Monthly</option>
                                            </select>
                                            <label htmlFor="addEmp">Frequency</label>
                                        </div>
                                    </div>
                                </div>
                                <h6 className="text-start">Assignment</h6>
                                <hr/>
                                <div className='row mb-4'>
                                    <div className='col'>
                                        {
                                            getDepartmentResult ? (
                                                <div className="form-floating">
                                                    <select className="form-select"
                                                            id="addEmp" {...register2('edhi_dept_id', {required: true})}
                                                            aria-label="Floating label select example">
                                                        {getDepartmentResult.data.map((value) => {
                                                            return (
                                                                <option value={value.dept_id}>{value.dept_name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                    <label htmlFor="addEmp">Department</label>
                                                </div>

                                            ) : (
                                                <div>
                                                    Department tidak ada
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className='col'>
                                        <div className="form-floating">
                                            <input type="date" {...register2('edhi_start_date', {
                                                required: "Start Date (Wajib diisi)",
                                            })}
                                                   className={`form-control text-dark ${errors2.edhi_start_date ? "is-invalid" : ""}`}
                                                   placeholder=''
                                                   id="edhi_start_date"
                                                   aria-invalid={errors2.edhi_start_date ? "true" : "false"}/>
                                            <label htmlFor="edhi_start_date">
                                                {errors2.edhi_start_date ? errors2.edhi_start_date.message !== '' ? errors2.edhi_start_date.message : "Start Date" : "Start Date"}
                                            </label>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="form-floating">
                                            <input type="date" {...register2('edhi_end_date', {
                                                required: "End Date (Wajib diisi)",
                                            })}
                                                   className={`form-control text-dark ${errors2.edhi_end_date ? "is-invalid" : ""}`}
                                                   placeholder=''
                                                   id="edhi_end_date"
                                                   aria-invalid={errors2.edhi_end_date ? "true" : "false"}/>
                                            <label htmlFor="edhi_end_date">
                                                {errors2.edhi_end_date ? errors2.edhi_end_date.message !== '' ? errors2.edhi_end_date.message : "End Date" : "End Date"}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <h6 className="text-start">Shift</h6>
                                <hr/>
                                {
                                    getShiftResult ? (
                                        <div className="form-floating">
                                            <select className="form-select"
                                                    id="addEmp" {...register2('edhi_shift_id', {required: true})}
                                                    aria-label="Floating label select example">
                                                {getShiftResult.map((value) => {
                                                    return (
                                                        <option value={value.shift_id}>{value.shift_name}</option>
                                                    )
                                                })}
                                            </select>
                                            <label htmlFor="addEmp">Shift</label>
                                        </div>

                                    ) : (
                                        <div>
                                            Shift tidak ada
                                        </div>
                                    )
                                }
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close
                                </button>
                                <button type="submit" className="btn custom-btn-yellow">Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
