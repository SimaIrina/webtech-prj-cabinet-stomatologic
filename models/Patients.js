'use strict'
module.exports = function(sequelize, DataTypes) {

    var Patient = sequelize.define('Patient', {
        /*id-ul unic - primary key*/
        patient_id: {
            type: DataTypes.INTEGER,
            field: 'patient_id',
            primaryKey: true
        },
        /*facem tabelele*/
        firstname: {
            type: DataTypes.STRING,
            field: 'firstname'
        },
        lastname: {
            type: DataTypes.STRING,
            field: 'lastname'
        },
        sex: {
            type: DataTypes.STRING,
            field: 'sex'
        },
        age: {
            type: DataTypes.INTEGER,
            field: 'age'
        },
      
    }, {
        timestamps: false,
        tableName: 'patients',
        classMethods: {
            associate: function(models) {
                Patient.hasMany(models)
            }
        }
    });

    return Patient;
}
