var express = require('express');

var models = require('../models');


var router = express.Router();
var Patient = models.Patient;
router.post('/patients', function(request, response) {
    Patient.create(request.body).then(function() {
        response.status(201).send;
    }).catch(function(err) {
        console.warn(err);
    })
});



router.get('/patients', function(request, response) {
    /*aici vom defini functia globala Patient*/
    Patient.findAll().then(function(patients) {
        response.status(200).send(patients);
    });
});

// returns one patient by patient_id
router.get('/patients/:patient_id', function(request, response) {
    Patient.findById(request.params.patient_id).then(function(patient) {
        if (patient) {
            response.status(200).send(patient);
        }
        else {
            response.status(404).send();
        }
    });
});
// Salvarea (uodate )a patient by patient_id
router.put('/patients/:patient_id', function(request, response) {
    Patient
        .findById(request.params.patient_id)
        .then(function(patient) {
            if (patient) {
                patient
                
                    .updateAttributes(request.body)
                    .then(function() {
                        /*statusurile de raspuns sunt cu 2xx*/
                        response.status(202).send('updated');
                    })
                    
                    .catch(function(error) {
                        console.warn(error);
                        /*cele de eroare sunt cu 4xx*/
                        response.status(400).send('server error');
                    });
            }
            else {
                response.status(404).send();
            }
        });
});

// stergerea unui pacient in functe de id-ul sau
router.delete('/patients/:patient_id', function(req, res) {
    Patient
    
        .findById(req.params.patient_id)
        .then(function(patient) {
            if (patient) {
                patient
                    .destroy()
                    .then(function() {
                        res.status(204).send();
                    })
                    .catch(function(error) {
                        console.warn(error);
                        res.status(400).send('server error');
                    });
            }
            
            else {
                
                res.status(404).send();
            }
        });
});

module.exports = router;
