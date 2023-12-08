import { Op } from "sequelize"
import models from "../../model/init-models.js"
import user_accounts from "../../model/user_accounts.js"
import bank from "../../model/bank.js"
import payment_gateway from "../../model/payment_gateway.js"
import entity from "../../model/entity.js"
import users from "../../model/users.js"
import payment_transaction from "../../model/payment_transaction.js"
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
        },order: [
            ['bank_entity_id', 'ASC'],
        ]})
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
            where:{paga_code : {[Op.like]: `%${paga_code}%`}},
            order: [
                ['paga_entity_id', 'ASC'],
            ]
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
        const data1 = await models.user_accounts.findAll({
            attributes: ['usac_id','usac_user_id','usac_entity_id', 'usac_account_number','usac_saldo','usac_type','usac_expmonth','usac_expyear'],
            // include : [{
            //     model:entity, as:'usac_entity',attributes: ['entity_id'],required:true,
            //     include: [{
            //         model:bank, as:'bank', attributes:['bank_code'],required: true,
            //     }],
            //
            // }],
        })

        const data2 = await models.user_accounts.findAll({
            attributes: ['usac_user_id','usac_entity_id', 'usac_account_number','usac_saldo','usac_type','usac_expmonth','usac_expyear'],
            // include : [{
            //     model:entity, as:'usac_entity',attributes: ['entity_id'],required:true,
            //     include: [{
            //         model:payment_gateway, as:'payment_gateway', attributes:['paga_code'],required: true,
            //     }],
            //
            // }],
        });

        const result = data1.concat(data2);
        return res.status(200).json({data:result,message:`Data Ditemukan `})
    } catch (error) {
        return res.status(404).json({message:error.message})
    }
}

export const createUserAccount = async (req,res)=>{
    try {
        const {entity_id,user_id,account_number,saldo,type,expmonth,expyear} = req.body;

        const result = await user_accounts.create({
            usac_entity_id:entity_id,
            usac_user_id : user_id,
            usac_account_number : account_number,
            usac_saldo : saldo,
            usac_type: type,
            usac_expmonth: expmonth,
            usac_expyear: expyear,
        })
        return res.status(200).json({message:'Data Berhasil Ditambah', data:result});

    } catch (error) {
        return res.status(404).json({message:error.message})
    }
}

export const getUserAccountById = async(req, res) =>{
    try {
        const usac_user_id = req.params.usac_user_id
        const data1 = await models.user_accounts.findAll({
            where: {usac_user_id},
            attributes: ['usac_id','usac_user_id','usac_entity_id', 'usac_account_number','usac_saldo','usac_type','usac_expmonth','usac_expyear'],
            include : [{
                model:entity, as:'usac_entity',attributes: ['entity_id'],required:true,
                include: [{
                    model:bank, as:'bank', attributes:['bank_name'],required: true,
                }],
            }],
            
        })

        const data2 = await models.user_accounts.findAll({
            where: {usac_user_id},
            attributes: ['usac_id','usac_user_id','usac_entity_id', 'usac_account_number','usac_saldo','usac_type','usac_expmonth','usac_expyear'],
            include : [{
                model:entity, as:'usac_entity',attributes: ['entity_id'],required:true,
                include: [{
                    model:payment_gateway, as:'payment_gateway', attributes:['paga_name'],required: true,
                }],
            }],
        })

        const result = data1.concat(data2);

        return res.status(200).json({data:result,message:`Data Berhasil Ditemukan`})
    } catch (error) {
        return res.status(404).json({message:error.message})
    }
}

export const updateUserAccount = async(req,res)=>{
    try {
        const id = req.params.id;
        const {entity_id,user_id,account_number,saldo,type,expmonth,expyear} = req.body;
        
        const result = await models.user_accounts.update({
            usac_entity_id:entity_id,
            usac_account_number : account_number,
            usac_saldo : saldo,
            usac_type: type,
            usac_expmonth: expmonth,
            usac_expyear: expyear,
        },{
            where:{usac_id:id},
            returning:true
        }) 

        return result[0] === 1
        ? res.status(200).json({message: `Data Berhasil Diubah`, data:result})
        : res.status(400).json({message:`Data Dengan Id ${id} Tidak Ditemukan`})

        
    } catch (error) {
        res.status(404).json(error.message)
    }
}

// ========================== BackEnd Transaction =========================


