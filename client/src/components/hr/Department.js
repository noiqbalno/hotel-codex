import {BiPlus} from "react-icons/bi";
import {TiTimes} from "react-icons/ti";
import {useEffect, useState} from "react";
import {PiDotsThreeOutlineVerticalDuotone} from "react-icons/pi";
import {FiEdit, FiTrash} from "react-icons/fi";
import {useDispatch, useSelector} from "react-redux";
import {DeleteDepartment, GetDepartment, PostDepartment, UpdateDepartment} from "../../actions/hrAction";
import Swal from "sweetalert2";
import {FaMagnifyingGlass} from "react-icons/fa6";
import {useForm} from "react-hook-form";
import {MdArrowBackIos, MdArrowForwardIos} from "react-icons/md";

export const Department = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm()
    const {
        register: register2,
        handleSubmit: handleSubmit2,
        reset: reset2,
        setValue: setValue2,
        formState: {errors: errors2}
    } = useForm()
    const {
        register: register3,
        handleSubmit: handleSubmit3,
        reset: reset3,
        setValue: setValue3,
        formState: {errors: errors3}
    } = useForm()
    const [formKeyword, setFormKeyword] = useState('')
    const [isAddDept, setIsAddDept] = useState(false)
    const [isDelDept, setIsDelDept] = useState(false)
    const [isPutDept, setIsPutDept] = useState(false)
    const [tempOffset, setTempOffset] = useState(1)
    const dispatch = useDispatch()
    const {
        getDepartmentResult,
        postDepartmentResult,
        updateDepartmentResult,
        deleteDepartmentResult,
        getDepartmentLoading,
        getDepartmentError
    } = useSelector((state) => state.HrReducer)
    const next = (offset) => {
        const os = parseInt(offset) + 1
        setTempOffset(os)
    }
    const postDept = (data) => {
        reset()
        setIsAddDept(true)
        dispatch(PostDepartment({dept_name: data.dept_name}))
    }
    const pageDept = (data) => {
        setTempOffset(data)
    }
    const updateDept = (data) => {
        setIsPutDept(true)
        dispatch(UpdateDepartment(data.dept_id, {dept_name: data.dept_name}))
    }
    const deleteDept = (id, event, name) => {
        Swal.fire({
            title: `Delete Department ${name}?`,
            showCancelButton: true,
            confirmButtonText: 'Sure',
            confirmButtonColor: '#EBAB2D'
        }).then((res) => {
            if (res.isConfirmed) {
                event.preventDefault()
                setIsDelDept(true)
                dispatch(DeleteDepartment(id))
            }
        })
    }
    useEffect(() => {
        if (isAddDept) {
            let timerInterval
            Swal.fire({
                title: 'Add Department success',
                html: 'Auto Close',
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval)
                }
            })
        } else if (isDelDept) {
            let timerInterval
            Swal.fire({
                title: 'Delete Department success',
                html: 'Auto Close',
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval)
                }
            })
        } else if (isPutDept) {
            let timerInterval
            Swal.fire({
                title: 'Update Department success',
                html: 'Auto Close',
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval)
                }
            })
        }
        dispatch(GetDepartment({dept_name: formKeyword, offset: tempOffset, limit: 3}))
        setValue3("offset", tempOffset)
        setIsAddDept(false)
        setIsDelDept(false)
        setIsPutDept(false)
    }, [postDepartmentResult, deleteDepartmentResult, updateDepartmentResult, formKeyword, tempOffset]);
    return (
        <div>
            <h1>Department</h1>
            <nav className='bread-separator' aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">Department</li>
                </ol>
            </nav>
            <div className='row mb-4 justify-content-between'>
                <div className='col-sm-3 align-content-center mt-2'>
                    <button type="button" className="btn custom-btn-yellow" data-bs-toggle="modal"
                            data-bs-target="#addModal">
                        <BiPlus size='26'/> Add Department
                    </button>
                </div>
                <div className='col-sm-3'>
                    <div className="form-floating">
                        <input type="text"
                               onChange={(e) => {
                                   setFormKeyword(e.target.value)
                                   setTempOffset(1)
                               }}
                               value={formKeyword}
                               className="form-control text-dark form-control-sm" id="searchDept"
                               placeholder="name@example.com" required/>
                        <label htmlFor="searchDept">Search Department</label>
                    </div>
                </div>
            </div>

            <table className="table table-striped table-hover align-middle">
                {/*<caption>Jumlah data : {getDepartmentResult ? getDepartmentResult.length : 0}</caption>*/}
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Department</th>
                    <th scope="col" className='text-end'>

                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    getDepartmentResult ? (
                        getDepartmentResult.data.length !== 0 ? (
                            getDepartmentResult.data.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{value.dept_id}</th>
                                        <td>{value.dept_name}</td>
                                        <td className='text-end pe-4'>
                                            <div className="dropstart">
                                                <button className='btn btn-light' data-bs-toggle="dropdown"
                                                        aria-expanded="false">
                                                    <PiDotsThreeOutlineVerticalDuotone size='24'/>
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item custom-hover-yellow"
                                                           onClick={(e) => {
                                                               setValue2("dept_id", value.dept_id)
                                                               setValue2("dept_name", value.dept_name)
                                                           }}
                                                           data-bs-toggle="modal"
                                                           data-bs-target="#editModal"><FiEdit
                                                        size='16'/> Edit</a></li>
                                                    <li><a className="dropdown-item custom-hover-yellow text-danger"
                                                           onClick={(e) => deleteDept(value.dept_id, e, value.dept_name)}
                                                           href='#'><FiTrash size='16'/> Delete</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td colSpan='3' className='text-center'>Tidak ada data</td>
                            </tr>
                        )
                    ) : getDepartmentLoading ? (
                        <tr>
                            <td colSpan='3'>Loading...</td>
                        </tr>
                    ) : (
                        <tr>
                            <td colSpan='3'>{getDepartmentError}</td>
                        </tr>
                    )
                }

                </tbody>
            </table>
            <div className="row justify-content-center">
                <div className="col-sm-4">
                    <div className="input-group mb-3">
                        <button
                            className={`btn btn-warning text-white custom-hover-yellow pe-2 ps-3 ${tempOffset <= 1 ? "disabled" : ""}`}
                            type="button"
                            onClick={() => setTempOffset((tempOffset-1))}><MdArrowBackIos className="mb-1"/></button>
                        {
                            getDepartmentResult?(
                                getDepartmentResult.pageNum.map(value => {
                                    return(
                                        <button
                                            className={`btn custom-hover-yellow ${tempOffset === value ? "active btn-warning text-white" : "btn-outline-warning"}`}
                                            type="button"
                                            onClick={() => setTempOffset(value)}>{value}</button>
                                    )
                                })
                            ):(
                                <div></div>
                            )
                        }
                        {/*<button*/}
                        {/*    className={`btn btn-warning text-white custom-hover-yellow pe-2 ps-3 p ${tempOffset <= 1 ? "disabled" : ""}`}*/}
                        {/*    type="button"*/}
                        {/*    onClick={() => setTempOffset((tempOffset-1))}><MdArrowBackIos className="mb-1"/></button>*/}
                        {/*<input type="text" {...register3(*/}
                        {/*    'offset',*/}
                        {/*    {*/}
                        {/*        required: true,*/}
                        {/*        valueAsNumber: true,*/}
                        {/*        pattern: /^[0-9]+$/,*/}
                        {/*        validate: {*/}
                        {/*            default: value => parseInt(value) >= 1,*/}
                        {/*            max: value => parseInt(value) < getDepartmentResult.maxPagination,*/}
                        {/*        }*/}
                        {/*    })}*/}
                        {/*       className={`form-control text-dark text-center ${errors3.offset ? "is-invalid" : ""}`}*/}
                        {/*       style={{width: "0"}}*/}
                        {/*       id="dept_name"*/}
                        {/*       aria-invalid={errors3.offset ? "true" : "false"}*/}
                        {/*       placeholder="" onChange={(e) => pageDept(e.target.value)}/>*/}
                        <button
                            className={`btn btn-warning text-white custom-hover-yellow ${tempOffset >= getDepartmentResult.maxPagination ? "disabled" : ""}`}
                            type="button"
                            onClick={() => next(tempOffset)}
                        ><MdArrowForwardIos className="mb-1"/></button>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Department</h5>
                            <TiTimes data-bs-dismiss="modal" aria-label="Close" color='#EBAB2D' size={26}/>
                        </div>
                        <form onSubmit={handleSubmit(postDept)}>
                            <div className="modal-body">
                                <div className="m-2">
                                    <label htmlFor="dept_name" className="form-label">Department Name</label>
                                    <input type="text"
                                           {
                                               ...register(
                                                   'dept_name',
                                                   {
                                                       required: "Nama Department tidak boleh kosong",
                                                       pattern:
                                                           {
                                                               value: /^[a-zA-Z\s]+$/,
                                                               message: "Hanya boleh menggunakan Huruf"
                                                           },
                                                       minLength:
                                                           {
                                                               value: 4,
                                                               message: "Minimal 4 Digit"
                                                           },
                                                       validate: {
                                                           unique: v => getDepartmentResult.data.filter(value => value.dept_name.toLowerCase() === v.toString().toLowerCase()).length === 0 || "Department sudah ada",
                                                       }
                                                   }
                                               )
                                           }
                                           className={`form-control text-dark ${errors.dept_name ? "is-invalid" : ""}`}
                                           id="dept_name"
                                           aria-invalid={errors.dept_name ? "true" : "false"}
                                           placeholder=""/>
                                    <div id="dept_name_message" className="invalid-feedback">
                                        {errors.dept_name?.message}
                                    </div>
                                </div>
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
            <div className="modal fade" id="editModal" tabIndex="-1"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit2(updateDept)}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Edit Department</h5>
                                <TiTimes data-bs-dismiss="modal" onClick={() => reset2()} aria-label="Close"
                                         color='#EBAB2D' size={26}/>
                            </div>
                            <div className="modal-body">
                                <div className="m-2">
                                    <label htmlFor="dept_name_edit" className="form-label">Department Name</label>
                                    <input type="text"
                                           {
                                               ...register2(
                                                   'dept_name',
                                                   {
                                                       required: "Nama Department tidak boleh kosong",
                                                       pattern:
                                                           {
                                                               value: /^[a-zA-Z\s]+$/,
                                                               message: "Hanya boleh menggunakan Huruf"
                                                           },
                                                       minLength:
                                                           {
                                                               value: 4,
                                                               message: "Minimal 4 Digit"
                                                           },
                                                       validate: {
                                                           unique: v => getDepartmentResult.data.filter(value => value.dept_name.toLowerCase() === v.toString().toLowerCase()).length === 0 || "Department sudah ada",
                                                       }
                                                   }
                                               )
                                           }
                                           className={`form-control text-dark ${errors2.dept_name ? "is-invalid" : ""}`}
                                           id="dept_name_edit"
                                           aria-invalid={errors2.dept_name ? "true" : "false"}
                                           placeholder=""/>
                                    <div className="invalid-feedback">
                                        {errors2.dept_name?.message}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark"
                                        data-bs-dismiss="modal" onClick={() => reset2()}>Close
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
