const Livres = require('../models/Livres');
const livre = require('../models/Livres');



const create = async (req, res) => {
    try {
        let { nom, description, autheur } = req.body;
        const data = await Livres.create({ nom, description, autheur });
        res.status(201).json(data);
    } catch (error) {
        console.log(error);
    }
}

const getLivre = async (req, res) => {
    try {
        const data = await Livres.find().populate()
        res.status(201).json(data)
    } catch (error) {
        console.log(error)
    }
}

const UnLivre = async (req, res) => {
    try {
        const _id = req.params._id
        console.log(_id)

        const data = await Livres.findOne({ _id })
        res.status(201).json(data)

    } catch (error) {
        console.log(error)
    }
}


const updateLivre = async (req, res) => {
    try {
        let { nom, description, autheur } = req.body;
        const _id = req.params._id
        const data = await Livres.findOneAndUpdate(
            { _id: _id },
            { nom, description, autheur }
        );
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

const deleteL = async (req, res) => {
    try {
        const _id = req.params._id

        const data = await Livres.findOneAndDelete({ _id });
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}


// const getLivresPagines = async (req, res) => {
//     try {
//         let { page = 1, limit = 10 } = req.query;  // valeurs par défaut : page 1, 10 résultats par page

//         page = parseInt(page);
//         limit = parseInt(limit);

//         const skip = (page - 1) * limit;

//         // Récupérer livres avec pagination
//         const livres = await Livres.find()
//             .skip(skip)
//             .limit(limit);

//         // Facultatif : récupérer nombre total de documents pour info front
//         const totalDocuments = await Livres.countDocuments();

//         res.json({
//             page,
//             limit,
//             totalPages: Math.ceil(totalDocuments / limit),
//             totalDocuments,
//             data: livres
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Erreur serveur" });
//     }
// };

const pagination = async(req, res)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) ||10;
        const options = {
            page,
            limit,
            lean : true,
            customLabels : {
                totalDocs: 'total',
                limit: 'limit',
                page: 'page',
                prevPage: 'prev',
                nextPage: 'next',
                totalPages: 'pages',
                pagingCounter: 'serial',
                meta: 'pagination'
            }
        };
        const resultat = await Livres.paginate({}, options);

        const creerUrlPagination = `${req.protocol}://${req.get('host')}${req.creerUrlPagination}`;
        const lien = (p) => `${creerUrlPagination}?page=${page}?limit=${limit}`;

        resultat.pagination.links = {
            self: creerUrlPagination(resultat.pagination.page),
            next: resultat.pagination.next ? creerUrlPagination(resultat.pagination.next): null,
            prev: resultat.paginaton.prev ? creerUrlPagination(resultat.pagination.prev): null,
            first: creerUrlPagination(1),
            last: creerUrlPagination(resultat.pagination.pages)
        };
        res.json(resultat);
    } catch (error) {
        console.log(error)
    }
}




module.exports = {
    create,
    getLivre,
    UnLivre,
    updateLivre,
    deleteL
}