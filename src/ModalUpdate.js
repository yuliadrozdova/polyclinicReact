import React, {useState} from 'react';
import axios from "axios";
import polic from './images/polic.svg';
import './styles/modalUpdate.css';

const ModalUpdate= ({active, setActive}) => {

    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() =>setActive(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>


            </div>
        </div>

  );
}

 export default ModalUpdate;
