const Products = require('../Models/Products');
const productDetails = require('../Models/ProductsDetails');
const ProductDescription = require('../Models/ProductDesription');
class ProductController {
    async products(req, res) {
        try {
            const data = await Products.find({});
            res.json(data);
        } catch (err) {}
    }

    // [GET] : API?q=''&type=less
    async Apiqandtype(req, res, next) {
        const { q, type } = req.query;
        let query = {};
        if (q) {
            query = { name: { $regex: q, $options: 'i' } }; // Tìm kiếm theo trường 'name' với từ khóa q
        }
        if (type === 'more') {
            // Lấy nhiều kết quả
            const users = await Products.find(query);
            res.json(users);
        } else {
            // Lấy ít kết quả
            const users = await Products.find(query).limit(7); // Giới hạn số lượng kết quả là 10
            res.json(users);
        }
    }

    async slugProducts(req, res, next) {
        try {
            const slug = req.params.slug; // Lấy giá trị slug từ URL params
            const productDetail = await productDetails.findOne({ slug }); // Tìm tài liệu dựa trên trường "slug"

            if (!productDetail) {
                return res.status(404).json({ message: 'Tài liệu không tồn tại' });
            }

            res.json(productDetail); // Gửi tài liệu dưới dạng JSON
        } catch (err) {
            next(err);
        }
    }

    async categorySlug(req, res, next) {
        try {
            const subcategorySlug = req.params.id;
            console.log(subcategorySlug);
            const productDetail = await ProductDescription.findOne({ subcategorySlug }); // Tìm tài liệu dựa trên trường "slug"

            if (!productDetail) {
                return res.status(404).json({ message: 'Tài liệu không tồn tại' });
            }

            res.json(productDetail); // Gửi tài liệu dưới dạng JSON
        } catch (err) {
            next(err);
        }
    }
    async addProduct(req, res) {
        try {
            const data = await Products.create(req.body);
            console.log('Course saved:', data);
            res.json(data);
        } catch (err) {
            console.error('Error creating product:', err);
            res.status(500).json({ error: 'Failed to create product' });
        }
    }
}

module.exports = new ProductController();
