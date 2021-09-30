const router = require('express').Router();
const {
  Tag,
  Product,
  ProductTag
} = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }]
  }).then(tagData => {
    res.json(tagData);
  }).catch(err => {
    console.log(err);
    res.json(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
      include: [Product],
  }).then(tagData => {
    res.json(tagData);
  }).catch(err => {
    console.log(err);
    res.json(500).json(err);
  });

  router.post('/', (req, res) => {
    // create a new tag
    console.log(req.body);
    Tag.create({
      title: req.body.name,
      body: req.body.body,
      category: req.body.category
    }).then(tagData => {
      res.json(tagData);
    }).catch(err => {
      console.log(err);
      res.json(500).json(err);
    });
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value/
  Tag.update({
    title: req.body.title,
    body: req.body.body,
    category: req.body.category
  }, {
    where: {
      id: req.params.id
    }
  }).then(tagData => {
    if (!tagData) {
      res.status(404).json({
        message: 'Can not update tag'
      });
      return;
    }
   res.json(tagData);
  });
});


router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      category: req.params.id
    }
  }).then(tagData => {
    if (!tagData) {
      res.status(404).json({
        message: 'category not found with this id'
      });
      return;
    }
     res.json(tagData);
  });
});

module.exports = router;