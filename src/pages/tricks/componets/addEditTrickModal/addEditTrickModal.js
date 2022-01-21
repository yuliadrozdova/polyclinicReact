import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Modal from "react-modal";
import axios from "axios";

const AddEditTrickModal = ({item, isOpen, onClose, newItem}) => {const [disabledBtn, setDisabledBtn] = useState('disabled');
    const [values, setValues] = useState({ ...item });
    const [loading, setLoading] = useState(false);
   // localStorage.removeItem('token');
    const token = localStorage.getItem('token');

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
    let fullNowDate = '';
    if (nowMonth<=9){
        fullNowDate = nowYear + '-' + 0 + nowMonth + '-' + nowDate;
    }else{
        fullNowDate = nowYear + '-' + nowMonth + '-' + nowDate;
    }
    let fullMaxDate="2023-12-31"

    useEffect( () =>{
        if (values.namePatient !== '' && values.nameDoctor !== '-' && values.nameDoctor !== '' && values.date !== '' && fullNowDate <= values.date  && values.date <= fullMaxDate && values.textComplaints !== ''){
            setDisabledBtn('')
        }else{
            setDisabledBtn('disabled');
        }
    }, [values.namePatient, values.nameDoctor, values.date, values.textComplaints]);

    const updateTrick = async () => {
        await setLoading(true);

        if (values.namePatient !== '' &&
            values.nameDoctor !== '-' &&
            values.nameDoctor !=='' &&
            values.date !== '' &&
            fullNowDate <= values.date &&
            values.date <= fullMaxDate &&
            values.textComplaints !== ''){
            await axios.put('http://localhost:4000/updateTrick', {
                values
            }, { headers: { Authorization: `${token}` }}).then(res => {
                newItem(values);
                setValues('');
            });
        }
        await setLoading(false);
        await onClose(true);
    }

    return (
        <Modal className="modal-update" isOpen={isOpen} contentLabel="Example Modal" onRequestClose={onClose}
               shouldCloseOnOverlayClick={true}>
            {loading && <div className="backgroundLoading">
                <div className="loading"></div>
            </div>}

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
                        <option value="Алиев Мурат Бесланович">Алиев Мурат Бесланович</option>
                        <option value="Воронова Алиса Геннадьевна">Воронова Алиса Геннадьевна</option>
                        <option value="Иванов Алексей Николаевич">Иванов Алексей Николаевич</option>
                        <option value="Остапова Вера Александровна">Остапова Вера Александровна</option>
                    </select>
                </div>

                <div className="date">
                    <p>Дата:</p>
                    <input type="date"
                           id={'modal-date'}
                           max={fullMaxDate}
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
    item: PropTypes.string,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
};

export default AddEditTrickModal;