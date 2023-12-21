import models from "../../model/init-models.js";
import {Op} from "sequelize";
import work_orders from "../../model/work_orders.js";
import facilities from "../../model/facilities.js";
import service_task from "../../model/service_task.js";
import employee from "../../model/employee.js";
import employee_pay_history from "../../model/employee_pay_history.js";
import employee_department_history from "../../model/employee_department_history.js";
import fs from "fs";
import users from "../../model/users.js";

/*
 * Department
 */
export const getDepartment = async (req, res) => {
    try { //order: [['id','DESC']], include: [Users]
        const {dept_name, offset, limit} = req.body
        const total = await models.department.count({
            where: {
                dept_name: {
                    [Op.iLike]: `%${dept_name ? dept_name : ''}%`
                }
            }
        })
        // console.log(Math.ceil(14/5))
        const search = await models.department.findAll({
            offset: offset ? limit * (offset - 1) : 0,
            limit: limit,
            where: {
                dept_name: {
                    [Op.iLike]: `%${dept_name ? dept_name : ''}%`
                }
            }
        })
        const maxPage = Math.ceil(total / limit)
        const numShowPage = 5
        let pageNum = []
        pageNum.push(parseInt(offset))
        const beforeAfter = (offset === 2 || offset === maxPage-1?Math.floor(numShowPage/2)+1:offset === 1 || offset === maxPage? numShowPage-1:Math.floor(numShowPage/2))
        if (pageNum.length <= numShowPage){
            let i = 1
            let num = parseInt(offset) +1
            while (i <= beforeAfter && pageNum.length <= numShowPage && num <= maxPage) {
                pageNum.push(num++)
                i++
            }
        }
        if (pageNum.length <= numShowPage){
            let i = 1
            let num = offset-1
            while (i <= beforeAfter && pageNum.length <= numShowPage && num >= 1) {
                pageNum.unshift(num--)
                i++
            }
        }
        res.status(200).json({data: search, maxPagination: maxPage, pageNum})
    } catch (e) {
        res.status(500).json(e.message)
    }
};

export const createDepartment = async (req, res) => {
    try {
        const {dept_name} = req.body
        const create = await models.department.create({
            dept_name: dept_name,
            dept_modified_date: Date.now() //toLocaleString('en-US',{timeZone: 'Asia/Jakarta'})
        }, {
            returning: true
        })
        res.status(201).json({data: create, message: "Sukses input department"})
    } catch (e) {
        res.status(500).json(e.message)
    }
};

export const updateDepartment = async (req, res) => {
    try {
        const tzDate = new Date().toLocaleString('en-US', {timeZone: 'Asia/Jakarta'})
        const {dept_name} = req.body
        const update = await models.department.update({
            dept_name: dept_name,
            dept_modified_date: tzDate
        }, {
            where: {dept_id: req.params.id},
            returning: true
        })
        update[0] === 1 ?
            res.status(200).json({data: update, message: "Sukses update department"}) :
            res.status(404).json({message: `ID Department ${req.params.id} not found!`})
    } catch (e) {
        res.status(500).json(e.message)
    }
};

export const deleteDepartment = async (req, res) => {
    try {
        const del = await models.department.destroy({where: {dept_id: req.params.id}})
        del === 1 ?
            res.status(200).json({data: del, message: "Sukses hapus department"}) :
            res.status(404).json({message: `ID Department ${req.params.id} not found!`})
    } catch (e) {
        res.status(500).json(e.message)
    }
};

export const searchDepartment = async (req, res) => {
    try { //order: [['id','DESC']], include: [Users]
        const {keyword} = req.body
        const search = await models.department.findAll({
            where: {
                dept_name: {
                    [Op.iLike]: `%${keyword ? keyword : ''}%`
                }
            }
        })
        res.status(200).json(search)
    } catch (e) {
        res.status(500).json(e.message)
    }
};

/*
 * Employee
 */

