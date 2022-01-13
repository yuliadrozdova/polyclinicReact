import React, {useState, useEffect} from 'react';
import axios from "axios";
import edit from '../../images/edit.svg';
import close from '../../images/delete.svg'
import '../../styles/tricks.css';
import '../../styles/modalUpdate.css';
import AddEditTrickModal from "./componets/addEditTrickModal/addEditTrickModal";
import AddDeleteTrickModal from "./componets/addDeleteTrickModal/addDeleteTrickModal";
import SortingTricks from "./componets/sortingTricks/sortingTricks";
import FilterTricks from "./componets/filterTricks/filterTricks";

function Tricks() {
    const [tricks, setTricks] = useState([]);
    const [namePatient, setNamePatient] = useState('');
    const [nameDoctor, setNameDoctor] = useState('');
    const [date, setDate] = useState('');
    const [textComplaints, setTextComplaints] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [itemModal, setItemModal] = useState('');

    const [showModalDelete, setShowModalDelete] = useState(false);
    const [indexModal, setIndexModal] = useState('');

    const [disabledBtn, setDisabledBtn] = useState('disabled');
    const [loading, setLoading] = useState(false);

    let nowYear = new Date().getFullYear();
    let nowMonth = new Date().getMonth() + 1;
    let nowDate = new Date().getDate();
    let fullNowDate = '';
    if (nowMonth<=9){
        fullNowDate = nowYear + '-' + '0' + nowMonth + '-' + nowDate;
    }else{
        fullNowDate = nowYear + '-' + nowMonth + '-' + nowDate;
    }
    //
    // if(localStorage.getItem('token')){
    //     localStorage.removeItem('token');
    // }
    const token = localStorage.getItem('token');

    useEffect( async() =>{
        await setLoading(true);

        await axios.get('http://localhost:4000/allTricks/', { headers: { Authorization: `${token}` }}).then(res => {
            let arr = res.data.data;
            arr.forEach(val => {
                val.date = val.date.substring(0,10);
            })
            setTricks(arr);
        });
        await setLoading(false);
    }, []);

    useEffect(   () =>{        //disabled button with create trick
       console.log('1111 ', date);

        if (namePatient !== '' && nameDoctor !== '-' && nameDoctor !== '' && date !== '' && fullNowDate <= date && textComplaints !== ''){
            console.log('!!! ', namePatient);
            setDisabledBtn('')
        }else{
            setDisabledBtn('disabled');
        }
    }, [namePatient, nameDoctor, date, textComplaints]);


    const createNewTrick = async () => {
        await setLoading(true);

        if (namePatient !== '' &&
            nameDoctor !== '-' &&
            nameDoctor !=='' &&
            date !== '' &&
            fullNowDate <= date &&
            textComplaints !== ''){
            await axios.post('http://localhost:4000/createTrick', {
                namePatient,
                nameDoctor,
                date,
                textComplaints
            }, { headers: { Authorization: `${token}` }}).then(res => {
                setNamePatient('');
                setNameDoctor('');
                setDate('');
                setTextComplaints('');

                const copy = tricks.map(value => value); //изменение копии стейта
                let arr = res.data.data;
                arr.date = arr.date.substring(0,10);

                copy.push(arr);
                setTricks(copy);
            });
        }
        await setLoading(false);
    }

    const editTrick = (item) => {
        tricks.forEach(value => {
            if (value._id === item._id){
                value.namePatient = item.namePatient;
                value.nameDoctor = item.nameDoctor;
                value.date = item.date;
                value.textComplaints = item.textComplaints;
            }
        })
        setTricks(tricks);
    }

    const deleteTrick = (item) => {
        const copy = tricks.map(value => value); //изменение копии стейта
        copy.forEach((val, ind) => {
            if (item._id === val._id){
                copy.splice(ind, 1);
            }
        })
        setTricks(copy);
    }

    const openModalUpdate = async (index) => {
        setItemModal(tricks[index]);
        setShowModal(true);
    }

    const openModalDelete = async (index) => {
        setIndexModal(tricks[index]);
        setShowModalDelete(true);
    }
    const onCloseUpdate = () => {
        setShowModal(false)
    }

    const onCloseDelete = () => {
        setShowModalDelete(false)
    }

    const change = trick => (event) =>{
        trick.textPatientUpdate = event.target.value;
        return trick;
    }

    const sortTricks = (arr) => {
        setTricks(arr);
    }

    const filterTricks = (arr) => {
        setTricks(arr);
    }

    console.log('LOOG', tricks);

    return (
        <div className="tricks-page">
            {loading && <div className="backgroundLoading">
                <div className="loading"></div>
            </div>}
            <main>
                <div className="recording-wrapper">
                    <div className="patient-name">
                        <p>Имя:</p>
                        <input type="text"
                               value={namePatient}
                               onChange={(e) => setNamePatient(e.target.value)}
                               required/>
                    </div>

                    {/*есть такая штука как <datalist>, может она подойдет лучше*/}
                    <div className="doctor-name">
                        <p>Врач:</p>
                        <select name="doctor-list"
                                value={nameDoctor}
                                onChange={(e) => setNameDoctor(e.target.value)}>
                            <option>-</option>
                            <option value="Алиев Мурат Бесланович">Алиев Мурат Бесланович</option>
                            <option value="Воронова Алиса Геннадьевна">Воронова Алиса Геннадьевна</option>
                            <option value="Иванов Алексей Николаевич">Иванов Алексей Николаевич</option>
                            <option value="Остапова Валентина Александровна">Остапова Валентина Александровна</option>
                        </select>
                    </div>

                    <div className="date">
                        <p>Дата:</p>
                        <input type="date"
                               value={date}
                               onChange={(e) => setDate(e.target.value)}
                               required/>
                    </div>

                    <div className="complaints">
                        <p>Жалобы:</p>
                        <input type="text"
                               value={textComplaints}
                               onChange={(e) => setTextComplaints(e.target.value)}
                               required/>
                    </div>

                    <div className="recording-btn">
                        <button disabled={disabledBtn} onClick={createNewTrick}>Добавить</button>
                    </div>
                </div>

                <div className="tricks-list">

                    <SortingTricks tricks={tricks}
                                   setTricks={sortTricks}/>
                    <FilterTricks setTricks={filterTricks}/>

                <div className='tricks-list-wrap'>
                    <div className="trick-wrap bold">
                        <div className="text-trick-patient">Имя</div>
                        <div className="text-trick-doctor">Врач</div>
                        <div className="text-trick-date">Дата</div>
                        <div className="text-trick-complaints">Жалобы</div>
                        <div className="text-trick-btn"></div>
                    </div>

                    {tricks.map((trick, index) =>
                        <div className="trick-wrap" key={`trick-${index}`}>
                            <div className="text-trick-patient">{trick.namePatient}</div>
                            <div className="text-trick-doctor">{trick.nameDoctor}</div>
                            <div className="text-trick-date">{trick.date}</div>
                            <div className="text-trick-complaints">{trick.textComplaints}</div>

                            <div className="text-trick-btn">
                                <img className="text-trick-btn-delete" src={close}
                                     onClick={() => openModalDelete(index)}/>
                                <img className="text-trick-btn-update" src={edit}
                                     onClick={() => openModalUpdate(index) }/>
                            </div>
                        </div>
                    )
                    }
                </div>
                </div>
            </main>
            <AddEditTrickModal item={itemModal}
                               onClose={onCloseUpdate}
                               isOpen={showModal}
                               newItem={editTrick}/>

            <AddDeleteTrickModal item={indexModal}
                                 onClose={onCloseDelete}
                                 isOpen={showModalDelete}
                                 newTricks={deleteTrick}/>
        </div>
    );
}

export default Tricks;