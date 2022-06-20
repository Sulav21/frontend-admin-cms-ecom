import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../system-state/systemSlice';

export const MyVerticallyCenteredModal=({children,title,body}) =>{
    const dispatch= useDispatch()
    const {showModal} = useSelector(state=>state.system)
  return (
    <Modal
    onHide={() => dispatch(toggleModal(false))}
     show = {showModal}
     backdrop='static'
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => dispatch(toggleModal(false))}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

//  const App=()=>{
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// }
