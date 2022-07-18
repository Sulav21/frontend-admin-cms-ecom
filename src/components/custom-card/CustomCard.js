import React from 'react'
import './customCard.css'
import Card from 'react-bootstrap/Card';

export const CustomCard=({title,count})=> {
  return (
    <Card style={{ minwidth: '18rem' }}>
      <Card.Body className='text-center text-light py-3'>
        <Card.Title className='m-5 '>{count}</Card.Title>
        <Card.Text className='fw-bolder fs-2'>
          {title}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
