import { Sequelize } from "sequelize";
import { sequelizeconfig } from "../config.js";
import { OperatiiApi } from "./operation-api.js";

const sequelizeConection = new Sequelize(
    "SearchDB", 
    "root", 
    "root",
    sequelizeconfig,
    );

OperatiiApi.init(sequelizeConection);

export const Keyword = sequelizeConection.define("Keyword", {

    ID: {

        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false

    },

    Name: {

        type: Sequelize.STRING,
        allowNull: false,
        trim: true
    }

},
    {

        indexes: [
            {

                unique: true,
                fields: ['Name']
            }

        ]

    });

export const SearchResult = sequelizeConection.define("SearchResult", {

    ID: {

        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false

    },

    Name: {

        type: Sequelize.STRING,
        allowNull: false,
        trim: true
    },

    Link: {

        type: Sequelize.STRING,
        allowNull: false,
        trim: true
    },

    Count: {

        type:Sequelize.INTEGER,
        allowNull:false
    }
},
    {

        indexes: [
            {

                unique: true,
                fields: ['Name','Link']        
            },
            {

                unique: true,
                fields: ['Name']        
            },

        ]
});

Keyword.hasMany(SearchResult, {
    foreignKey: "Keyword_ID",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKeyConstraint: true

});

export {sequelizeConection};

