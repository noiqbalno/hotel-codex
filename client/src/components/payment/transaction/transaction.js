import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {format} from 'date-fns'
import { getTransaction } from '../../../actions/paymentAction';

const Transaction = () => {
    const dispatch = useDispatch();
    const { handleSubmit } = useForm();
    const ref = useRef();
    const [isSearch, setisSearch] = useState(false);

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(number);
      };

    const {
        getTransactionResult, 
        getTransactionLoading, 
        getTransactionError       
    } = useSelector((state)=>state.paymentReducers);

    const [Transaction, setTransaction] = useState({
        trx_num:'',
        type:''
    });
    
    useEffect(() => {
        if (isSearch) {
            console.log(Transaction)
            clearTimeout(ref.current)
            ref.current = setTimeout(() => {
                dispatch(getTransaction(Transaction))
            },1000)
            
        }else{
            // Transaction.type=''
            // console.log(Transaction)
            dispatch(getTransaction(Transaction))
        }
    }, [dispatch,Transaction]);

    
    return (
        <div>
            <div className='row'>
            <h1 className='mb-3 ms-3'>Transaction   </h1>
                <div className='col-3 justify-content-end text-end '>
                    <span className='fs-4'>Search</span>
                </div>
                <div className='col-9'>
                {/* <form onSubmit={handleSubmit(test)}> */}
                    <div className='row justify-content-start text-start'>
                        <div className='col-5 '>
                            <input type="text" value={Transaction.trx_num} className="form-control justify-content-end" placeholder="Search By Transaction Number" aria-describedby="addon-wrapping"
                            onChange={(e)=>{
                                setTransaction({...Transaction,trx_num:e.target.value})
                                setisSearch(true)
                            }}
                            />
                        </div>
                        <div className='col-3'>
                            <select className="form-select rounded-3" required value={Transaction.type} onChange={(e)=>{
                                 setTransaction({...Transaction,type:e.target.value})
                                 setisSearch(true)
                                }}>
                                <option className='text-center' value='TP'>TP</option>
                                <option className='text-center' value='TRB'>TRB</option>
                                <option className='text-center' value='TPY'>RPY</option>
                                <option className='text-center' value='RF'>RF</option>
                                <option className='text-center' value='ORM'>ORM</option>
                            </select>
                        </div>
                    </div>
                {/* </form> */}
                </div>
            </div>

            <div className='p-4'>
            <table className="table table-striped w-100 align-middle ">
                    <thead>
                        <tr className='text-center'>
                        <th scope="col">Transaction Number</th>
                        <th scope="col">Trx Date</th>
                        <th scope="col">Debet</th>
                        <th scope="col">Credit</th>
                        <th scope="col">Note</th>
                        <th scope="col">Order Number</th>
                        <th scope="col">Source</th>
                        <th scope="col">Target</th>
                        <th scope="col">Transfer Ref</th>
                        <th scope="col">Type</th>
                        <th scope="col">User</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                    {
                        getTransactionResult ?(
                            getTransactionResult.map((trx)=>{
                                console.log(trx)
                                return(
                                <tr key={trx.patr_id} className='' >
                                    <th scope="row">{trx.patr_trx_number}</th>
                                        <td className='text-center'>
                                        {format(
                                            new Date(trx.patr_modified_date),
                                            'ii LLL YYY'
                                        )}</td>
                                        <td className='text-center p-3'>{formatRupiah(trx.patr_debet)}</td>
                                        <td className='text-center'>{(trx.patr_credit !== 0 ? trx.patr_credit: formatRupiah(trx.patr_credit))}</td>
                                        <td className='text-center'>{trx.patr_note}</td>
                                        <td className='text-center'>{trx.patr_order_number}</td>
                                        <td className='text-center'>{trx.patr_source.usac_account_number}</td>
                                        <td className='text-center'>{trx.patr_target.usac_account_number}</td>
                                        <td className='text-center'>{trx.patr_trx_number_ref}</td>
                                        <td className='text-center'>{trx.patr_type}</td>
                                        <td className='text-center'>{trx.patr_user.user_full_name}</td>
                                </tr>
                                )
                            }
                            )
                        )
                        :getTransactionLoading?(
                            <tr>
                                <td colSpan={12}>
                                    <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                    </div>
                                </td>
                            </tr>
                        ):(
                            <tr>
                            <td colSpan={12} className='text-center fs-3'>{getTransactionError ? getTransactionError : "Data Kosong"}</td>
                            </tr>
                        )

                    }
                    </tbody>
                    </table>
            </div>
        </div>
    );
}

export default Transaction;
