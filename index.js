const {success, error} = require('functions')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const morgan = require('morgan')
const PORT = process.env.PORT || 3000;

let CalculRouter = express.Router();
app.use(morgan('dev'))
     app.use(bodyParser.json());
     app.use(bodyParser.urlencoded({ extended: true }));

//   autoriser le partage des ressources avec des domaines qui ne sont pas les mêmes que celui du serveur.

app.use(function(req, res, next) {


 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      next();
});

  // Route Somme
  CalculRouter.route('/somme')

      .post((req, res) => {

           let nb1=req.body.n1;
           let nb2=req.body.n2;
           let r=somme(nb1,nb2);
           res.json(success("la somme de "+nb1+"  et "+nb2+" est:"+r));

      })

// Route Produit
 CalculRouter.route('/produit')

   .post((req, res) => {

        let nb1=req.body.n1;
        let nb2=req.body.n2;
        let r=produit(nb1,nb2);
        res.json(success("le produit de "+nb1+"  et "+nb2+" est:"+r));

    }) 
    /********************somme******************************************/

                             function somme(n1,n2){
                                  let s=Number(n1)+ Number(n2);
                                      return s;
                                                  }

                     /**********************Produit************************************/

                             function produit(n1,n2){
                                  let p=Number(n1)* Number(n2);
                                      return p;
                             }

                             app.listen(PORT, () => {
                                console.log(`Server running on http://localhost:${PORT}`);
                               });
                               // Exportation pour le déploiement sur Vercel
                               module.exports = app; 
                                      