//This function create a document to store, if collection don´t exist
//then the collection will be created into firestore
const createData_I = () => {

    let exitTime = document.getElementById('exitTime').value
    let exitOdometer = document.getElementById('exitOdometer').value
    let destiny = document.getElementById('destiny').value
    let driver = document.getElementById('driver').value
    let escort = document.getElementById('escort').value

    docRef
        .add({
            horarioSaida: exitTime,
            horarioEntrada: '',
            odometroSaida: exitOdometer,
            odometroEntrada: '',
            destino: destiny,
            motorista: driver,
            acompanhante: escort,
            kmTotal: '',
            anexo: 'I'
        })
        .then((docRef) => {
            console.log("Documento registrado: ", docRef.id);
            createDataForm.reset()
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}


//This function read the current day, triggered by "onload event"
//the return object is never null
//if there's no data in object the return will be "[]"
const readCurrentDay_I = () => {
    let dataFromFirestore = []

    docRef.where("anexo", "==", "I")
        .get()
        .then((query) => {
            query.forEach((doc) => {
                dataFromFirestore.push([
                    doc.id,
                    doc.data().horarioSaida,
                    doc.data().horarioEntrada,
                    doc.data().odometroSaida,
                    doc.data().odometroEntrada,
                    doc.data().destino,
                    doc.data().motorista,
                    doc.data().acompanhante,
                    doc.data().kmTotal,
                ])
            })
            console.log(dataFromFirestore)

            //return to view
            return viewDataInTable_I(dataFromFirestore)

        }).catch((err) => {
            throw new Error(err,'Erro ao consultar: ', window.location = '../../login/login.html')
        })
}

//this function call the firestore and put the doc values into the modal for edition 
const fetchOneDocForUpdate = (id) =>{
    document.getElementById('returnTime').value = getTimeStampForCollection().hourMin
    docRef
        .doc(id)
        .get()
        .then((doc) => {
            if (doc.exists) {
                document.getElementById('showExitOdometer').innerHTML = doc.data().odometroSaida
                document.getElementById('showExitTime').innerHTML = ' ' + doc.data().horarioSaida
            }
        }).catch((err) => {
            console.log("Erro ao retornar documento:", err)
        })

}


//This function update the current document from id
const updateData_I = (id) => {
    docRef
        .doc(id)
        .update({
            horarioEntrada: document.getElementById('returnTime').value,
            odometroEntrada: document.getElementById('returnOdometer').value,
            observacoes: document.getElementById('observations').value,
            kmTotal: document.getElementById('returnOdometer').value - document.getElementById('showExitOdometer').innerHTML,
            updated_at: Date.now()
        })
        .then(() => {
            HandlerRefreshPage(id)
        }).catch((err) => {
            console.log(err)
        })
}






