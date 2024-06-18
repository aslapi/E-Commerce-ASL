const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    })
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  Tag.create ({
    tag_name: req.body.tag_name
  })
  res.json({ message: 'Tag created!'})
  // create a new tag
});

// router.put('/:id', (req, res) => {
//   Tag.update({
//     where: {
//       id: req.params.id
//     }
//   })
//   res.json({ message: 'Tag updated!'})
//   // update a tag's name by its `id` value
// });

router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id, // Include the `where` attribute
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  res.json({ message: 'Tag deleted!'})
  // delete on tag by its `id` value
});

module.exports = router;
