import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { getUserAccount, getUserAccountExclude, topUp } from '../../../actions/paymentAction';
import Swal from 'sweetalert2'

const TopUp = () => {
    const dispatch = useDispatch();
    const userId = 1;

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(number);
      };
    const { handleSubmit} = useForm();
    const {
        getUserAccountResult,
        getUserAccountError,
        getUserAccountLoading,

        getUserAccountExcludeResult,
        getUserAccountExcludeError,
        getUserAccountExcludeLoading,

        topUpResult,
        topUpLoading,
        topUpError,
    } = useSelector((state)=>state.paymentReducers);;


    const [saldoSource, setsaldoSource] = useState('');
    const [saldoTarget, setsaldoTarget] = useState('');
    const [saldo, setsaldo] = useState('');
    const [isTransfer, setisTransfer] = useState(false);

    const tranfer= ()=>{
        // console.log(saldoTarget)
        const data = {
            source_id : saldoSource.split(',')[1], 
            target_id : saldoTarget.split(',')[1], 
            saldo : saldo,
            saldoSource :saldoSource.split(',')[0], 
            saldoTarget : saldoTarget.split(',')[0], 
            sourceAccountNumber: saldoSource.split(',')[1], 
            targetAccountNumber: saldoTarget.split(',')[1],
            userId:userId
        }
        Swal.fire({
            title: "Confirm Transfer?",
            text: `Apakah Kamu Yakin Ingin Melakukan Transfer Dari ${saldoSource.split(',')[3]} Ke ${saldoTarget.split(',')[3]}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EBAB2D",
            cancelButtonColor: "#d33",
            confirmButtonText: "Transfer"
          }).then((result) => {
            if (result.isConfirmed) {
                setisTransfer(true)
                dispatch(topUp(data))
            }
          });
        
    }
    useEffect(() => {
        if(isTransfer){
            if(topUpResult){
                Swal.fire({
                    title: topUpResult,
                    text: 'Transfer Berhasil Dilakukan!',
                    icon: 'success'
                }).then(()=>{
                    setsaldo('')
                    setsaldoSource('')
                    setsaldoTarget('')
                    dispatch(getUserAccount(userId))
                    dispatch(getUserAccountExclude(userId))
                })
                }
                else if(topUpError){
                    Swal.fire({
                        title: topUpError,
                        text: 'Gagal Melakukan Transfer!',
                        icon: 'error'
                    })
                }
            }
        dispatch(getUserAccount(userId))
        dispatch(getUserAccountExclude(userId))
    }, [topUpResult,topUpError]);
    

    return (
        <div>
            <form onSubmit={handleSubmit(tranfer)}>
            <div className='row'>  
            <h1 className='mb-4 ms-3'>Top Up</h1>  
                <div className='col-6 border-end border-dark border-3'>
                    <h1 className='text-center mb-5'>Source</h1>
                    <div className='row g-3 align-items-center p-5'>
                        <div className="col-5 ">
                            <label className="col-form-label">Source Name</label>
                        </div>
                        <div className="col-7">                                               
                            <input type="text" id="source_name" className="form-control rounded-pill"/>
                        </div>
                        <div className="col-5">
                            <label className="col-form-label">Account</label>
                        </div>
                        <div className="col-7">                                               
                        <select className="form-select rounded-pill" value={saldoSource} onChange={(e)=>setsaldoSource(e.target.value)} required>
                            <option  value=''>Pilih Akun anda</option>
                            {
                                getUserAccountResult ?(
                                    getUserAccountResult.map((user)=>{
                                        // console.log(user)
                                          return(
                                              <option key={user.usac_id} value={user.usac_saldo +','+ user.usac_id+','+user.usac_account_number+','+(user.usac_entity.bank? user.usac_entity.bank.bank_name : user.usac_entity.payment_gateway.paga_name)}>
                                                {`${user.usac_entity.bank? user.usac_entity.bank.bank_name : user.usac_entity.payment_gateway.paga_name} - ${user.usac_account_number}`}
                                            </option>
                                            )
                                          }
                                          )
                                      )
                                      :getUserAccountLoading?(
                                          <option>{getUserAccountLoading}</option>
                                      ):(
                                          <option>{getUserAccountError ? getUserAccountError : "data Kosong"}</option>
                                      )
                            }
                            
                        </select>
                        </div>
                        <div className='mt-5'></div>
                        <div className="col-5 ">
                            <label  className="col-form-label">Current Saldo</label>
                        </div>
                        <div className="col-7">                                               
                        <input type="text" id="current_saldo_source" placeholder={formatRupiah(saldoSource.split(',')[0])} className="form-control border-0 bg-white text-center fs-4" disabled/>
                        <hr className='mt-1 border-bottom border-black'/>
                        </div>

                    </div>
                    
                </div>

                <div className='col-6 mb-4'>
                    <h1 className='text-center mb-5'>Target</h1>
                    <div className='row g-3 align-items-center p-5'>
                        <div className="col-5 ">
                            <label  className="col-form-label">Target Name</label>
                        </div>
                        <div className="col-7">                                               
                            <input type="text" id="target_name" className="form-control rounded-pill"/>
                        </div>
                        <div className="col-5">
                            <label className="col-form-label">Account</label>
                        </div>
                        <div className="col-7">                                               
                        <select className="form-select rounded-pill" value={saldoTarget} onChange={(e)=>setsaldoTarget(e.target.value)} required>
                        <option value=''>Pilih Akun Yang Ingin Anda Transfer</option>
                        {
                                getUserAccountExcludeResult ?(
                                    getUserAccountExcludeResult.map((target)=>{
                                          return(
                                              <option key={target.usac_id} value={target.usac_saldo +','+ target.usac_id+','+target.usac_account_number +','+(target.usac_entity.bank? target.usac_entity.bank.bank_name : target.usac_entity.payment_gateway.paga_name)}>
                                                 {`${target.usac_entity.bank? target.usac_entity.bank.bank_name : target.usac_entity.payment_gateway.paga_name} - ${target.usac_account_number}`}
                                              </option>
                                            )
                                          }
                                          )
                                      )
                                      :getUserAccountExcludeLoading?(
                                          <option>{getUserAccountExcludeLoading}</option>
                                      ):(
                                          <option>{getUserAccountExcludeError ? getUserAccountExcludeError : "data Kosong"}</option>
                                      )
                            }
                        </select>
                        </div>
                        <div className='mt-5'></div>
                        <div className="col-5 ">
                            <label className="col-form-label">Current Saldo</label>
                        </div>
                        <div className="col-7">                                               
                        <input type="text" id="current_saldo_target" placeholder={formatRupiah(saldoTarget.split(',')[0])}className="form-control border-0 bg-white text-center fs-4" disabled/>
                        <hr className='mt-1 border-bottom border-black'/>
                        </div>

                    </div>
                   
                </div>
                <div className='col-6'>
                   
                        <div className='row'>    
                            <div className='col-6 text-center'>
                            <button type="submit" className="btn btn-warning text-dark w-75">Transfer</button>
                            </div>
                            <div className='col-5'>
                                <input type="text" required value={saldo} id="saldo"className="form-control border-black" onChange={(e)=>setsaldo(e.target.value)} />
                            </div>
                        </div>
                    
                </div>
                
            </div>
            </form>    
        </div>
    );
}

export default TopUp;
