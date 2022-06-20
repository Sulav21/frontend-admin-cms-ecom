import React from 'react'
import {Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ProductTable } from '../../components/product-table/ProductTable'
import { AdminLayout } from '../layouts/AdminLayout'

export const Product = () => {
  return (
    <AdminLayout>
        <h1 className='text-center mt-2'>Products</h1>
        <div className="text-end">
            <Link to='/product/new'>
            <Button variant='primary'><i class="fa-solid fa-plus"></i> Add new product</Button>
            </Link>
            </div>
            <hr/>
            <div className="product-list">
           <ProductTable/>
            </div>
        
    </AdminLayout> 
  )
}
