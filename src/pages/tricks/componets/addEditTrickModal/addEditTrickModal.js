import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Modal from "react-modal";
import axios from "axios";

const AddEditTrickModal = ({item, isOpen}) => {
    console.log('logloglogloglog')
    const [values, setValues] = useState({ ...item })

    const updateInput = (e) => {
        const { value, id } = e.target;
        const field = id.replace('modal-', '')
        setValues({ ...values, [field]: value });
    }

    const updateTrick = async () => {
        console.log('updateInput ', updateInput);
        // console.log('looooooog11111 ');




        // // console.log('looooooog00000 ', namePatient);
        // // console.log('looooooog11111 ', updateNamePatient);
        //
        // await axios.put('http://localhost:4000/updateTrick', {
        //     namePatient,
        //     nameDoctor,
        //     date,
        //     textComplaints,
        //     updateNamePatient,
        //     updateNameDoctor,
        //     updateDate,
        //     updateTextComplaints
        // }).then(res => {
        //     setNamePatient(updateNamePatient);
        //     setNameDoctor(updateNameDoctor);
        //     setDate(updateDate);
        //     setTextComplaints(updateTextComplaints);
        //
        // });
        //
        // // await setNamePatient(tricks[index].updateNamePatient);
        // // await setNameDoctor(tricks[index].updateNameDoctor);
        // // await setDate(tricks[index].updateDate);
        // // await setTextComplaints(tricks[index].updateTextComplaints);
    }

    return (
        <Modal className="modal-update" isOpen={isOpen} contentLabel="Example Modal">
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
                    <button className='modal-btn-close' onClick={false}>Cancel</button>
                    <button className='modal-btn-save' onClick={() => updateTrick()}>Save</button>
                </div>
            </div>

        </Modal>
    );
};

AddEditTrickModal.propTypes = {
    item: PropTypes.object,
    isOpen: PropTypes.bool,
};

export default AddEditTrickModal;