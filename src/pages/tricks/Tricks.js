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
    // let navigate = useNavigate();

    const [tricks, setTricks] = useState([]);
    const [namePatient, setNamePatient] = useState('');
    const [nameDoctor, setNameDoctor] = useState('');
    const [date, setDate] = useState('');
    const [textComplaints, setTextComplaints] = useState('');

    const [namePatientDirty, setNamePatientDirty] = useState(false);
    const [nameDoctorDirty, setNameDoctorDirty] = useState(false);
    const [dateDirty1, setDateDirty1] = useState(false);
    const [dateDirty2, setDateDirty2] = useState(false);
    const [textComplaintsDirty, setTextComplaintsDirty] = useState(false);
    //const [namePatientError, setNamePatientError] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [itemModal, setItemModal] = useState('');
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [indexModal, setIndexModal] = useState('');

    const [disabledBtn, setDisabledBtn] = useState('disabled');
    const [loading, setLoading] = useState(false);


    // let request;

    // axios.interceptors.request.use(async (req) => {
    //     req.headers.authorization = await localStorage.getItem('token');
    //     if (req.url === 'http://localhost:3000/refreshToken') return req;
    //     request = req;
    //     return req;
    // });

    // axios.interceptors.response.use((res) => res, async (err) => {
    //     if (err.response.status === 401) {
    //         const refTokenSend = {
    //             refToken: localStorage.getItem('refToken'),
    //         };
    //         await axios.post('http://localhost:3000/refreshToken', refTokenSend)
    //             .then((response) => {
    //                 const { token, refToken } = response.data;
    //                 localStorage.setItem('token', token);
    //                 localStorage.setItem('refToken', refToken);
    //                 return 0;
    //             });
    //
    //         request.authorization = localStorage.getItem('token');
    //         return axios.request(request);
    //     }
    //
    //     if (err.response.status === 403) {
    //         localStorage.clear();
    //         window.location.href = '/login';
    //         return 0;
    //     }
    //     return 0;
    // });




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

    const token = localStorage.getItem('token');

    useEffect( async() =>{
        await setLoading(true);

        await axios.get('http://localhost:4000/allTricks/', { headers: { Authorization: `${token}` }}).then(res => {
            console.log(token);
            let arr = res.data.data;
            arr.forEach(val => {
                val.date = val.date.substring(0,10);
            })
            setTricks(arr);
        });
        console.log('2222222222222')
        await setLoading(false);
    }, []);

    useEffect(   () =>{        //disabled button with create trick
        if(namePatient.trim() !== ''){
            setNamePatientDirty(false);
            setDisabledBtn('');
        }
        if(nameDoctor !== '-' || nameDoctor !==''){
            setNameDoctorDirty(false);
            setDisabledBtn('');
        }
        if(date !== ''){
            setDateDirty1(false);
            setDisabledBtn('');
        }
        if(fullNowDate <= date && date <= fullMaxDate){
            setDateDirty2(false);
            setDisabledBtn('');
        }
        if(textComplaints.trim() !== ''){
            setTextComplaintsDirty(false);
            setDisabledBtn('');
        }


        if(namePatient.trim() === ''){
            setNamePatientDirty(true);
            setDisabledBtn('disabled');
        }
        if(nameDoctor === '-' || nameDoctor ===''){
            setNameDoctorDirty(true);
            setDisabledBtn('disabled');
        }

        if(fullNowDate >= date || date >= fullMaxDate){
            setDateDirty2(true);
            setDateDirty1(false);
            setDisabledBtn('disabled');
        }
        if(date === ''){

            setDateDirty1(true);
            setDateDirty2(false);

            setDisabledBtn('disabled');
        }
        if(textComplaints.trim() === ''){
            setTextComplaintsDirty(true);
            setDisabledBtn('disabled');
        }
    }, [namePatient, nameDoctor, date, textComplaints]);


    const createTrickAxios = async (namePatient, nameDoctor, date, textComplaints) => {
        console.log('*', namePatient, 111111);
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
    const createNewTrick = async () => {
        setLoading(true);

        if (namePatient.trim() !== '' &&
            nameDoctor !== '-' &&
            nameDoctor !=='' &&
            date !== '' &&
            fullNowDate <= date &&
            date <= fullMaxDate &&
            textComplaints.trim() !== ''){
            createTrickAxios(namePatient.trim(), nameDoctor, date, textComplaints.trim());
        }
        await setLoading(false);

        setNamePatientDirty(false);
        setNameDoctorDirty(false);
        setDateDirty1(false);
        setDateDirty2(false);
        setTextComplaintsDirty(false);
    }

    const editTrick = async (namePatient, nameDoctor, date, textComplaints, id) => {

        await tricks.forEach(value => {
            if (value._id === id){
                console.log('0000')
                value.namePatient = namePatient;
                console.log('value.namePatient ', value.namePatient)
                value.nameDoctor = nameDoctor;
                value.date = date;
                value.textComplaints = textComplaints;
                console.log('value', value)
            }
        })
        await setTricks(tricks);
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

    const sortTricks = (arr) => {
        setTricks(arr);
    }

    const filterTricks = (arr) => {
        setTricks(arr);
    }

    // const exitAccountClick = async () => {
    //     if(localStorage.getItem('token')){
    //         localStorage.removeItem('token');
    //     }
    //
    //     await setLoading(true);
    //     await navigate("/");
    //     await setLoading(false);
    // }

    // console.log('LOOG', tricks);

    return (
        <div className="tricks-page">
            {loading && <div className="backgroundLoading">
                <div className="loading"></div>
            </div>}

            {/*<div className="exit-btn">*/}
            {/*    <button className='exitAccount' onClick={exitAccountClick}>Выход</button>*/}
            {/*</div>*/}

            <main>
                <div className="recording-wrapper">
                    <div className="patient-name">
                        <p>Имя:</p>
                        <input type="text"
                               value={namePatient}
                               onChange={(e) => setNamePatient(e.target.value)}
                               required/>
                        {(namePatientDirty) && <div style={{color: 'red'}}>Введите имя пациента</div>}
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
                            <option value="Остапова Вера Александровна">Остапова Вера Александровна</option>
                        </select>
                        {(nameDoctorDirty) && <div style={{color: 'red'}}>Введите имя врача</div>}
                    </div>

                    <div className="date">
                        <p>Дата:</p>
                        <input type="date"
                               max={fullMaxDate}
                               value={date}
                               onChange={(e) => setDate(e.target.value)}
                               required/>
                        {(dateDirty1) && <div style={{color: 'red'}}>Введите дату приема</div>}
                        {(dateDirty2) && <div style={{color: 'red'}}>Дата не может быть меньше {fullNowDate} или больше {fullMaxDate}</div>}
                    </div>

                    <div className="complaints">
                        <p>Жалобы:</p>
                        <input type="text"
                               value={textComplaints}
                               onChange={(e) => setTextComplaints(e.target.value)}
                               required/>
                        {(textComplaintsDirty) && <div style={{color: 'red'}}>Введите жалобы пациента</div>}
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
                                <img className="text-trick-btn-delete" src={close} alt="button open modal delete"
                                     onClick={() => openModalDelete(index)}/>
                                <img className="text-trick-btn-update" src={edit} alt="button update trick"
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