export const getEmployee = async (req, res) => {
    try {
        const result = await models.employee.findAll({
            where: {
                [Op.and]: {
                    emp_fullname: {
                        [Op.iLike]: `%${req.body.emp_fullname ? req.body.emp_fullname : ''}%`,
                    },
                    emp_current_flag: req.body.emp_current_flag ? req.body.emp_current_flag : [0, 1]
                }
            },
            include: [
                {
                    model: employee_pay_history,
                    as: 'employee_pay_histories',
                    attributes: ["ephi_pay_frequence", "ephi_rate_salary"],
                    required: true,
                }, {
                    model: employee_department_history,
                    as: 'employee_department_histories',
                    required: true,
                },
            ],
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const createEmployee = async (req, res) => {
    try {
        // const {emp_national_id, emp_birth_date} = req.body
        let finalImageUrl = 'https://via.placeholder.com/100'
        if (req.file) {
            finalImageUrl = req.protocol + "://" + req.get('host') + "/uploads/" + req.file.filename;
        }
        const create = await models.employee.create({
            emp_national_id: req.body.emp_national_id,
            emp_fullname: req.body.emp_fullname,
            emp_birth_date: req.body.emp_birth_date,
            emp_marital_status: req.body.emp_marital_status,
            emp_gender: req.body.emp_gender,
            emp_hire_date: req.body.emp_hire_date,
            emp_salaried_flag: req.body.emp_salaried_flag,
            emp_vacation_hours: req.body.emp_vacation_hours,
            emp_sickleave_hours: req.body.emp_sickleave_hours,
            emp_current_flag: req.body.emp_current_flag,
            emp_photo: finalImageUrl,
            emp_modified_date: new Date(),
            emp_joro_id: req.body.emp_joro_id,
        }, {
            returning: true
        })
        const createEphi = await models.employee_pay_history.create({
            ephi_emp_id: create.dataValues.emp_id,
            ephi_rate_salary: req.body.ephi_rate_salary,
            ephi_pay_frequence: req.body.ephi_pay_frequence,
            ephi_modified_date: new Date(),
            ephi_rate_exchange_date: new Date(),
        }, {
            returning: true
        })
        const createEdhi = await models.employee_department_history.create({
            edhi_emp_id: create.dataValues.emp_id,
            edhi_start_date: req.body.edhi_start_date,
            edhi_end_date: req.body.edhi_end_date,
            edhi_modified_date: new Date(),
            edhi_dept_id: req.body.edhi_dept_id,
            edhi_shift_id: req.body.edhi_shift_id,
        })
        res.status(201).json({
            data: {employee: create, payHistory: createEphi, deptHistory: createEdhi},
            message: "Sukses input Employee"
        })
    } catch (e) {
        res.status(500).json(e.message)
    }
};

export const updateEmployee = async (req, res) => {
    try {
        let finalImageUrl = req.file ? req.file.filename : ''
        if (req.body.oldImage === "https://via.placeholder.com/100" && finalImageUrl) {
            finalImageUrl = req.protocol + "://" + req.get('host') + "/uploads/" + req.file.filename;
        } else if (finalImageUrl) {
            fs.unlinkSync('./src/public/uploads/' + req.body.oldImage.split('/').slice(-1)[0])
            finalImageUrl = req.protocol + "://" + req.get('host') + "/uploads/" + req.file.filename;
        } else {
            finalImageUrl = req.body.oldImage
        }
        const update = await models.employee.update({
            emp_fullname: req.body.emp_fullname,
            emp_birth_date: req.body.emp_birth_date,
            emp_marital_status: req.body.emp_marital_status,
            emp_gender: req.body.emp_gender,
            emp_hire_date: req.body.emp_hire_date,
            emp_salaried_flag: req.body.emp_salaried_flag,
            emp_vacation_hours: req.body.emp_vacation_hours,
            emp_sickleave_hours: req.body.emp_sickleave_hours,
            emp_current_flag: req.body.emp_current_flag,
            emp_photo: finalImageUrl,
            emp_modified_date: new Date(),
            emp_joro_id: req.body.emp_joro_id,
        }, {
            where: {emp_id: req.params.id},
            returning: true
        })
        const updateEphi = await models.employee_pay_history.update({
            ephi_rate_salary: req.body.ephi_rate_salary,
            ephi_pay_frequence: req.body.ephi_pay_frequence,
            ephi_modified_date: new Date(),
        }, {
            where: {
                ephi_emp_id: req.params.id
            }
        })
        const updateEdhi = await models.employee_department_history.update({
            edhi_start_date: req.body.edhi_start_date,
            edhi_end_date: req.body.edhi_end_date,
            edhi_modified_date: new Date(),
            edhi_dept_id: req.body.edhi_dept_id,
            edhi_shift_id: req.body.edhi_shift_id,
        }, {
            where: {
                edhi_emp_id: req.params.id
            }
        })
        updateEdhi[0] === 1 ?
            res.status(200).json({message: "Sukses update Employee"}) :
            res.status(404).json({message: `ID Employee ${req.params.id} not found!`})
    } catch (e) {
        res.status(500).json(e.message)
    }
};

export const deleteEmployee = async (req, res) => {
    try {
        const del = await models.employee.destroy({where: {emp_id: req.params.id}})
        if (req.body.oldImage !== "https://via.placeholder.com/100") {
            fs.unlinkSync('./src/public/uploads/' + req.body.oldImage.split('/').slice(-1)[0])
        }
        del === 1 ?
            res.status(200).json({message: "Sukses hapus Employee"}) :
            res.status(404).json({message: `ID Employee ${req.params.id} not found!`})
    } catch (e) {
        res.status(500).json(e.message)
    }
};

export const searchEmployee = async (req, res) => {
    try { //order: [['id','DESC']], include: [Users]
        const {keyword, status} = req.body
        const search = await models.employee.findAll({
            where: {
                [Op.and]: {
                    emp_national_id: {
                        [Op.iLike]: `%${keyword ? parseInt(keyword) : ''}%`,
                    },
                    emp_current_flag: status ? status : [0, 1]
                }
            }
        })
        res.status(200).json(search)
    } catch (e) {
        res.status(500).json(e.message)
    }
};

/*
 * Job Role
 */
export const getJobRole = async (req, res) => {
    try {
        const result = await models.job_role.findAll();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const createJobRole = async (req, res) => {
    try {
        const {joro_name} = req.body
        const create = await models.job_role.create({
            joro_name: joro_name,
            joro_modified_date: Date.now() //toLocaleString('en-US',{timeZone: 'Asia/Jakarta'})
        }, {
            returning: true
        })
        res.status(201).json({data: create, message: "Sukses input Job Role"})
    } catch (e) {
        res.status(500).json(e.message)
    }
};

export const updateJobRole = async (req, res) => {
    try {
        const tzDate = new Date().toLocaleString('en-US', {timeZone: 'Asia/Jakarta'})
        const {joro_name} = req.body
        const update = await models.job_role.update({
            joro_name: joro_name,
            joro_modified_date: tzDate
        }, {
            where: {joro_id: req.params.id},
            returning: true
        })
        update[0] === 1 ?
            res.status(200).json({data: update, message: "Sukses update Job Role"}) :
            res.status(404).json({message: `ID Job Role ${req.params.id} not found!`})
    } catch (e) {
        res.status(500).json(e.message)
    }
};

export const deleteJobRole = async (req, res) => {
    try {
        const del = await models.job_role.destroy({where: {joro_id: req.params.id}})
        del === 1 ?
            res.status(200).json({data: del, message: "Sukses hapus Job Role"}) :
            res.status(404).json({message: `ID Job Role ${req.params.id} not found!`})
    } catch (e) {
        res.status(500).json(e.message)
    }
};

/*
 * Shift
 */
export const getShift = async (req, res) => {
    try {
        const result = await models.shift.findAll();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const createShift = async (req, res) => {
    try {
        const {shift_name, shift_start_time, shift_end_time} = req.body
        const create = await models.shift.create({
            shift_name: shift_name,
            shift_start_time: shift_start_time,
            shift_end_time: shift_end_time,
        }, {
            returning: true
        })
        res.status(201).json({data: create, message: "Sukses input Shift"})
    } catch (e) {
        res.status(500).json(e.message)
    }
};

export const updateShift = async (req, res) => {
    try {
        const {shift_name, shift_start_time, shift_end_time} = req.body
        const update = await models.shift.update({
            shift_name: shift_name,
            shift_start_time: shift_start_time,
            shift_end_time: shift_end_time,
        }, {
            where: {shift_id: req.params.id},
            returning: true
        })
        update[0] === 1 ?
            res.status(200).json({data: update, message: "Sukses update Shift"}) :
            res.status(404).json({message: `ID Shift ${req.params.id} not found!`})
    } catch (e) {
        res.status(500).json(e.message)
    }
};

export const deleteShift = async (req, res) => {
    try {
        const del = await models.shift.destroy({where: {shift_id: req.params.id}})
        del === 1 ?
            res.status(200).json({data: del, message: "Sukses hapus Shift"}) :
            res.status(404).json({message: `ID Shift ${req.params.id} not found!`})
    } catch (e) {
        res.status(500).json(e.message)
    }
};

/*
 * WorkOrder
 */
export const getWorkOrder = async (req, res) => {
    try {
        let result = '';
        if (req.body.startDate && req.body.endDate) {
            console.log(req.body.startDate.split(' ')[0])
            result = await models.work_orders.findAll({
                where: {
                    [Op.and]: {
                        woro_start_date: {
                            [Op.lte]: req.body.endDate.split(' ')[0],
                            [Op.gte]: req.body.startDate.split(' ')[0],
                        },
                        woro_status: req.body.workOrderStatus ? req.body.workOrderStatus : ["OPEN", "CLOSED", "CANCELLED"]
                    }
                },
                order: [
                    ["woro_start_date", "DESC"],
                ],
                include: [
                    {
                        model: users,
                        as: 'woro_user',
                        attributes: ["user_full_name"],
                        required: true,
                    }
                ],
            });
        } else {
            result = await models.work_orders.findAll({
                where: {
                    woro_status: req.body.workOrderStatus ? req.body.workOrderStatus : ["OPEN", "CLOSED", "CANCELLED"]
                },
                order: [
                    ["woro_start_date", "DESC"],
                ],
                include: [
                    {
                        model: users,
                        as: 'woro_user',
                        attributes: ["user_full_name"],
                        required: true,
                    }
                ],
            });
        }
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const createWorkOrder = async (req, res) => {
    try {
        const {woro_start_date, woro_status, woro_user_id} = req.body
        const result = await models.work_orders.create({
            woro_start_date: woro_start_date,
            woro_status: woro_status,
            woro_user_id: woro_user_id,
        }, {
            returning: true
        })
        res.status(201).json({data: result, message: "Sukses input Work Orders"})
    } catch (e) {
        res.status(500).json(e)
    }
};

export const updateWorkOrder = async (req, res) => {
    try {
        const {woro_status, woro_start_date} = req.body
        const update = await models.work_orders.update({
            woro_start_date: woro_start_date,
            woro_status: woro_status,
        }, {
            where: {woro_id: req.params.id},
            returning: true
        })
        update[0] === 1 ?
            res.status(200).json({data: update, message: "Sukses update Work Orders"}) :
            res.status(404).json({message: `ID Work Orders ${req.params.id} not found!`})
    } catch (e) {
        res.status(500).json(e.message)
    }
};

export const deleteWorkOrder = async (req, res) => {
    try {
        const del = await models.work_orders.destroy({where: {woro_id: req.params.id}})
        del === 1 ?
            res.status(200).json({data: del, message: "Sukses hapus Work Orders"}) :
            res.status(404).json({message: `ID Work Orders ${req.params.id} not found!`})
    } catch (e) {
        res.status(500).json(e.message)
    }
};

/*
 * Work Order Detail
 */
export const getWorkOrderDetail = async (req, res) => {
    try {
        const result = await models.work_order_detail.findAll({
                where: {
                    wode_woro_id: req.params.id
                },
                include: [
                    {
                        model: facilities,
                        as: 'wode_faci'
                    },
                    {
                        model: work_orders,
                        as: 'wode_woro'
                    },
                    {
                        model: service_task,
                        as: 'wode_setum'
                    },
                    {
                        model: employee,
                        as: 'wode_emp'
                    }
                ]
            }
        )
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const createWorkOrderDetail = async (req, res) => {
    try {
        const {
            wode_task_name,
            wode_status,
            wode_start_date,
            wode_end_date,
            wode_notes,
            wode_emp_id,
            wode_seta_id,
            wode_faci_id,
            wode_woro_id
        } = req.body
        const result = await models.work_order_detail.create({
            wode_task_name: wode_task_name,
            wode_status: wode_status,
            wode_start_date: wode_start_date,
            wode_end_date: wode_end_date,
            wode_notes: wode_notes,
            wode_emp_id: wode_emp_id,
            wode_seta_id: wode_seta_id,
            wode_faci_id: wode_faci_id,
            wode_woro_id: wode_woro_id
        }, {
            returning: true
        })
        res.status(201).json({data: result, message: "Sukses input Work Orders Detail"})
    } catch (e) {
        res.status(500).json(e.message)
    }
};

export const updateWorkOrderDetail = async (req, res) => {
    try {
        const {
            wode_task_name,
            wode_status,
            wode_start_date,
            wode_end_date,
            wode_notes,
            wode_emp_id,
            wode_seta_id,
            wode_faci_id,
        } = req.body
        const update = await models.work_order_detail.update({
            wode_task_name: wode_task_name,
            wode_status: wode_status,
            wode_start_date: wode_start_date,
            wode_end_date: wode_end_date,
            wode_notes: wode_notes,
            wode_emp_id: wode_emp_id,
            wode_seta_id: wode_seta_id,
            wode_faci_id: wode_faci_id
        }, {
            where: {wode_id: req.params.id},
            returning: true
        })
        update[0] === 1 ?
            res.status(200).json({data: update, message: "Sukses update Work Orders Detail"}) :
            res.status(404).json({message: `ID Work Orders Detail ${req.params.id} not found!`})
    } catch (e) {
        res.status(500).json(e.message)
    }
};

export const deleteWorkOrderDetail = async (req, res) => {
    try {
        const del = await models.work_order_detail.destroy({where: {wode_id: req.params.id}})
        del === 1 ?
            res.status(200).json({data: del, message: "Sukses hapus Work Orders Detail"}) :
            res.status(404).json({message: `ID Work Orders Detail ${req.params.id} not found!`})
    } catch (e) {
        res.status(500).json(e.message)
    }
};

/*
 * Employee Pay History
*/
// export const createEmployeePayHistory = async (req, res) => {
//     try {
//         const {
//             ephi_rate_exchange_date,
//             ephi_emp_id,
//             ephi_rate_salary,
//             ephi_pay_frequence,
//             ephi_modified_date
//         } = req.body
//         const search = await models.employee_pay_history.findOne({
//             where: {
//                 ephi_rate_exchange_date: ephi_rate_exchange_date,
//                 ephi_emp_id: ephi_emp_id
//             }
//         })
//         if (search === null) {
//             const createEphi = await models.employee_pay_history.create({
//                 ephi_emp_id: ephi_emp_id,
//                 ephi_rate_salary: ephi_rate_salary,
//                 ephi_pay_frequence: ephi_pay_frequence,
//                 ephi_modified_date: ephi_modified_date,
//                 ephi_rate_exchange_date: ephi_rate_exchange_date,
//             }, {
//                 returning: true
//             })
//             console.log(createEphi)
//         } else {
//             const updateEphi = await models.employee_pay_history.update({
//                 ephi_rate_salary: ephi_rate_salary,
//                 ephi_pay_frequence: ephi_pay_frequence,
//                 ephi_modified_date: ephi_modified_date,
//             },{
//                 where: {
//                     ephi_rate_exchange_date: ephi_rate_exchange_date,
//                     ephi_emp_id: ephi_emp_id
//                 }
//             })
//             console.log(updateEphi)
//         }
//         // res.status(201).json({data: create, message: "Sukses input Job Role"})
//     } catch (e) {
//         res.status(500).json(e.message)
//     }
// };