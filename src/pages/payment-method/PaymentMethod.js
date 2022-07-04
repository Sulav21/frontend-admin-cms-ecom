import React,{useState} from 'react'
import { Button,Row,Col } from 'react-bootstrap'
import { PaymentMethodTable } from '../../components/payment-method-table/PaymentMethodTable'
import { AdminLayout } from '../layouts/AdminLayout'
// import {PaymentMethodForm} from '../../components/payment-method-fomr/PaymentMethodForm'
import { useDispatch } from 'react-redux'
import {toggleModal} from '../../components/system-state/systemSlice'

export const PaymentMethod = () => {
    const dispatch = useDispatch()
    const [showForm, setShowForm] = useState(false)

    const handleOnAddPM=()=>{
      setShowForm(true) 
       dispatch(toggleModal())
    }
  return (
    <AdminLayout>
       {/* {showForm && <PaymentMethodForm/>} */}
        <Row>
            <Col className='mt-4 mb-3'>
            <h1>Payment Methods</h1>
            </Col>
        </Row>
        <Row>
            <Col className='text-end'>
            <Button variant='primary' onClick={handleOnAddPM}>+ Add New Payment Method</Button>
            </Col>
        </Row>
        <hr/>
        <Row>
            <Col className='mt-3'>
            <PaymentMethodTable showForm={showForm} setShowForm={setShowForm}/>
            </Col>
        </Row>
       
    </AdminLayout>
  )
}