export const getTransaction = async(req,res)=>{
    try {
        const patr_user_id = req.params.patr_user_id
        const result = await models.payment_transaction.findAll()

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

export const getTransactionSearch = async(req,res)=>{
    try {
        const {trx_num,type} = req.body;
        let result = '';
    if (trx_num && type) {
        result = await models.payment_transaction.findAll({
            where: {
                [Op.and]:{
                    patr_trx_number: {[Op.like]:`${trx_num}%`},
                    patr_type:type
                }
            },
                include:[
                    {
                        model:users, as:'patr_user', attributes:['user_full_name'],required: true,
                        model: payment_transaction, as :'patr_source', required:true
                    },
                ],
            order: [
                ['patr_id', 'ASC'],
            ]}
        )
    }else if(type){
        result = await models.payment_transaction.findAll({
            where: {      
                 patr_type:type
            },
            include:[
                {
                    model:users, as:'patr_user', attributes:['user_full_name'],required: true,
                },
                {
                    model: user_accounts, as :'patr_source', required:true, attributes:['usac_account_number']
                },
                {
                    model: user_accounts, as :'patr_target', required:true, attributes:['usac_account_number']
                }
            ],order: [
                ['patr_id', 'ASC'],
            ]}
        )
    }
    else if(trx_num){
        result = await models.payment_transaction.findAll({
            where: {      
                patr_trx_number: {[Op.like]:`%${trx_num}%`}
            },
            include:[
                {
                    model:users, as:'patr_user', attributes:['user_full_name'],required: true,
                },
                {
                    model: user_accounts, as :'patr_source', required:true, attributes:['usac_account_number']
                },
                {
                    model: user_accounts, as :'patr_target', required:true, attributes:['usac_account_number']
                },

            ],
            order: [
                ['patr_id', 'ASC'],
            ]}
        )
    }
    else {
        result = await models.payment_transaction.findAll({
            include:[
                {
                    model:users, as:'patr_user', attributes:['user_full_name'],required: true,
                    
                },
                {
                    model: user_accounts, as :'patr_source', required:true, attributes:['usac_account_number']
                },
                {
                    model: user_accounts, as :'patr_target', required:true, attributes:['usac_account_number']
                },
            ]
        })
    }
    
    if(result[0]){
        return res.status(201).json({data:result, message:`Data Ditemukan`})
    }else{
        return res.status(406).json({message:`Data Tidak Ditemukan`})

    }
    

        
    } catch (error) {
        return res.status(404).json({message:error.message})
    }
}


// ========================== BackEnd TopUp =========================

export const getUserAccountExclude = async(req,res)=>{
    try {
        const usac_user_id = req.params.usac_user_id;

        const data1 = await models.user_accounts.findAll({
          
            attributes: ['usac_id','usac_user_id','usac_entity_id', 'usac_account_number','usac_saldo','usac_type','usac_expmonth','usac_expyear'],
            include : [{
                model:entity, as:'usac_entity',attributes: ['entity_id'],required:true,
                include: [{
                    model:bank, as:'bank', attributes:['bank_name'],required: true,
                }],
            }],
            where: 
            {usac_user_id:{[Op.not]: usac_user_id}
    },
            
        })

        const data2 = await models.user_accounts.findAll({
            attributes: ['usac_id','usac_user_id','usac_entity_id', 'usac_account_number','usac_saldo','usac_type','usac_expmonth','usac_expyear'],
            include : [{
                model:entity, as:'usac_entity',attributes: ['entity_id'],required:true,
                include: [{
                    model:payment_gateway, as:'payment_gateway', attributes:['paga_name'],required: true,
                }],
            }],
            where: 
            {usac_user_id:{[Op.not]: usac_user_id}
    },
        })

        const result = data1.concat(data2);
        
        return res.status(200).json(result)
    } catch (error) {
        return res.status(404).json(error.message)
    }
}

export const topUp = async(req,res)=>{
    try {
        const {source_id, target_id, saldo,saldoSource, saldoTarget, sourceAccountNumber, targetAccountNumber,userId} = req.body
        console.log(req.body)
        if(+saldo > +saldoSource ){
            return res.status(500).json({message:'Maaf Saldo Anda Kurang'})
       }else{
        const newSourceSaldo = +saldoSource - +saldo;
        const newTargetSaldo = +saldoTarget + +saldo;

        const updateSource = await models.user_accounts.update({
            usac_saldo : newSourceSaldo
        },{
            where : {usac_id : source_id},
            returning:true
        })

        const updateTarget = await models.user_accounts.update({
            usac_saldo : newTargetSaldo
        },{
            where : {usac_id : target_id},
            returning:true
        })
        
        if (updateSource[0] && updateTarget[0] === 1) {
            
            const tgl = new Date().toISOString().split('T')[0].split("-");
            const random = Math.floor(Math.random()* 9000 + 1000)
    
            const trx = `TRX#${random}-${tgl[0]+tgl[1]+tgl[2]}`

            const transaction = await models.payment_transaction.create({
                patr_trx_number : trx,
                patr_debet : saldo,
                patr_type :'TP',
                patr_note :'Top Up Saldo',
                patr_modified_date: new Date(),
                patr_source_id : sourceAccountNumber,
                patr_target_id : targetAccountNumber,
                patr_user_id: userId  
            })

            res.status(200).json({transaction,message:'Berhasil Melakukan Transfer'})
        }else{

            throw new res.status(203).json({message:'Gagal Melakukan Transfer'})
        }
    }
    } catch (error) {
        return res.status(404).json(error.message)
    }
}

