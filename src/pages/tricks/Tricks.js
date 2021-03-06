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
// let request;
function Tricks() {
    const [tricks, setTricks] = useState([]);
    const [namePatient, setNamePatient] = useState('');
    const [nameDoctor, setNameDoctor] = useState('');
    const [date, setDate] = useState('');
    const [textComplaints, setTextComplaints] = useState('');
    const [dateDirty1, setDateDirty1] = useState(false);
    const [dateDirty2, setDateDirty2] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [itemModal, setItemModal] = useState('');
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [indexModal, setIndexModal] = useState('');
    const [disabledBtn, setDisabledBtn] = useState('disabled');
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');
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

    // axios.interceptors.request.use(async (req) => {
    //     function fetchData() { req.headers.authorization = token }
    //     await fetchData();
    //     if (req.url === 'http://localhost:4000/refreshToken') return req;
    //     request = req;
    //     return req;
    // });
    //
    // axios.interceptors.response.use((res) => {
    //     return res
    // }, async (err) => {
    //     if(err.response){
    //         if (err?.response?.status === 401) {
    //             const refTokenSend = localStorage.getItem('refToken');
    //             await axios.post('http://localhost:4000/refreshToken', {},{headers: {Authorization: `${refTokenSend}`}})
    //                 .then((response) => {
    //                     const { token, refToken } = response.data;
    //                     localStorage.setItem('token', token);
    //                     localStorage.setItem('refToken', refToken);
    //                     return 0;
    //                 });
    //
    //             request.authorization = localStorage.getItem('token');
    //             return axios.request(request);
    //         }
    //
    //         if (err.response.status === 403) {
    //             localStorage.clear();
    //             window.location.href = '/';
    //             return 0;
    //         }
    //         if (err.response.status === 500) {
    //             console.log('================')
    //             localStorage.clear();
    //             window.location.href = '/';
    //             return 0;
    //         }
    //     }
    //     return 0;
    //
    // });

    useEffect( () =>{
        async function fetchData() {
            if (token) {
                await setLoading(true);
                await axios.get('http://localhost:4000/allTricks/', {headers: {'Authorization': `${token}`}}).then(res => {
                    let arr = res.data.data;
                    arr?.forEach(val => {
                        val.date = val.date.substring(0, 10);
                    })
                    setTricks(arr);
                }).catch(err => console.error(err));

                await setLoading(false);
            }
        }
        fetchData();
    }, []);

    useEffect(() =>{        //disabled button with create trick
        if (namePatient.trim() !== '' &&
            nameDoctor !== '-' &&
            nameDoctor !=='' &&
            date !== '' &&
            textComplaints.trim() !== ''){
                setDisabledBtn('');
                setDateDirty2(false);
                setDateDirty1(false);
        }else{
            setDisabledBtn('disabled');
        }
    }, [namePatient, nameDoctor, date, textComplaints]);

    const createTrickAxios = async (namePatient, nameDoctor, date, textComplaints) => {
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

            try{
                if(res?.data?.data){
                    const copy = tricks?.map(value => value); //?????????????????? ?????????? ????????????
                    let arr = res.data.data;
                    arr.date = arr.date.substring(0,10);
                    copy.push(arr);
                    setTricks(copy);
                }
                setDateDirty1(false);
                setDateDirty2(false);
            }catch (err){
                console.error('ERROR CREATE TRICK:', err)
            }
        }).catch(err => console.error(err));
    }

    const createNewTrick = async () => {
        if(fullNowDate > date || date >= fullMaxDate){
            setDateDirty2(true);
            setDateDirty1(false);
        }else{
            setDateDirty2(false)
        }
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
    }

    const editTrick = async (namePatient, nameDoctor, date, textComplaints, id) => {
        const copy = tricks.map(value => value);
        await copy.forEach(value => {
            if (value._id === id){
                value.namePatient = namePatient;
                value.nameDoctor = nameDoctor;
                value.date = date;
                value.textComplaints = textComplaints;
            }
        });
        setTricks(copy);
    }

    const deleteTrick = (item) => {
        const copy = tricks.map(value => value);
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

    return (
        <div className="tricks-page">
            {loading && <div className="backgroundLoading">
                <div className="loading"></div>
            </div>}

            <main>
                <div className="recording-wrapper">
                    <div className="patient-name">
                        <p>??????:</p>
                        <input type="text"
                               value={namePatient}
                               onChange={(e) => setNamePatient(e.target.value)}
                               required/>
                    </div>

                    <div className="doctor-name">
                        <p>????????:</p>
                        <select name="doctor-list"
                                value={nameDoctor}
                                onChange={(e) => setNameDoctor(e.target.value)}>
                            <option>-</option>
                            <option value="?????????? ?????????? ????????????????????">?????????? ?????????? ????????????????????</option>
                            <option value="???????????????? ?????????? ??????????????????????">???????????????? ?????????? ??????????????????????</option>
                            <option value="???????????? ?????????????? ????????????????????">???????????? ?????????????? ????????????????????</option>
                            <option value="???????????????? ???????? ??????????????????????????">???????????????? ???????? ??????????????????????????</option>
                        </select>
                    </div>

                    <div className="date">
                        <p>????????:</p>
                        <input type="date"
                               max={fullMaxDate}
                               value={date}
                               onChange={(e) => setDate(e.target.value)}
                               required/>
                        {(dateDirty1) && <div style={{color: 'red'}}>?????????????? ???????? ????????????</div>}
                        {(dateDirty2) && <div style={{color: 'red'}}>???????? ???? ?????????? ???????? ???????????? {fullNowDate} ?????? ???????????? {fullMaxDate}</div>}
                    </div>

                    <div className="complaints">
                        <p>????????????:</p>
                        <input type="text"
                               value={textComplaints}
                               onChange={(e) => setTextComplaints(e.target.value)}
                               required/>
                    </div>

                    <div className="recording-btn">
                        <button disabled={disabledBtn} onClick={createNewTrick}>????????????????</button>
                    </div>
                </div>

                <div className="tricks-list">
                    <SortingTricks tricks={tricks}
                                   setTricks={sortTricks}/>
                    <FilterTricks setTricks={filterTricks}/>

                <div className='tricks-list-wrap'>
                    <div className="trick-wrap bold">
                        <div className="text-trick-patient">??????</div>
                        <div className="text-trick-doctor">????????</div>
                        <div className="text-trick-date">????????</div>
                        <div className="text-trick-complaints">????????????</div>
                        <div className="text-trick-btn"></div>
                    </div>

                    {tricks?.map((trick, index) =>
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