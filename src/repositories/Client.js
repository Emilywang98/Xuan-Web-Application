import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDocs, addDoc, collection, setDoc } from 'firebase/firestore';
import firebaseConfig from "../firebase.json";

import { startOfWeek, endOfWeek, addDays, getDay, format, parse } from 'date-fns';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let clients = null;


const getClients = async() =>{
    if(clients == null)
        await _initClients();
    return clients;
};

const getClient= async (id)=>{
    const clients = await getClients();
    const client = clients.filter(c => c.key === id)[0];
    return client;
}


const addClientWeek = async(clientId, week) =>{
    console.log("addClientWeek")
    console.log(clientId);
    const weekSerialized = _serializeClient(week);

    const weekStartFormatted = Object.keys(weekSerialized)[0];
    Object.keys(weekSerialized).forEach(async (date)=>{
        const dateData = weekSerialized[date];
        const dateDoc = doc(db, `users/${clientId}/W${weekStartFormatted}`, date);
        try {
            await setDoc(dateDoc, {
                fitness : dateData.fitness,
                habits : dateData.habits,
            })
        }catch(e){
            console.log(e)
        }
        
    });
};


const getClientWeek = async(clientId, date) =>{
    console.log("getClientWeek")
    console.log(date)
    const weekStart = format(startOfWeek(date, {weekStartsOn: 1}), "yyyy-MM-dd");
    console.log(weekStart)
    try{
        const weekSnapShot = await getDocs(collection(db, `users/${clientId}/W${weekStart}`));
        return weekSnapShot.empty? _generateEmptyWeek(date) : _deserializeClient(weekSnapShot);
    }catch(e){
        console.error('Client Week Error: ', e);
        return;
    }
};

const _initClients = async() =>{
    const allClientCollection = collection(db, 'users');
    const clientSnapshot = await getDocs(allClientCollection);
    const clientList = clientSnapshot.docs.map(doc => {return {...doc.data(), key:doc.id}});
    clients = clientList;
    _sortClients();
};

const _sortClients = () =>{
    clients.sort((a, b)=> (a.firstName > b.firstName) ? 1 : -1);
}

const _generateEmptyWeek = (date) =>{
    let emptyWeek = {
        habits: {},
        fitness: {
            entries : {},
            sections: {},
            days: {},
            dayOrder: []
        }
    };
    const weekStart = startOfWeek(date, {weekStartsOn: 1});
    const weekEnd = endOfWeek(date, {weekStartsOn: 1});
    for(let day = weekStart; day <= weekEnd; day = addDays(day, 1)){
        const dateFormatted = format(day, 'yyyy-MM-dd');
        emptyWeek.fitness.days[dateFormatted] = {
            id: dateFormatted,
            title: format(day, 'E'),
            sectionIds:[]
        }
        emptyWeek.fitness.dayOrder.push(dateFormatted);
        emptyWeek.habits[dateFormatted] = []
    }
    return emptyWeek;
}

const _deserializeClient = (weekSnapShot) => {
    const weekDeserialized = {
        habits: {},
        fitness: {
            entries : {},
            sections: {},
            days: {},
            dayOrder: []
        }
    };
    weekSnapShot.docs.forEach(doc => {
        const date = doc.id;
        const dateData = doc.data();

        weekDeserialized.fitness.days[date] = {
            id: date,
            title: format(new Date(date.replace(/-/g, '\/')), 'E'),
            sectionIds:[]
        }
        weekDeserialized.fitness.dayOrder.push(date);

        dateData.fitness.forEach(section=>{
            weekDeserialized.fitness.days[date].sectionIds.push(section.id)
            weekDeserialized.fitness.sections[section.id] = {
                title : section.title,
                id: section.id,
                entryIds : []
            }
            section.entries.forEach(entry=>{
                weekDeserialized.fitness.sections[section.id].entryIds.push(entry.id)
                weekDeserialized.fitness.entries[entry.id] = {
                    ...entry
                }
            })
        })
        weekDeserialized.habits[date] = dateData.habits;
        
    })
    console.log(weekDeserialized)
    return weekDeserialized
}

const _serializeClient = (data) => {
    console.log("ADD CLIENT WEEK")
    const weekSerialized = {};
    Object.keys(data.fitness.days).forEach((dayId)=>{
        const day = data.fitness.days[dayId];
        weekSerialized[dayId] = {}
        weekSerialized[dayId].fitness = []
        day.sectionIds.forEach((sectionId, index)=>{
            const section = data.fitness.sections[sectionId];
            const {entryIds, ...sectionData} = section;
            weekSerialized[dayId].fitness[index] = {...sectionData};
            weekSerialized[dayId].fitness[index].entries = [];
            entryIds.forEach((entryId)=>{
                const entry = data.fitness.entries[entryId];
                weekSerialized[dayId].fitness[index].entries.push(entry);
            })
        })
    });
    Object.keys(data.habits).forEach((date)=>{
        weekSerialized[date].habits = data.habits[date]
    })
    console.log(weekSerialized);
    return (weekSerialized);
}

export {
    getClients,
    getClientWeek,
    addClientWeek,
    getClient,
};
