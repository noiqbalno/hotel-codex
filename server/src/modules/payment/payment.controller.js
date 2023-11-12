import { Op } from "sequelize"
import models from "../../model/init-models.js"
// import bank from "../../model/bank.js"


// ================ BackEnd Bank ================
export const payment = async(req,res)=>{
    try {
        return res.status(200).json({message: 'Hello Payment!'})
    } catch (error) {
        return res.status(404).json({message: error.message})
    }
}

export const getAllBank = async(req, res)=>{
    try {
        const result = await models.bank.findAll({attributes:['bank_entity_id','bank_code','bank_name']});
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({message:error.message})
    }
}

export const createBank = async(req,res)=>{
    try {
        const {bank_code, bank_name} = req.body;

        const result = await models.entity.create({
            bank:{
            bank_code,
            bank_name,
        }
        },{
            include: 'bank'
        });
        return res.status(200).json({data: result, message:'Bank Berhasil Ditambah Dinput'});
    } catch (error) {
        return res.status(404).json({message:error.message})
    }
}

export const getBankId = async (req,res)=>{
    try {
        const id = req.params.id;
        const result = await models.bank.findOne({where: {bank_entity_id:id}})
        return result === null
        ?res.status(401).json({message: `Data Dengan Id ${id} Tidak Ditemukan`})
        :res.status(200).json(result)
    } catch (error) {
        return res.status(404).json({message:error.message})
    }
}

export const searchBank = async (req,res)=>{
    try {
        const bank_name = req.body.bank_name;
        const result = await models.bank.findAll({where: {
            bank_name : {[Op.like]: `${bank_name}%`}
        }})
        return !result[0]
        ?res.status(404).json({message:`Bank Dengan Nama ${req.body.bank_name} tidak ditemukan`})
        :res.status(200).json({data:result})

    } catch (error) {
        return res.status(404).json({message:error.message})
    }
}

export const updateBank = async (req, res) => {
    try {
        const id = req.params.id;
        const {bank_code,bank_name} = req.body;

        const result = await models.bank.update({
            bank_code:bank_code,
            bank_name:bank_name
        },
        {
            where:{bank_entity_id:id},
            returning: true
        })
        return result[0] === 1
        ? res.status(200).json({data: result,message:'Data Berhasil Diubah'})
        : res.status(404).json({message:`Data Dengan Id ${id} Tidak Ditemukan`})
    } catch (error) {
        return res.status(404).json({message:error.message})
    }
}

export const deleteBank = async(req,res)=>{
    try {
        const id = req.params.id;
        const result =  await models.bank.destroy({
            where:{bank_entity_id:id},
        })
        // console.log(result)
        if( result === 1){
            await models.entity.destroy({where:{entity_id:id}})
            res.status(200).json({message: `Berhasil Menghapus`})
        }else{
            res.status(400).json({message: `Gagal Menghapus`})
        }
    } catch (error) {
        return res.status(404).json({message:error.message})
    }
}

// ========================== BackEn==d Fintech ========================


export const getPaymentGateaway = async (req, res) => {

    try {
        const result = await models.payment_gateway.findAll();
        return res.status(200).json({data: result});
    } catch (error) {
        res.status(404).json({message:error.message})
    }

}

export const addPaymentGateaway = async (req, res) => {

    try {
        const {paga_code, paga_name} = req.body;
        const result = await models.entity.create({
            payment_gateway:{
            paga_code : paga_code,
            paga_name : paga_name
        }
        },{
            include: 'payment_gateway',
            returning: true
        })

        return res.status(200).json({message:`Data Berhasil Ditambah`, data:result})
    } catch (error) {
        return res.status(404).json({message:error.message})
    }

}

export const getPaymentGateawayById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await models.payment_gateway.findOne({where:{paga_entity_id : id}})

        return result === null
        ? res.status(400).json({message:`Data Dengan Id ${id} Tidak Ditemukan`})
        : res.status(200).json({message: `Data Berhasil Ditemukan`, data:result})
    } catch (error) {
        return res.status(404).json({message:error.message})
    }
}

export const updatePaymentGateaway = async (req, res) => {
    try {
        const id = req.params.id;
        const{paga_code, paga_name} = req.body;

        const result = await models.payment_gateway.update({
            paga_code: paga_code,
            paga_name:paga_name
        },{
            where:{paga_entity_id:id},
            returning: true
        })

        return result[0] === 1
        ? res.status(200).json({message: `Data Berhasil Diubah`, data:result})
        : res.status(400).json({message:`Data Dengan Id ${id} Tidak Ditemukan`})
    } catch (error) {
        return res.status(404).json({message:error.message})
    }
}

export const searchPaymentGateaway = async (req, res) => {
    try {
        const paga_code = req.body.paga_code;

        const result = await models.payment_gateway.findAll({
            where:{paga_code : {[Op.like]: `%${paga_code}%`}}
        })
        return !result[0]
        ?res.status(404).json({message:`Data Dengan Code ${paga_code} Tidak Ditemukan`})
        :res.status(200).json({message: `Data Berhasil Ditemukan`, data:result})
        // return res.status(200).json({message: `Data Dengan Code ${paga_code} Tidak Ditemukan`})

    } catch (error) {
        return res.status(404).json({message:error.message})
    }
}

export const deletePaymentGateaway = async (req, res) => {
    
    try {
        const id = req.params.id;
        const result = await models.payment_gateway.destroy({where: {paga_entity_id:id}})
        if(result === 1){
        
            await models.entity.destroy({where:{entity_id:id}})
            return res.status(200).json({message:` Data Dengan Id ${id} Berhasil Dihapus`})
    
        }else{
            return res.status(400).json({message:`Data Dengan Id ${id} Tidak Ditemukan`})
        }
    } catch (error) {
        return res.status(404).json({message: error.message})
    }
}

// ========================== BackEnd User Account ========================

export const getUserAccount = async(req,res)=>{
    try {
        const result = await models.user_accounts.findAll({where: {usac_user_id: req.params.id}});
        
        return res.status(200).json({data:result,message:`Data Ditemukan `})
    } catch (error) {
        return res.status(404).json({message:error.message})
    }
}

export const createUserAccount = async (req,res)=>{
    try {
        const {account_number,desc,saldo} = req.body;

    } catch (error) {
        return res.status(404).json({message:error.message})
    }
}

export const getUserAccountById = async(req, res) =>{
    try {
        const usac_entity_id = req.params.usac_entity_id
        const result = await models.user_accounts.findOne({where: {usac_entity_id}})

        return res.status(200).json({data:result,message:`Data Berhasil Ditemukan`})
    } catch (error) {
        return res.status(404).json({message:error.message})
    }
}

// ========================== BackEnd Transaction =========================

export const getTransaction = async(req,res)=>{
    try {
        const patr_user_id = req.params.patr_user_id
        const result = await models.payment_transaction.findAll({where:{patr_user_id}})

        return res.status(200).json({data:result, message:`Data Ditemukan`})
    } catch (error) {
        return res.status(404).json({message:error.message})
    }
}

export const getTransactionPagination = async(req,res)=>{
    try {
        const {page_number} = req.query
        const size = 5;

        const result = await models.payment_transaction.findAll({
            limit : size,
            offset: page_number * size
        })

        return res.status(200).json({data:result})
    } catch (error) {
        return res.status(404).json({message:error.message})
    }
}

export const getTransactionDetail = async(req,res)=>{
    try {
        const patr_id = req.params.patr_id
        const result = await models.payment_transaction.findOne({where: {patr_id}})
        
        return res.status(200).json({data:result})
    } catch (error) {
        return res.status(404).json({message:error.message})
    }
}