import axios from "axios";

export const GET_DEPARTMENT = "GET_DEPARTMENT"
export const POST_DEPARTMENT = "POST_DEPARTMENT"
export const DELETE_DEPARTMENT = "DELETE_DEPARTMENT"
export const UPDATE_DEPARTMENT = "UPDATE_DEPARTMENT"
export const GET_EMPLOYEE = "GET_EMPLOYEE"
export const POST_EMPLOYEE = "POST_EMPLOYEE"
export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE"
export const UPDATE_EMPLOYEE = "UPDATE_EMPLOYEE"
export const GET_JOB_ROLE = "GET_JOB_ROLE"
export const GET_SHIFT = "GET_SHIFT"
export const GET_SERVICE_TASK = "GET_SERVICE_TASK"
export const GET_WORK_ORDER = "GET_WORK_ORDER"
export const POST_WORK_ORDER = "POST_WORK_ORDER"
export const PUT_WORK_ORDER = "PUT_WORK_ORDER"
export const DELETE_WORK_ORDER = "DELETE_WORK_ORDER"
export const GET_WORK_ORDER_DETAIL = "GET_WORK_ORDER_DETAIL"
export const POST_WORK_ORDER_DETAIL = "POST_WORK_ORDER_DETAIL"
export const PUT_WORK_ORDER_DETAIL = "PUT_WORK_ORDER_DETAIL"
export const DELETE_WORK_ORDER_DETAIL = "DELETE_WORK_ORDER_DETAIL"
export const GET_FACILITIES = "GET_FACILITIES"

