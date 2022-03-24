import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Modal from "react-modal";
import axios from "axios";

const AddDeleteTrickModal = ({item, isOpen, onClose, newTricks}) => {
    const [loading, setLoading] = useState(false);
   // localStorage.removeItem('token');
    const token = localStorage.getItem('token');

    const deleteTrick = async (item) => {
        await setLoading(true);
        await axios.delete(`http://localhost:4000/deleteTrick/${item._id}`,
            { headers: { Authorization: `${token}` }}).then(res => {
            newTricks(item);
        });
        await setLoading(false);
        await onClose(true);
    }

    return (
        <Modal className="modal-update" isOpen={isOpen} contentLabel="Example Modal" onRequestClose={onClose}
               shouldCloseOnOverlayClick={true}>
            {loading && <div className="backgroundLoading">
                <div className="loading"/>
            </div>}
            <div className="modal-header">Удалить прием</div>
            <div className="modal-delete-text">Вы действительно хотите удалить прием?</div>

            <div className="modal-btn-footer">
                <button className='modal-btn-close' onClick={onClose}>Cancel</button>
                <button className='modal-btn-save' onClick={() => deleteTrick(item)}>Delete</button>
            </div>
        </Modal>
    );
};

AddDeleteTrickModal.propTypes = {
    item: PropTypes.string,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
};

export default AddDeleteTrickModal;