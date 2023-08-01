const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Products = new Schema(
    {
        _id: { type: Number },
        image: { type: String, maxLength: 400, require: true },
        name: { type: String, maxLength: 255, require: true },
        product: { type: String, maxLength: 100 },
        price: { type: String, maxLength: 255, require: true },
        price_discount: { type: String, maxLength: 255, require: true },
        prepay: { type: String, maxLength: 255, require: true },
        percent_discount: { type: String, maxLength: 255, require: true },
        category: {
            type: Object,
            brand: { type: String, maxLength: 100, require: true },
            classify: { type: String, maxLength: 100, require: true },
            category_series: { type: String, maxLength: 100, require: true },
        },
        rating: { type: Number },
        isBuyMany: { type: Boolean },
        slug: { type: String, slug: 'name', unique: true },
        createAt: { type: Date, default: Date.now },
        updateAt: { type: Date, default: Date.now },
    },
    { _id: false },
);

mongoose.plugin(slug);
Products.plugin(AutoIncrement);
Products.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });

// // Custom query helper
// Products.query.sortable = function (req) {
//     if (req.query.hasOwnProperty('_sort')) {
//         const isCheckType = ['asc', 'desc'].includes(req.query.type);
//         return this.sort({
//             [req.query.column]: isCheckType ? req.query.type : 'desc',
//         });
//     }
// };

module.exports = mongoose.model('products', Products);