export const GetDepartment = (data) => {
    return async (dispatch) => {
        dispatch({
            type: GET_DEPARTMENT,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "POST",
            url: "http://localhost:4000/hr/department",
            data: data,
            timeout: 120000
        }).then((res) => {
            console.log(res)
            dispatch({
                type: GET_DEPARTMENT,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: GET_DEPARTMENT,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
export const PostDepartment = (data) => {
    return async (dispatch) => {
        dispatch({
            type: POST_DEPARTMENT,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "POST",
            url: "http://localhost:4000/hr/department/create",
            data: data,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: POST_DEPARTMENT,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: POST_DEPARTMENT,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
export const DeleteDepartment = (id) => {
    return async (dispatch) => {
        dispatch({
            type: DELETE_DEPARTMENT,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "DELETE",
            url: "http://localhost:4000/hr/department/" + id,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: DELETE_DEPARTMENT,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: DELETE_DEPARTMENT,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
export const UpdateDepartment = (id, data) => {
    return async (dispatch) => {
        dispatch({
            type: UPDATE_DEPARTMENT,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "PUT",
            url: "http://localhost:4000/hr/department/" + id,
            data: data,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: UPDATE_DEPARTMENT,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: UPDATE_DEPARTMENT,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}

export const GetEmployee = (data) => {
    return async (dispatch) => {
        dispatch({
            type: GET_EMPLOYEE,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "POST",
            url: "http://localhost:4000/hr/allEmployee",
            data: data,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: GET_EMPLOYEE,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: GET_EMPLOYEE,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
export const PostEmployee = (data) => {
    return async (dispatch) => {
        dispatch({
            type: POST_EMPLOYEE,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "POST",
            url: "http://localhost:4000/hr/employee",
            data: data,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: POST_EMPLOYEE,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: POST_EMPLOYEE,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
export const UpdateEmployee = (id, data) => {
    return async (dispatch) => {
        console.log(data)
        dispatch({
            type: UPDATE_EMPLOYEE,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "PUT",
            url: "http://localhost:4000/hr/employee/" + id,
            data: data,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: UPDATE_EMPLOYEE,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: UPDATE_EMPLOYEE,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
export const DeleteEmployee = (id, oldImage) => {
    return async (dispatch) => {
        dispatch({
            type: DELETE_EMPLOYEE,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "DELETE",
            url: "http://localhost:4000/hr/employee/" + id,
            data: {oldImage: oldImage},
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: DELETE_EMPLOYEE,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: DELETE_EMPLOYEE,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}

export const GetJobRole = () => {
    return async (dispatch) => {
        dispatch({
            type: GET_JOB_ROLE,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "GET",
            url: "http://localhost:4000/hr/job-role",
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: GET_JOB_ROLE,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: GET_JOB_ROLE,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
export const GetShift = () => {
    return async (dispatch) => {
        dispatch({
            type: GET_SHIFT,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "GET",
            url: "http://localhost:4000/hr/shift",
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: GET_SHIFT,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: GET_SHIFT,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
export const GetServiceTask = () => {
    return async (dispatch) => {
        dispatch({
            type: GET_SERVICE_TASK,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "GET",
            url: "http://localhost:4000/servicetask",
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: GET_SERVICE_TASK,
                payload: {
                    loading: false,
                    data: res.data.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: GET_SERVICE_TASK,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
export const GetWorkOrder = (data) => {
    return async (dispatch) => {
        dispatch({
            type: GET_WORK_ORDER,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "POST",
            url: "http://localhost:4000/hr/work-orders-search",
            data: data,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: GET_WORK_ORDER,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: GET_WORK_ORDER,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
export const PostWorkOrder = (data) => {
    return async (dispatch) => {
        dispatch({
            type: POST_WORK_ORDER,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "POST",
            url: "http://localhost:4000/hr/work-orders",
            data: data,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: POST_WORK_ORDER,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: POST_WORK_ORDER,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data
                }
            })
        })
    }
}
export const PutWorkOrder = (data, id) => {
    return async (dispatch) => {
        dispatch({
            type: PUT_WORK_ORDER,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "PUT",
            url: "http://localhost:4000/hr/work-orders/" + id,
            data: data,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: PUT_WORK_ORDER,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: PUT_WORK_ORDER,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data
                }
            })
        })
    }
}
export const DeleteWorkOrder = (id) => {
    return async (dispatch) => {
        dispatch({
            type: DELETE_WORK_ORDER,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "DELETE",
            url: "http://localhost:4000/hr/work-orders/" + id,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: DELETE_WORK_ORDER,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: DELETE_WORK_ORDER,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data
                }
            })
        })
    }
}
export const GetWorkOrderDetail = (id) => {
    return async (dispatch) => {
        dispatch({
            type: GET_WORK_ORDER_DETAIL,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "GET",
            url: "http://localhost:4000/hr/work-order-detail/" + id,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: GET_WORK_ORDER_DETAIL,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: GET_WORK_ORDER_DETAIL,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
export const PostWorkOrderDetail = (data) => {
    return async (dispatch) => {
        dispatch({
            type: POST_WORK_ORDER_DETAIL,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "POST",
            url: "http://localhost:4000/hr/work-order-detail/",
            data: data,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: POST_WORK_ORDER_DETAIL,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: POST_WORK_ORDER_DETAIL,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
export const PutWorkOrderDetail = (data, id) => {
    return async (dispatch) => {
        dispatch({
            type: PUT_WORK_ORDER_DETAIL,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "PUT",
            url: "http://localhost:4000/hr/work-order-detail/"+id,
            data: data,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: PUT_WORK_ORDER_DETAIL,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: PUT_WORK_ORDER_DETAIL,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
export const DeleteWorkOrderDetail = (id) => {
    return async (dispatch) => {
        dispatch({
            type: DELETE_WORK_ORDER_DETAIL,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "DELETE",
            url: "http://localhost:4000/hr/work-order-detail/" + id,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: DELETE_WORK_ORDER_DETAIL,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: DELETE_WORK_ORDER_DETAIL,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data
                }
            })
        })
    }
}
export const GetAllFacilities = () => {
    return async (dispatch) => {
        dispatch({
            type: GET_FACILITIES,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "GET",
            url: "http://localhost:4000/hotel/facilities",
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: GET_FACILITIES,
                payload: {
                    loading: false,
                    data: res.data.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: GET_FACILITIES,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}