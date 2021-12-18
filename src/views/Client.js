import React, { useState, useEffect } from "react";

// reactstrap components
import { Card, CardBody, Row, Col } from "reactstrap";
import Calendar from "react-calendar";

import Week from "../components/ScheduleNew/Week";
import { getClientWeek } from "repositories/Client";
import HabitCard from "components/Habit/HabitCard";

import { useParams } from "react-router-dom";
import { FiChevronsDown } from "react-icons/fi";
import { format } from "date-fns";
import { addClientWeek } from "repositories/Client";

function Workout() {
  const [firstDate, setFirstDate] = useState(null);
  const [lastDate, setLastDate] = useState(null);
  const [date, setDate] = useState(null);
  const [displayCalendar, setDisplayCalendar] = useState(false);
  const [data, setData] = useState(null);

  let { id: idParam } = useParams();
  const [id, setId] = useState(idParam);

  function selectDate(value) {
    var firstday = new Date(value.setDate(value.getDate() - value.getDay() + 1));
    var lastday = new Date(value.setDate(value.getDate() - value.getDay() + 7));

    setFirstDate(firstday);
    setLastDate(lastday);
    setDate(value);
    setDisplayCalendar(false);
  }

  function formatDate(dateToFormat) {
    return format(dateToFormat, "MMM. do y");
  }

  async function initClientData() {
    const clientData = await getClientWeek(idParam, new Date());
    setData(clientData);
    setId(idParam)
    selectDate(new Date());
  }

  async function changeDate(){
    if(data)
      await addClientWeek(id, data);
    if(date){
      const clientData = await getClientWeek(idParam, date);
      setData(clientData);  
    }
  }
  async function changeClient(){
    if(data)
      await addClientWeek(id, data);
    if(date){
      const clientData = await getClientWeek(idParam, date);
      setData(clientData);
    }
    setId(idParam)
    selectDate(new Date());
    
  }

  useEffect(() => {
    changeDate();
  }, [date]);

  useEffect(()=>{
    changeClient();
  }, [idParam])

  useEffect(() => {
    initClientData();
  }, [])

  return (
    //this is the user info section on the top left
    <>
      <div className="content">
        <h4 className="text-primary title">
          {firstDate?formatDate(firstDate):""} - {lastDate?formatDate(lastDate):""}
          <FiChevronsDown
            onClick={() => setDisplayCalendar(!displayCalendar)}
          />
        </h4>
        {displayCalendar && (
          <Card>
            <CardBody>
              <Calendar calendarType="ISO 8601" onChange={selectDate} value={date} />
            </CardBody>
          </Card>
        )}
        {data && (
          <>
            <Week
              data={data.fitness}
              setData={(fitnessData) => {
                const tempData = data;
                tempData.fitness = fitnessData;
                setData({...tempData});
              }}
            />
            <Row>
              <Col>
                <HabitCard 
                  data={data.habits}
                  setData={(habitsData)=> {
                    const tempData = data;
                    tempData.habits = habitsData;
                    setData({...tempData});
                  }}
                />
              </Col>
            </Row>
          </>
        )}
      </div>
    </>
  );
}

export default Workout;
