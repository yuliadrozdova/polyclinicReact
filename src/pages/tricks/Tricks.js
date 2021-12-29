import React, {useState, useEffect} from 'react';
import axios from "axios";
import edit from '../../images/edit.svg';
import close from '../../images/delete.svg'
import open_filter from '../../images/open_filter.svg'
import '../../styles/tricks.css';
import '../../styles/modalUpdate.css';
import AddEditTrickModal from "./componets/addEditTrickModal/addEditTrickModal";
import AddDeleteTrickModal from "./componets/addDeleteTrickModal/addDeleteTrickModal";

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

    const [sortTricks, setSortTricks] = useState('none');
    const [sortDirect, setSortDirect] = useState('asc');

    const [startFilterTricks, setStartFilter] = useState('');
    const [endFilterTricks, setEndFilter] = useState('');

    const [disabledBtn, setDisabledBtn] = useState('disabled');

    const [classSort, setClassSort] = useState('hidden');
    const [classFilter, setClassFilter] = useState('hidden');
    const [classFilterMain, setClassFilterMain] = useState('visible');

    useEffect( async() =>{
        await axios.get('http://localhost:4000/allTricks').then(res => {
            let arr = res.data.data;
            arr.forEach(val => {
                val.date = val.date.substring(0,10);
            })
            setTricks(arr);
        });

    }, []);


    useEffect( async() =>{
        if (namePatient !== '' && nameDoctor !== '-' && nameDoctor !== '' && date !== '' && fullNowDate <= date && textComplaints !== ''){
            console.log('enabled')
            setDisabledBtn('')
        }else{
            setDisabledBtn('disabled');
        }
    }, [namePatient, nameDoctor, date, textComplaints]);


    const now = new Date();
    let nowYear = now.getFullYear();
    let nowMonth = now.getMonth() + 1; //+1
    let nowDate = now.getDate();

    let fullNowDate = nowYear + '-' + nowMonth + '-' + nowDate;
    console.log('fullNowDate ', fullNowDate);


    const createNewTrick = async () => {

        if (namePatient !== '' &&
            nameDoctor !== '-' &&
            nameDoctor !=='' &&
            date !== '' &&
            fullNowDate <= date &&
            textComplaints !== ''){
            axios.post('http://localhost:4000/createTrick', {
                namePatient,
                nameDoctor,
                date,
                textComplaints
            }).then(res => {
                setNamePatient('');
                setNameDoctor('');
                setDate('');
                setTextComplaints('');

                const copy = tricks.map(value => value); //изменение копии стейта
                let arr = res.data.data;
                arr.date = arr.date.substring(0,10);
                console.log('arr.date ', arr.date);
                copy.push(arr);
                setTricks(copy);
            });
        }
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


    useEffect(() => {                       //sort
        const copy = tricks.map(value => value);

        switch(sortTricks) {

            case 'none':
                axios.get('http://localhost:4000/allTricks').then(res => {
                    let arr = res.data.data;
                    arr.forEach(val => {
                        val.date = val.date.substring(0,10);
                    })
                    return  setTricks(arr);
                });
                return setClassSort('hidden');

            case 'name':
                setClassSort('visible');
                switch(sortDirect) {
                    case 'asc':
                        copy.sort((a,b) => a.namePatient.localeCompare(b.namePatient));
                        return setTricks(copy);
                    case 'desc':
                        copy.sort((a,b) => b.namePatient.localeCompare(a.namePatient));
                        return setTricks(copy);
                };

            case 'doctor':
                setClassSort('visible');
                switch(sortDirect) {
                    case 'asc':
                        copy.sort((a,b) => a.nameDoctor.localeCompare(b.nameDoctor));
                        return setTricks(copy);
                    case 'desc':
                        copy.sort((a,b) => b.nameDoctor.localeCompare(a.nameDoctor));
                        return setTricks(copy);
                };

            case 'date':
                setClassSort('visible');
                switch(sortDirect) {
                    case 'asc':
                        copy.sort((a,b) => a.date.localeCompare(b.date));
                        return setTricks(copy);
                    case 'desc':
                        copy.sort((a,b) => b.date.localeCompare(a.date));
                        return setTricks(copy);
                };

            default:
                return 'sort default';
        }

    },[sortTricks, sortDirect])



    const openFilter = () => {
        setClassFilter('visible');
        setClassFilterMain('hidden');
    }
    const closeFilter = async () => {
        setClassFilter('hidden');
        setClassFilterMain('visible');

        await axios.get('http://localhost:4000/allTricks').then(res => {
            let arr = res.data.data;
            arr.forEach(val => {
                val.date = val.date.substring(0,10);
            })
            setTricks(arr);
        });
    }


    const filterTricks = async (startDate, endDate) => {
        console.log('start ', startDate);
        let newArray = [];
        const copy = [];

        await axios.get('http://localhost:4000/allTricks').then(res => {
           newArray = res.data.data;
            console.log('newArray1 ', newArray);
            newArray.forEach(val => {
                val.date = val.date.substring(0,10);
            })
            console.log('newArray2 ', newArray);
        });

        console.log('end ', endDate);
        console.log('newArray ', newArray);

        if (startDate === '' && endDate  === ''){
            console.log('111');
            return  setTricks(newArray);

        } else if (startDate === '' && endDate !== ''){
            console.log('222');
            newArray.forEach(value => {
                if (value.date <= endDate ){

                    copy.push(value);
                }
            })
            return setTricks(copy);

        } else if (startDate !== '' && endDate === ''){
            console.log('333');
            newArray.forEach(value => {
                if (value.date >= startDate ){

                    copy.push(value);
                }
            })
            return setTricks(copy);

        } else if (startDate !== '' && endDate !== ''){
            console.log('444');
            newArray.forEach(value => {
                if (value.date >= startDate && value.date <= endDate){

                    copy.push(value);
                }
            })
            return setTricks(copy);
        }
    }







    console.log('LOOG', tricks);




    return (

        <div className="tricks-page">
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
                    <div className="sort">
                        <div className="sort-wrap">
                            <div>Сортировать по:</div>
                            <div className="sort-input">
                                <select name="sort-list"
                                        value={sortTricks}
                                        onChange={(e) => setSortTricks(e.target.value)}>
                                    <option value="none"></option>
                                    <option value="name">Имя</option>
                                    <option value="doctor">Врач</option>
                                    <option value="date">Дата</option>
                                </select>
                            </div>
                        </div>

                        <div className={classSort}>
                            <div>Сортировать по:</div>
                            <div className="sort-input">
                                <select name="sort-list"
                                        value={sortDirect}
                                        onChange={(e) => setSortDirect(e.target.value)}>
                                    <option value="asc">По возрастанию</option>
                                    <option value="desc">По убыванию</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/*********************/}

                    
                    <div className="filter-main">
                        
                        <div className={classFilterMain}>
                            <div className="filter-main-wrap">
                                <div>Добавить фильтр по дате:</div>
                                <img className="open-filter-image" src={open_filter}
                                     onClick={openFilter}/>
                            </div>
                        </div>









                            <div className={classFilter}>
                                <div className="filter">
                                <div className="filter-wrap">
                                    <div className="start-filter-input">
                                        <div className="date">
                                            <p>с:</p>
                                            <input type="date"
                                                   value={startFilterTricks}
                                                   onChange={(e) => setStartFilter(e.target.value)}
                                                   required/>
                                        </div>
                                    </div>
                                </div>

                                <div className="end-filter">
                                    <div className="end-filter-input">
                                        <div className="date">
                                            <p>по:</p>
                                            <input type="date"
                                                   value={endFilterTricks}
                                                   onChange={(e) => setEndFilter(e.target.value)}
                                                   required/>
                                        </div>
                                    </div>
                                </div>
                                <button  onClick={() => filterTricks(startFilterTricks, endFilterTricks)}>Фильтровать</button>
                                <img className="text-trick-btn-delete" src={close}
                                     onClick={closeFilter}/>
                            </div>
                        </div>

                    </div>
                    








<div className='tricks-list-wrap'>
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
