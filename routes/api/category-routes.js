const router = require('express').Router();
const {
  Category,
  Product
} = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
      // find all categories
      // be sure to include its associated Products
      Category.findAll({
        include: {
          model: Product,
          attributes: ['id', 'Product_name', 'price', 'stock', 'category_id'],
        }
      }).then(dbcategoryData => {
       if(!dbcategoryData) {
        res.status(404).json({
          message: 'can not find all product'
      });
      return;
    }
      res.json(dbcategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
    return;
 });

      router.get('/:id', (req, res) => {
        // find one category by its `id` value
        // be sure to include its associated Products
        Category.findOne({
          where: {
            id: req.params.id
          },
          include: {
            model: Product,
            attributes: ['category_id'],
          }
        }).then(dbcategoryData => {
          if (!dbcategoryData) {
            res.status(404).json({
              message: 'Can not find category by its ID or associated value'
            });
            return
          }
         res.json(dbcategoryData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
     });

        router.post('/', (req, res) => {
          // create a new category
          Category.create(req.body, {
            where: {
              id: req.params.id,
            }
          }).then(dbcategoryData => {
            if (!dbcategoryData) {
              res.status(404).json({
                message: 'unable to make new category'
              });
            }
           res.json(dbcategoryData);
          });
          return
        });


        router.put('/:id', (req, res) => {
          // update a category by its `id` value
          Category.update(req.body, {
            where: {
              id: req.params.id,
            },
          }).then((categoryData) =>{
            if (!categoryData) {
              res.status(404).json({
                message: 'unable to make new category'
              });
            }
           res.json(categoryData);
          });
          return;
        });

      router.delete('/:id', (req, res) => {
        Category.destroy({
          where: {
            id: req.params.id,
          },
        }).then((categoryData) => {
           if (!categoryData) {
          res.status(404).json({
            message: 'unable to make new category'
          });
        }
       res.json(categoryData);
      });
      return;
    });

    
      module.exports = router;