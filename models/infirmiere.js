const mongoose= require('mongoose')
const Schema= mongoose.Schema

const infirmiereSchema= new Schema({
    sexe:{
        type:String
    },
    poids:{
        type: String
    },
    chambre:{
        type: String
    },
    traitement:[
        {
            labbel:{
                type: String
            },
            j1matin:{
                type: Boolean
            },
            j1midi:{
                type: Boolean
            },
            j1soir:{
                type: Boolean
            },
            j2matin:{
                type: Boolean
            },
            j2midi:{
                type: Boolean
            },
            j2soir:{
                type: Boolean
            },
            j3matin:{
                type: Boolean
            },
            j3midi:{
                type: Boolean
            },
            j3soir:{
                type: Boolean
            },
            j4matin:{
                type: Boolean
            },
            j4midi:{
                type: Boolean
            },
            j4soir:{
                type: Boolean
            },
            j5matin:{
                type: Boolean
            },
            j5midi:{
                type: Boolean
            },
            j5soir:{
                type: Boolean
            },
            j6matin:{
                type: Boolean
            },
            j6midi:{
                type: Boolean
            },
            j6soir:{
                type: Boolean
            },
            
            
        }
    ],

    t42:{
        type: Number
    },
    t41:{
        type: Number
    },
    t40:{
        type: Number
    },
    t39:{
        type: Number
    },
    t38:{
        type: Number
    },
    t37:{
        type: Number
    },
    t36:{
        type: Number
    },
    t35:{
        type: Number
    },
    examensComplementaires:[
        {
            type: String
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "agent"
    },
    patient : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "patient"
    },
})

module.exports= Infirmiere = mongoose.model('infirmiere', infirmiereSchema)