const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');

const ProductDescription = new Schema(
    {
        _id: { type: Number },
    },
    { _id: false },
);

mongoose.plugin(slug);

module.exports = mongoose.model('product-descriptions', ProductDescription);
