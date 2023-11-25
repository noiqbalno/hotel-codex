import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getBank, updateBank } from '../../../../actions/paymentAction';
import Swal from 'sweetalert2'

const ModalEditBank = (props) => {
    const {
        showModalBank,
        handleCloseEditBank,
        handleSubmit,
        Bank,
        setBank,
        resetField,
        Keyword
    } = props

    const dispatch = useDispatch();
    const [isUpdate, setisUpdate] = useState(false);

    const {updateBankResult, updateBankError} = useSelector(
        (state)=> state.paymentReducers
    )

    const editBank = (data)=>{
        data = Bank;
        setisUpdate(true);
        dispatch(updateBank(data))
    }
   useEffect(() => {
        if(isUpdate){
            if(updateBankResult){
                Swal.fire({
                    title: updateBankResult,
                    text: 'Bank Berhasil Diubah!',
                    icon: 'success'
                }).then(()=>{
                  handleCloseEditBank(false)
                  resetField('bank_code')
                  resetField('bank_name')
                  dispatch(getBank({bank_name:Keyword}))
                })
            }
            else if(updateBankError){
                Swal.fire({
                    title: updateBankError,
                    text: 'Gagal Mengubah Data!',
                    icon: 'error'
                })
            }
        }

   }, [updateBankResult,updateBankError]);
    return (
        <Modal show={showModalBank} onHide={handleCloseEditBank}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(editBank)}>
        <Modal.Body>
          <div className="row g-3 align-items-center">
              <div className="col-4">
                  <label  className="col-form-label">Bank Code</label>
              </div>
              <div className="col-6">                                               
                  <input type="text" value={Bank.bank_code} id="bankcode" className="form-control" onChange={(e)=>setBank({...Bank,bank_code:e.target.value})} required/>
              </div>
              <div className="col-4">
                  <label className="col-form-label">Bank Name</label>
              </div>
              <div className="col-6">
                  <input value={Bank.bank_name} type="text" id="bankcode" className="form-control" onChange={(e)=>setBank({...Bank,bank_name:e.target.value})} required/>
              </div>
          </div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditBank}>
            Close
          </Button>
          <Button variant="primary" type='submit'>
            Save Changes
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
    );
}

export default ModalEditBank;
