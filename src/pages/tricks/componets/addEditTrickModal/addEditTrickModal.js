import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Modal from "react-modal";
import axios from "axios";

const AddEditTrickModal = ({item, isOpen, onClose, newItem}) => {
    const [disabledBtn, setDisabledBtn] = useState('disabled');
    const [values, setValues] = useState({ ...item });

    useEffect(() => {                                                  //проверяет обновление item
        setValues({ ...item });
    },[item])

    const updateInput = (e) => {
        const {value, id} = e.target;
        const field = id.replace('modal-', '')
        setValues({ ...values, [field]: value });
    }
    let nowYear = new Date().getFullYear();
    let nowMonth = new Date().getMonth() + 1;
    let nowDate = new Date().getDate();
    let fullNowDate = nowYear + '-' + nowMonth + '-' + nowDate;

    useEffect( async() =>{
        if (values.namePatient !== '' && values.nameDoctor !== '-' && values.nameDoctor !== '' && values.date !== '' && fullNowDate <= values.date && values.textComplaints !== ''){
            setDisabledBtn('')
        }else{
            setDisabledBtn('disabled');
        }
    }, [values.namePatient, values.nameDoctor, values.date, values.textComplaints]);

    const updateTrick = async () => {
        if (values.namePatient !== '' &&
            values.nameDoctor !== '-' &&
            values.nameDoctor !=='' &&
            values.date !== '' &&
            fullNowDate <= values.date &&
            values.textComplaints !== ''){
            await axios.put('http://localhost:4000/updateTrick', {
                values,                                                        //не правильно
            }).then(res => {
                newItem(values);
                setValues('');
            });
        }


        await onClose(true);
    }

    return (
        <Modal className="modal-update" isOpen={isOpen} contentLabel="Example Modal" onRequestClose={onClose}
               shouldCloseOnOverlayClick={true}>
            <div className="modal-header">Изменить прием</div>

            <div className="modal-wrapper">
                <div className="patient-name">
                    <p>Имя:</p>
                    <input type="text"
                           id={'modal-namePatient'}
                           value={values.namePatient}
                           onChange={updateInput}
                           required/>
                </div>

                <div className="doctor-name">
                    <p>Врач:</p>
                    <select name="doctor-list"
                            id={'modal-nameDoctor'}
                            value={values.nameDoctor}
                            onChange={updateInput}>
                        <option>-</option>
                        <option value="Иванов Алексей Николаевич">Иванов Алексей Николаевич</option>
                        <option value="Остапова Валентина Александровна">Остапова Валентина Александровна</option>
                    </select>
                </div>

                <div className="date">
                    <p>Дата:</p>
                    <input type="date"
                           id={'modal-date'}
                           value={values.date}
                           onChange={updateInput}
                           required/>
                </div>

                <div className="complaints">
                    <p>Жалобы:</p>
                    <input type="text"
                           id={'modal-textComplaints'}
                           value={values.textComplaints}
                           onChange={updateInput}
                           required/>
                </div>

                <div className="modal-btn-footer">
                    <button className='modal-btn-close' onClick={onClose}>Cancel</button>
                    <button className='modal-btn-save' disabled={disabledBtn} onClick={updateTrick}>Save</button>
                </div>
            </div>

        </Modal>
    );
};

AddEditTrickModal.propTypes = {
    item: PropTypes.object,
    isOpen: PropTypes.bool,
    onClose: PropTypes.bool,
};

export default AddEditTrickModal;