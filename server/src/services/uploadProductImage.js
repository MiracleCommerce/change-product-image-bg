const Shopify = require('shopify-api-node');
const dotenv = require('dotenv');

dotenv.config();
const {
  HOST,
	IMAGE_DIR_PATH
} = process.env;

const uploadProductImage = async (ctx, accessToken, productId, originalImage, fileName) => {

	const shopify = new Shopify({
		shopName: ctx.state.webhook.domain,
		accessToken : accessToken
	});

	let uploadImage = {};
	if ( originalImage.position != null ) {
		uploadImage.position = originalImage.position;
	}
	if ( originalImage.variant_ids != null ) {
		uploadImage.variant_ids = originalImage.variant_ids;
	}
	if ( originalImage.alt != null ) {
		uploadImage.alt = originalImage.alt;
	}
	uploadImage.metafields = [
		{
			"key": "removed_bg",
			"value": originalImage.id.toString(),
			"value_type": "string",
			"namespace": "global"
		}
	];

	uploadImage.src = HOST + '/' + IMAGE_DIR_PATH + '/' + fileName;
	// uploadImage.src = originalImage.src;

	return uploadResult = await shopify.productImage.create(productId, uploadImage);
	// return uploadResult = await shopify.product.update(productData.id, uploadImage);
};

module.exports = uploadProductImage;