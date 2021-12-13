import React, {useState, useEffect} from 'react';
import axios from "axios";
import edit from './images/edit.svg';
import close from './images/delete.svg';
import './styles/tricks.css';
import ModalUpdate from "./ModalUpdate";


function Tricks() {

    const [modalActive, setModalActive] = useState(false);

    const [tricks, setTricks] = useState([]);
    const [namePatient, setNamePatient] = useState('');
    const [nameDoctor, setNameDoctor] = useState('');
    const [date, setDate] = useState('');
    const [textComplaints, setTextComplaints] = useState('');
    const [modalUpdate, setModalUpdate] = useState(true);

    const [textPatientUpdate, setTextPatientUpdate] = useState(namePatient);
    const [textDoctorUpdate, setTextDoctorUpdate] = useState(nameDoctor);
    const [textDateUpdate, setTexDateUpdate] = useState(date);
    const [textComplaintsUpdate, setTextComplaintsUpdate] = useState(textComplaints);

    useEffect( async() =>{
        await axios.get('http://localhost:4000/allTricks').then(res => {
            setTricks(res.data.data);
        });
    }, [])

    const createNewTrick = async () => {
        console.log('111', namePatient, nameDoctor, date, textComplaints);
        await axios.post('http://localhost:4000/createTrick', {
            namePatient,
            nameDoctor,
            date,
            textComplaints
        }).then(res => {
            setNamePatient('');
            setNameDoctor('');
            setDate('');
            setTextComplaints('');
            setTricks(res.data.data);
            console.log(' setTricks(res.data.data);', res.data.data);
        });


        console.log('looooog ', namePatient)
    }
    const updateTrick = async (value, index) => {
        console.log(value);

        await axios.patch('http://localhost:4000/updateTrick', {
            id: tricks[index].id,
            namePatient: value,
            textDoctor: value,
            date: value,
            textComplaints: value,

        }).then(res => {
            setTricks(res.data.data);
        });
    }

    const deleteTrick = async (index) => {
        await axios.delete('http://localhost4000/deleteTrick?id=' + tricks[index].id, {
        }).then(res => {
            setTricks(res.data.data);
        });
    }

    const change = trick => (event) =>{
        trick.textPatientUpdate = event.target.value;
        return trick;
    }




    console.log('LOOG', tricks);

  return (
<div className="reg-page">
      <main>

          <div className="recording-wrapper">
              <div className="patient-name">
                  <p>Имя:</p>
                  <input type="text"
                         value={namePatient}
                         onChange={(e) => setNamePatient(e.target.value)}
                         required/>
              </div>

              <div className="doctor-name">
                  <p>Врач:</p>
                  <select name="doctor-list"
                          value={nameDoctor}
                          onChange={(e) => setNameDoctor(e.target.value)}>
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
                 <button onClick={() => createNewTrick()}>Добавить</button>
              </div>
          </div>

{/******/}


          {/*<button onClick={() => setModalUpdate(true)}>Open modal window</button>*/}
{/*******/}
          <div className="tricks-list">
                  {
                      tricks.map((trick, index) =>
                          <div key={`trick-${index}`}>

                              <div className="text-trick-patient">{trick.namePatient}</div>
                              {/*<input type='text'*/}
                              {/*       className="text-trick-patient"*/}
                              {/*       placeholder={tricks.namePatient}*/}
                              {/*       */}
                              {/*       /!*onChange={change(trick)}*!/*/}
                              {/*       /!*value={trick.textPatientUpdate}*!/*/}
                              {/*/>*/}

                              <div className="text-trick-doctor">{trick.nameDoctor}</div>
                              {/*<input type='text'*/}
                              {/*       className="text-trick-doctor"*/}
                              {/*       placeholder={tricks.nameDoctor}*/}

                              {/*       onChange={change(trick)}*/}
                              {/*       value={trick.textDoctorUpdate}*/}
                              {/*       disabled={true}*/}
                              {/*/>*/}

                              <div className="text-trick-date">{trick.date}</div>
                              {/*<input type='date'*/}
                              {/*       className="text-trick-date"*/}
                              {/*       placeholder={tricks.date}*/}

                              {/*       onChange={change(trick)}*/}
                              {/*       value={trick.textDateUpdate}*/}
                              {/*       disabled={true}*/}
                              {/*/>*/}

                              <div className="text-trick-complaints">{trick.textComplaints}</div>
                              {/*<input type='text'*/}
                              {/*       className="text-trick-complaints"*/}
                              {/*       placeholder={tricks.textComplaints}*/}

                              {/*       onChange={change(trick)}*/}
                              {/*       value={trick.textComplaintsUpdate}*/}
                              {/*/>*/}

                              <img src={edit}
                                   onClick={() => setModalUpdate(true)}/>
                                   {/*// onClick={() => updateTrick(trick.textPatientUpdate, index)}/>*/}
                              <img src={close}
                                   onClick={() => deleteTrick(index)}/>
                          </div>
                      )
                  }
          </div>

      </main>

    {/*<ModalUpdate active={modalActive} setActive={setModalActive} />*/}

</div>



  );
}

 export default Tricks;
