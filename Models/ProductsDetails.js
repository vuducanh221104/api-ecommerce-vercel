const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');

const StorageOption = new Schema({
    link: { type: String },
    info: {
        type: Object,
        name: { type: String },
        price: { type: String },
    },
});

const ProductsDetails = new Schema(
    {
        _id: { type: Number },
        name: { type: String, maxLength: 255, require: true },
        price_discount: { type: String, maxLength: 255, require: true },
        price: { type: String, maxLength: 255, require: true },
        images: { type: Array },
        color_available: { type: Object, stock: { type: Array }, out_stock: { type: Array } },
        storage: { type: [StorageOption] },
        category: {
            type: Object,
            brand: { type: String, required: true },
            classify: { type: String, required: true },
            category_series: { type: String, required: true },
        },
        description: { type: String },
        slug: { type: String, slug: 'name', unique: true },
        brand: { type: String, slug: 'category.brand', unique: true },
        classify_slug: { type: String, slug: 'category.classify', unique: true },
        category_series_slug: { type: String, slug: 'category.category_series', unique: true },
        amount: { type: Number },
    },
    { _id: false },
);

mongoose.plugin(slug);

module.exports = mongoose.model('product-details', ProductsDetails);
