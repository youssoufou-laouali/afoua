const mongoose= require('mongoose')
const Schema= mongoose.Schema

const echographieAbdominaleSchema= new Schema({
    indications:{
        type: String
    },
    age:{
        type: Number
    },
    foie:{
        taille:{
            lobeDroit:{
                type: Number
            },
            lobeGauche:{
                type: Number
            },
            flecheHepatique:{
                type: Number
            }
        },

        echostructure:{
            type: String
        },

        contours:{
            type: String
        },

        autres:{
            type: String
        }
    },

    troncPorteVeinesHepatiques:{
        type: String
    },
    vesiculeBiliaire:{
        type: String
    },

    pancreas:{
        taille:{
            type: Number
        },
        echostructure:{
            type: String
        },

        contours:{
            type: String
        },

        autres:{
            type: String
        }
    },
    rate:{
        taille:{
            type: Number
        },
        echostructure:{
            type: String
        },

        contours:{
            type: String
        },

        autres:{
            type: String
        }
    },

    reins:{
        droit:{
            taille:{
                type: Number
            },
            echostructure:{
                type: String
            },
            cavitePyelocalicielles:{
                type: String
            }
        },
        gauche:{
            taille:{
                type: Number
            },
            echostructure:{
                type: String
            },
            cavitePyelocalicielles:{
                type: String
            }
        },
    },

    vessie:{
        contours:{
            type: String
        },
        contenu:{
            type: String
        },
        parois:{
            type: String
        },
        taille:{
            type: Number
        }
    },
    
    conclusion:{
        type: String
    },
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

module.exports= echographieAbdominale = mongoose.model('echographieabdominale', echographieAbdominaleSchema)