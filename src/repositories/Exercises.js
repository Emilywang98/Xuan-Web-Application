import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import firebaseConfig from "../firebase.json";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const exerciseCollection = collection(db, 'exercises');
let exercises = null;

const _initExercises = async() =>{
    const exerciseSnapshot = await getDocs(exerciseCollection);
    const exerciseList = exerciseSnapshot.docs.map(doc => {return {...doc.data(), key:doc.id}});
    exercises = exerciseList;
    _sortExercises();
    console.log(exerciseList);
};

const _sortExercises = () =>{
    exercises.sort((a, b)=> (a.name > b.name) ? 1 : -1);
}

const getExercisesRepo = async() =>{
    if(exercises == null)
        await _initExercises();
    return exercises;
};

const addExercisesRepo = async(exercise) =>{
    if(exercises == null)
        await _initExercises();
    
    const docRef = await addDoc(exerciseCollection, {
        name: exercise.name,
        url: exercise.url
        });
    
    exercises.push({key:docRef.id, ...exercise});
    _sortExercises();
    return exercises;
};

export {
    getExercisesRepo,
    addExercisesRepo
};
