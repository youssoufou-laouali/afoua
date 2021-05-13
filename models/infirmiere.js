const mongoose= require('mongoose')
const Schema= mongoose.Schema

const infirmiereSchema= new Schema({
    sexe:{
        type:String
    },
    poids:{
        type: Number
    },
    age:{
        type: Number
    },
    chambre:{
        type: String
    },
    traitement:[
        {
            labbel:{
                type: String
            },
            j1:{
                matin:{
                    type:String
                },
                midi:{
                    type: String
                }, 
                Soir:{
                    type: String
                }
            },
            j2:{
                matin:{
                    type:String
                },
                midi:{
                    type: String
                }, 
                Soir:{
                    type: String
                }
            },
            j3:{
                matin:{
                    type:String
                },
                midi:{
                    type: String
                }, 
                Soir:{
                    type: String
                }
            },
            j4:{
                matin:{
                    type:String
                },
                midi:{
                    type: String
                }, 
                Soir:{
                    type: String
                }
            },
            j5:{
                matin:{
                    type:String
                },
                midi:{
                    type: String
                }, 
                Soir:{
                    type: String
                }
            },
            j6:{
                matin:{
                    type:String
                },
                midi:{
                    type: String
                }, 
                Soir:{
                    type: String
                }
            }
        }
    ],

    t42:[
        {
            type: String
        }
    ],
    t41:[
        {
            type: String
        }
    ],
    t40:[
        {
            type: String
        }
    ],
    t39:[
        {
            type: String
        }
    ],
    t38:[
        {
            type: String
        }
    ],
    t37:[
        {
            type: String
        }
    ],
    t36:[
        {
            type: String
        }
    ],
    t35:[
        {
            type: String
        }
    ],
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